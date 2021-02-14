var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var router = express.Router();
var cookieParser = require('cookie-parser');
// var MySQLStore = require('express-mysql-session')(session);
var location = require('location-href');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'WhereGo',
    password: 'password',
    database: 'reviews'
});
var conn_user = mysql.createConnection({
    host: 'localhost',
    user: 'WhereGo',
    password: 'password',
    database: 'WhereGoUser'
});
conn.connect();
conn_user.connect();
var bodyParser = require('body-parser');
var app = express();
/*
const { auth, requiresAuth } = require('express-openid-connect');
const { requireAuth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'Xxp9piml4XN02W8nlJoPmP7WWlltzX34',
    issuerBaseURL: 'https://lah1203.eu.auth0.com'
}
*/
app.locals.pretty = true;
app.set('views', './views');
// app.set('view engine', 'jade');
app.set('view engine', 'pug');
// 정적인 파일이 위치할 디렉토리 지정
app.use(express.static('public'));
app.use(cookieParser());
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '!@#$%^&*',
    // store: new MySQLStore(conn_user),
    resave: true,
    saveUninitialized: true
}));

/* Auth0 로그인 및 로그아웃 코드
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// Auth0에서 제공하는 로그인 및 회원가입 구현 완료!
app.get('/', (req, res) => {
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    res.render(req.oidc.isAuthenticated() ? 'login_success' : 'login_fail');
});

// 로그아웃 <= 오류 ver
app.get('/logout', (req, res) => {
    res.render(req.oidc.auth0Logout() ? 'logout_success' : 'logout_fail');
});

// 마이페이지
app.get('/profile', requiresAuth(), (req, res) => {
    // res.send(JSON.stringify(req.oidc.user));
    // res.send(req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : '로그인 되어있지 않음');
    res.render(req.oidc.isAuthenticated() ? 'my_page' : 'not_logined', { user_profile_json: req.oidc.user });
});
*/

// mysql 로그인
app.get('/login', function(req, res) {
    if (!req.session.user)
        res.render('login_page');
    else
        res.redirect('/');
});

app.post('/login', function(req, res) {
    var email = req.body.email;
    var pw = req.body.password;
    var sql = 'SELECT * FROM user WHERE email=?';
    conn_user.query(sql, [email], function(err, rows) {
        if (err)
            console.log(err);
        if (rows == 0)
            res.render('not_user');
        else {
            var user = rows[0];
            if (pw == user.Password) {
                req.session.email = user.Email;
                req.session.password = user.Password;
                req.session.name = user.Name;
                req.session.save(function() {
                    res.render('login_success');
                });
            } else {
                res.render('login_fail');
            }
        }
    });
});

// mysql 로그아웃
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err)
            res.render('logout_fail');
        else
            res.render('logout_success');
    });
});

// mysql 회원가입
app.get('/signup', function(req, res) {
    res.render('signup_page');
});

app.post('/signup', function(req, res) {
    var email = req.body.email;
    var pw = req.body.password;
    var pw2 = req.body.password2;
    if (pw != pw2)
        res.render('not_equal_password');
    var name = req.body.name;
    var sql = 'SELECT * FROM user WHERE email=?';
    conn_user.query(sql, [email], function(err, rows) {
        if (err)
            console.log(err);
        if (rows == 0) {
            sql = 'INSERT INTO user (email, password, name) VALUES(?, ?, ?)';
            var params = [email, pw, name];
            conn_user.query(sql, params, function(err) {
                if (err) {
                    console.log('query is not excuted. insert fail...\n' + err);
                    res.render('signup_fail');
                } else {
                    res.render('signup_success');
                }
            });
        } else {
            res.render('already_user');
        }
    });
    // var sql = 'INSERT INTO user (email, password, name) VALUES(?, ?, ?)';
    // var params = [email, pw, name];
    // conn_user.query(sql, params, function(err) {
    //     if (err) {
    //         console.log('query is not excuted. insert fail...\n' + err);
    //         res.render('signup_fail');
    //     } else {
    //         res.render('signup_success');
    //     }
    // });
});

// mysql 마이페이지
app.get('/profile', function(req, res) {
    if (!req.session.name)
        res.render('not_logined');
    else {
        var sql = 'SELECT * FROM user WHERE name=?';
        conn_user.query(sql, [req.session.name], function(err, rows) {
            if (err)
                console.log(err);
            else {
                var user = rows[0];
                res.render('my_page', { me: user });
            }
        });
    }
});

// 내 정보 수정 전 비밀번호 확인
app.get('/beforeUpdateInfo', function(req, res) {
    res.render('before_updateInfo');
});

app.post('/beforeUpdateInfo', function(req, res) {
    var pw = req.body.password;
    if (pw == req.session.password)
        res.render('updateInfo_page');
    else
        res.render('wrong_password');
});

// 내 정보 수정
app.post('/updateInfo', function(req, res) {
    var pw = req.body.password;
    var pw2 = req.body.password2;
    if (pw != pw2)
        res.render('not_equal_password');
    var name = req.body.name;
    var sql = 'UPDATE user SET password=?, name=? WHERE email=?';
    var params = [pw, name, req.session.email];
    conn_user.query(sql, params, function(err) {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('updateInfo_fail');
        } else {
            res.render('updateInfo_success');
        }
    });
});

// 내 후기 보기
app.get('/myReviews', function(req, res) {
    var sql = 'SELECT * FROM review WHERE user_email=?';
    var params = [req.session.email];
    conn.query(sql, params, function(err, rows) {
        if (err) {
            console.log('query is not excuted. select fail...\n' + err);
            res.render('my_reviews_fail');
       } else {
            res.render('my_reviews_page', { result: rows });
        }
    });
});

// 메인
app.get(['/', '/main'], function(req, res) {
    res.render('main_page');
});

// 검색
app.get('/search', function(req, res) {
    // res.render('search_page', { result: null });
    var sql = 'SELECT * FROM review';
    conn.query(sql, function(err, rows) {
        if (err)
            console.log(err);
        else
            res.render('search_page', { result: null, all: rows, my_email: req.session.email });
    });
});

app.post('/search', function(req, res) {
    var body = req.body;
    var sql = 'SELECT * FROM review WHERE PLACE=?';
    var params = [body.place];
    conn.query(sql, params, function(err, rows) {
        if (rows == 0) {
            res.render('no_search_result');
        }
        else if (err) {
            console.log('query is not excuted. select fail...\n' + err);
            res.render('search_fail');
        } else {
            res.render('search_page', { result: rows, my_email: req.session.email });
        }
    });
});

// 글쓰기
app.get('/new', function(req, res) {
    // res.render('new_page');
    res.render(req.session.name ? 'new_page' : 'not_logined');
});

app.post('/new', function(req, res) {
    var body = req.body;
    
    var sql = 'INSERT INTO review (place, content, user_email) VALUES(?, ?, ?)';
    // var params = [body.place, body.content, JSON.stringify(req.oidc.user.email).toString().replace(/"/g, "")];
    var params = [body.place, body.content, req.session.email];
    conn.query(sql, params, function(err) {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('new_fail');
        } else {
            res.render('new_success');
        }
    });
});

// 글 수정
app.get('/updateReview', function(req, res) {
    var num = req.query.num;
    var sql = 'SELECT * FROM review WHERE num=?';
    var params = [num];
    conn.query(sql, params, function(err, rows) {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('update_review_fail');
        } else {
            res.render('update_review_page', { result: rows });
        }
    });
});

app.post('/updateReview', function(req, res) {
    var body = req.body;
    
    var sql = 'UPDATE review SET place=?,content=? WHERE num=?';
    var params = [body.place, body.content, body.num];
    conn.query(sql, params, function(err) {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('update_review_fail');
        } else {
            res.render('update_review_success');
        }
    });
});

// 글 삭제
app.get('/deleteReview', function(req, res) {
    var num = req.query.num;
    var sql = 'DELETE FROM review WHERE num=?';
    var params = [num];
    conn.query(sql, params, function(err, rows) {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('delete_review_fail');
        } else {
            res.render('delete_review_success');
        }
    });
});

// 관광코스
app.get('/course', function(req, res) {
    // var course_id = req.query.course_id;
    // var link = course(course_id);
    // console.log(link);
    // location.set(link);
    // location();
    // course(course_id);
    // var link = course(course_id);
    res.render('course_page');
});



app.listen(3000, function() {
    console.log('Connected, 3000 port!')
});

/*
function course(course_id) {
    var url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
    var queryParams = '?serviceKey=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D&numOfRows=10&pageNo=1&CURRENT_DATE=2019122010&HOUR=24';
    queryParams += '&COURSE_ID=' + course_id;
    link = url + queryParams;
    // location.href = link;
    console.log(link);
    // location.set(link);
    // location();
    return link;
}
*/