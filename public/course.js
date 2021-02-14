function course() {
    // [동네예보조회]
    // 조회조건(현재시각, 예보기간, 코스ID)으로
    // 동네예보 데이터(코스명, 관광지명, 테마, 기온, 습도 등)를
    // 조회하는 기능
    const form = document.course_search_form;
    const course_id = form.course_id.value;
    var searchDate = document.getElementById('searchDate').value;

    // const date = new Date();
    // var year = date.getFullYear();
    // var month = date.getMonth() + 1;
    // var day = date.getDate();

    var year = searchDate.substr(0, 4);
    var month = searchDate.substr(5, 2);
    var day = searchDate.substr(8, 2);

    var url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
    // var queryParams = '?serviceKey=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D&numOfRows=10&pageNo=1&dataType=XML&CURRENT_DATE=2019122010&HOUR=24';
    var queryParams = '?serviceKey=M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D&numOfRows=10&pageNo=1&dataType=XML';
    if (day < 10) {
        day -= 2;
        queryParams += `&CURRENT_DATE=${year}${month}${day}00&HOUR=24`;
    }
    else {
        day -= 2;
        if (day < 10)
            queryParams += `&CURRENT_DATE=${year}${month}0${day}00&HOUR=24`;
        else
            queryParams += `&CURRENT_DATE=${year}${month}${day}00&HOUR=24`;
    }
    queryParams += `&COURSE_ID=${course_id}`;   //1~438까지 존재

    var link = url + queryParams;
    console.log(link);
    location.href = link;
    
}
