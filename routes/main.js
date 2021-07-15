const express = require('express');
const router = express.Router();

// 메인
router.get(['/', '/main'], (req, res) => {
    let logined = false;
    if (req.session.name)
        logined = true;
    
    res.render('main_page', { logined: logined });
});

module.exports = router;