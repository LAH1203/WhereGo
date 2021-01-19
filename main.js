var express = require('express')
var mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // 실행 시마다 패스워드 변경하도록 하자..
    password: 'password',
    database: 'reviews'
})
conn.connect()
var bodyParser = require('body-parser')
var app = express()
const { auth, requiresAuth } = require('express-openid-connect')
const { requireAuth } = require('express-openid-connect')
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'Xxp9piml4XN02W8nlJoPmP7WWlltzX34',
    issuerBaseURL: 'https://lah1203.eu.auth0.com'
}

app.locals.pretty = true
app.set('views', './views')
app.set('view engine', 'jade')
// 정적인 파일이 위치할 디렉토리 지정
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))

// req.isAuthenticated is provided from the auth router
// Auth0에서 제공하는 로그인 및 회원가입 구현 완료!
app.get('/', (req, res) => {
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
    res.render(req.oidc.isAuthenticated() ? 'login_success' : 'login_fail')
})

app.get('/logout', (req, res) => {
    res.render(req.oidc.auth0Logout() ? 'logout_success' : 'logout_fail')
})

app.get('/profile', requiresAuth(), (req, res) => {
    // res.send(JSON.stringify(req.oidc.user))
    // res.send(req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : '로그인 되어있지 않음')
    res.render(req.oidc.isAuthenticated() ? 'my_page' : 'not_logined', { user_profile_json: req.oidc.user })
})

// 메인
app.get('/main', function(req, res) {
    res.render('main_page')
})

// 검색
app.get('/search', function(req, res) {
    res.render('search_page')
})

// 글쓰기
app.get('/new', function(req, res) {
    // res.render('new_page')
    res.render(req.oidc.isAuthenticated() ? 'new_page' : 'not_logined')
})

app.post('/newAfter', function(req, res) {
    var body = req.body
    
    var sql = 'INSERT INTO review (place, content, user_email) VALUES(?, ?, ?)'
    var params = [body.place, body.content, JSON.stringify(req.oidc.user.email).toString().replace(/"/g, "")]
    conn.query(sql, params, function(err) {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err)
            res.render('new_fail')
        } else {
            res.render('new_success')
        }
    })
})

// 관광코스
app.get('/course', function(req, res) {
    res.render('course_page')
})


// 로그인
app.get('/login', function(req, res) {
    res.render('login_page')
})

app.get('/login_success', function(req, res) {
    res.render('login_success')
})

// 회원가입
app.get('/signup', function(req, res) {
    res.render('signup_page')
})

app.get('/signup_success', function(req, res) {
    res.render('signup_success')
})

app.get('/signup_fail', function(req, res) {
    res.render('signup_fail')
})


app.listen(3000, function() {
    console.log('Connected, 3000 port!')
})