const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'WhereGo',
    password: 'password',
    database: 'reviews'
});
conn.connect();

// 후기 검색
router.get('/search', (req, res) => {
    const sql = 'SELECT * FROM review';
    conn.query(sql, (err, rows) => {
        if (err)
            console.log(err);
        else
            res.render('search_page', { result: null, all: rows, my_email: req.session.email });
    });
});

router.post('/search', (req, res) => {
    const body = req.body;
    const sql = 'SELECT * FROM review WHERE PLACE REGEXP ?';
    const params = [body.place];
    conn.query(sql, params, (err, rows) => {
        if (rows === 0) {
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

// 후기 작성
router.get('/new', (req, res) => {
    res.render(req.session.name ? 'new_page' : 'login_page');
});

router.post('/new', (req, res) => {
    const body = req.body;
    
    const sql = 'INSERT INTO review (place, content, user_email) VALUES(?, ?, ?)';
    const params = [body.place, body.content, req.session.email];
    conn.query(sql, params, (err) => {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('new_fail');
        } else {
            res.render('new_success');
        }
    });
});

// 후기 수정
router.get('/updateReview', (req, res) => {
    const num = req.query.num;
    const sql = 'SELECT * FROM review WHERE num=?';
    const params = [num];
    conn.query(sql, params, (err, rows) => {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('update_review_fail');
        } else {
            res.render('update_review_page', { result: rows });
        }
    });
});

router.post('/updateReview', (req, res) => {
    const body = req.body;
    
    const sql = 'UPDATE review SET place=?,content=? WHERE num=?';
    const params = [body.place, body.content, body.num];
    conn.query(sql, params, (err) => {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('update_review_fail');
        } else {
            res.redirect('/');
        }
    });
});

// 후기 삭제
router.get('/deleteReview', (req, res) => {
    const num = req.query.num;
    const sql = 'DELETE FROM review WHERE num=?';
    const params = [num];
    conn.query(sql, params, (err) => {
        if (err) {
            console.log('query is not excuted. insert fail...\n' + err);
            res.render('delete_review_fail');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;