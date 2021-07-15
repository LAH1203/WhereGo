const express = require('express');
const router = express.Router();

// 관광코스
router.get('/course', (req, res) => {
    res.render('course_page');
});

/*
const course = (course_id) => {
    const url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
    let queryParams = '?serviceKey=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D&numOfRows=10&pageNo=1&CURRENT_DATE=2019122010&HOUR=24';
    queryParams += '&COURSE_ID=' + course_id;
    const link = url + queryParams;
    // location.href = link;
    console.log(link);
    // location.set(link);
    // location();
    return link;
}
*/

module.exports = router;