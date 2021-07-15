const express = require('express');
const router = express.Router();

const mysql = require('mysql');
var conn_user = mysql.createConnection({
    host: 'localhost',
    user: 'WhereGo',
    password: 'password',
    database: 'WhereGoUser'
});
conn_user.connect();

// mysql 로그인
router.get('/login', (req, res) => {
    if (!req.session.user)
        res.render('login_page');
    else
        res.redirect('/');
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const pw = req.body.password;
    const sql = 'SELECT * FROM user WHERE email=?';
    conn_user.query(sql, [email], (err, rows) => {
        if (err)
            console.log(err);
        // 사용자가 없을 경우
        if (rows === 0)
            res.render('not_user');
        else {
            const user = rows[0];
            if (pw === user.Password) {
                req.session.email = user.Email;
                req.session.password = user.Password;
                req.session.name = user.Name;
                req.session.save(() => {
                    res.redirect('/');
                });
            } else {
                res.render('login_fail');
            }
        }
    });
});

// mysql 로그아웃
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            res.render('logout_fail');
        else
            res.redirect('/');
    });
});

// mysql 회원가입
router.get('/signup', (req, res) => {
    res.render('signup_page');
});

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const pw = req.body.password;
    const pw2 = req.body.password2;
    if (pw !== pw2)
        res.render('not_equal_password');
    const name = req.body.name;
    let sql = 'SELECT * FROM user WHERE email=?';
    conn_user.query(sql, [email], (err, rows) => {
        if (err)
            console.log(err);
        if (rows === 0) {
            sql = 'INSERT INTO user (email, password, name) VALUES(?, ?, ?)';
            const params = [email, pw, name];
            conn_user.query(sql, params, (err) => {
                if (err) {
                    console.log('query is not excuted. insert fail...\n' + err);
                    res.render('signup_fail');
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.render('already_user');
        }
    });
});

module.exports = router;