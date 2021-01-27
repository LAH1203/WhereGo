function course() {
    // [동네예보조회]
    // 조회조건(현재시각, 예보기간, 코스ID)으로
    // 동네예보 데이터(코스명, 관광지명, 테마, 기온, 습도 등)를
    // 조회하는 기능

    const form = document.course_search_form;
    const course_id = form.course_id.value;

    var url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
    // var queryParams = '?' + encodeURIComponent('ServiceKey') + '=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D'; /* Service Key*/
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    // queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); /* */
    // queryParams += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent('2019122010'); /* */
    // queryParams += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent('24'); /* */
    // queryParams += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('1'); /* 1~438까지 존재 */
    // http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnWthrIdx?serviceKey=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D
    // &numOfRows=10&pageNo=1&CURRENT_DATE=2019122010&HOUR=24&COURSE_ID=1
    var queryParams = '?serviceKey=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D&numOfRows=10&pageNo=1&dataType=XML&CURRENT_DATE=2019122010&HOUR=24';
    queryParams += '&COURSE_ID=' + course_id; /* 1~438까지 존재 */

    var link = url + queryParams;
    location.href = link;
    // document.getElementById('alert_course').innerText = JSON.stringify(location.href=link);

    // request({
    //     url: url + queryParams,
    //     method: 'GET'
    // }, function (error, response, body) {
    //     console.log('Status', response.statusCode);
    //     console.log('Headers', JSON.stringify(response.headers));
    //     console.log('Reponse received', body);
    // });

    // [기상지수예보조회]
    // 조회조건(현재시각, 예보기간, 코스ID)으로
    // 기상지수예보 데이터(코스명, 관광지명, 테마, 식중독지수, 체감온도, 자외선지수 등)를
    // 조회하는 기능
    // var request = require('request');

    // var url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnWthrIdx';
    // var queryParams = '?' + encodeURIComponent('ServiceKey') + '=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D'; /* Service Key*/
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    // queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); /* */
    // queryParams += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent('2019122010'); /* */
    // queryParams += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent('24'); /* */
    // queryParams += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('1'); /* */

    // request({
    //     url: url + queryParams,
    //     method: 'GET'
    // }, function (error, response, body) {
    //     //console.log('Status', response.statusCode);
    //     //console.log('Headers', JSON.stringify(response.headers));
    //     //console.log('Reponse received', body);
    // });
}

function goLink(link) {
    location.href = link;
}