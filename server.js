const express = require('express');
const session = require('express-session');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'pug');
// 정적인 파일이 위치할 디렉토리 지정
app.use(express.static('public'));
app.use(cookieParser());
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '!@#$%^&*',
    resave: true,
    saveUninitialized: true
}));

app.use('/', require('./routes/main'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/mypage'));
app.use('/', require('./routes/reviews'));
app.use('/', require('./routes/course'));

app.listen(3000, () => {
    console.log('Connected, 3000 port!')
});