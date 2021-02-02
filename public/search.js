// 만들긴 했지만 사용은 못했다.. 아까워서 지우질 못하겠다...

// var request = require('request')
// import require from 'require'

function goSearchPage() {
    window.location.href = search();
}

function search() {
    // var request = require('request')
    const form = document.search_form;
    const sido = form.sido.value;
    const gungu = form.gungu.value;
    const res_nm = form.res_nm.value;

    // 서비스키에 오류가 있다. 일단 문의를 남겨보았으니 기다려보자.
    var ServiceKey = 'M%2BsXx7%2BQWCiCOcTgFAo0V4vPG%2Fi3dmWlPDWY0tEmEQB44%2Fdt%2FHgAsCR%2FcewDOVDRTTPG0IM7rujX0YdJ%2BzV9Xw%3D%3D';
    // 관광지명이 없는 경우 관광자원리스트조회
    if (res_nm == "") {
        var url = 'http://openapi.tour.go.kr/openapi/service/TourismResourceService/getTourResourceList'
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + ServiceKey; // Service Key
        queryParams += '&' + encodeURIComponent('SIDO') + '=' + encodeURIComponent(sido);
        queryParams += '&' + encodeURIComponent('GUNGU') + '=' + encodeURIComponent(gungu);
        
        /*
        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            //console.log('Status', response.statusCode);
            //console.log('Headers', JSON.stringify(response.headers));
            //console.log('Reponse received', body);
        });
        */

        return url + queryParams;
    }
    // 관광지명이 있는 경우 관광자원상세조회
    else {
        var url = 'http://openapi.tour.go.kr/openapi/service/TourismResourceService/getTourResourceDetail';
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + ServiceKey; // Service Key
        queryParams += '&' + encodeURIComponent('SIDO') + '=' + encodeURIComponent(sido);
        queryParams += '&' + encodeURIComponent('GUNGU') + '=' + encodeURIComponent(gungu);
        queryParams += '&' + encodeURIComponent('RES_NM') + '=' + encodeURIComponent(res_nm);

        /*
        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            //console.log('Status', response.statusCode);
            //console.log('Headers', JSON.stringify(response.headers));
            //console.log('Reponse received', body);
        });
        */

        return url + queryParams;
    }
}