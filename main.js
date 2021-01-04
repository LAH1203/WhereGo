var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.locals.pretty = true
app.set('views', './views')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: false }))

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
    res.render('new_page')
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