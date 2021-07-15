const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const conn = mysql.createConnection({
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

// mysql 마이페이지
router.get('/profile', (req, res) => {
    if (!req.session.name)
        res.render('login_page');
    else {
        let sql = 'SELECT * FROM user WHERE name=?';
        conn_user.query(sql, [req.session.name], (err, rows) => {
            if (err)
                console.log(err);
            else {
                const user = rows[0];
                sql = 'SELECT * FROM review WHERE user_email=?';
                const params = [req.session.email];
                conn.query(sql, params, (err, result) => {
                    if (err) {
                        console.log('query is not excuted. select fail...\n' + err);
                    } else {
                        res.render('my_page', { me: user, result: result });
                    }
                });
            }
        });
    }
});

// 내 정보 수정 전 비밀번호 확인
router.get('/beforeUpdateInfo', (req, res) => {
    res.render('before_updateInfo');
});

router.post('/beforeUpdateInfo', (req, res) => {
    const pw = req.body.password;
    if (pw === req.session.password)
        res.render('updateInfo_page');
    else
        res.render('wrong_password');
});

// 내 정보 수정
router.post('/updateInfo', (req, res) => {
    const pw = req.body.password;
    const pw2 = req.body.password2;
    if (pw !== pw2)
        res.render('not_equal_password');
    const name = req.body.name;
    const sql = 'UPDATE user SET password=?, name=? WHERE email=?';
    const params = [pw, name, req.session.email];
    conn_user.query(sql, params, (err) => {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('updateInfo_fail');
        } else {
            res.render('updateInfo_success');
        }
    });
});

module.exports = router;