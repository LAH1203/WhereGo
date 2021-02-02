var express = require('express');
var mysql = require('mysql');
var location = require('location');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'WhereGo',
    password: 'password',
    database: 'reviews'
});
conn.connect();
var bodyParser = require('body-parser');
var app = express();
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

app.locals.pretty = true;
app.set('views', './views');
// app.set('view engine', 'jade');
app.set('view engine', 'pug');
// 정적인 파일이 위치할 디렉토리 지정
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
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

// 내 후기 보기
app.get('/myReviews', function(req, res) {
    var sql = 'SELECT * FROM review WHERE user_email=?';
    var params = [req.oidc.user.email];
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
app.get('/main', function(req, res) {
    res.render('main_page');
});

// 검색
app.get('/search', function(req, res) {
    // res.render('search_page', { result: null });
    var sql = 'SELECT * FROM review';
    conn.query(sql, function(err, rows) {
        res.render('search_page', { result: null, all: rows, my_email: req.oidc.user.email });
    });
});

app.post('/searchAfter', function(req, res) {
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
            res.render('search_page', { result: rows, my_email: req.oidc.user.email });
        }
    });
});

// 글쓰기
app.get('/new', function(req, res) {
    // res.render('new_page');
    res.render(req.oidc.isAuthenticated() ? 'new_page' : 'not_logined');
});

app.post('/newAfter', function(req, res) {
    var body = req.body;
    
    var sql = 'INSERT INTO review (place, content, user_email) VALUES(?, ?, ?)';
    var params = [body.place, body.content, JSON.stringify(req.oidc.user.email).toString().replace(/"/g, "")];
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

app.post('/updateReviewAfter', function(req, res) {
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
    var course_id = req.query.course_id;
    var link = null;
    if (course_id != null) {
        var url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
        var queryParams = '?serviceKey=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D&numOfRows=10&pageNo=1&CURRENT_DATE=2019122010&HOUR=24';
        queryParams += '&COURSE_ID=' + course_id;
        link = url + queryParams;
        // res.writeHead(302, {'Location': link});
        // res.end();
        location.href = link;    // 오류
    }
    res.render('course_page', { link: link });
});

/*
// 로그인
app.get('/login', function(req, res) {
    res.render('login_page');
});

app.get('/login_success', function(req, res) {
    res.render('login_success');
});

// 회원가입
app.get('/signup', function(req, res) {
    res.render('signup_page');
});

app.get('/signup_success', function(req, res) {
    res.render('signup_success');
});

app.get('/signup_fail', function(req, res) {
    res.render('signup_fail');
});
*/

app.listen(3000, function() {
    console.log('Connected, 3000 port!')
})
