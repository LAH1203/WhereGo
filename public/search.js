var request = require('request')

function search() {
    const form = document.search_form;
    const sido = form.sido.value;
    const gungu = form.gungu.value;
    const res_nm = form.res_nm.value;
    // 관광지명이 없는 경우 관광자원리스트조회
    if (res_nm == "") {
        var url = 'http://openapi.tour.go.kr/openapi/service/TourisumResourceService/getTourResourceList'
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=y%2B2SndIjO2vqdm6ioe6MfuPsvGAYgARPBStjtq4QIte4%2B8mBolT%2BYz31y%2FlLDtHHSausIsbdAM5i0bpNlweJtw%3D%3D'; // Service Key
        queryParams += '&' + encodeURIComponent('SIDO') + '=' + encodeURIComponent(sido);
        queryParams += '&' + encodeURIComponent('GUNGU') + '=' + encodeURIComponent(gungu);
        queryParams += '&' + encodeURIComponent('RES_NM') + '=' + encodeURIComponent('');

        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            //console.log('Status', response.statusCode);
            //console.log('Headers', JSON.stringify(response.headers));
            //console.log('Reponse received', body);
        });
    }
    // 관광지명이 있는 경우 관광자원상세조회
    else {
        var url = 'http://openapi.tour.go.kr/openapi/service/TourismResourceService/getTourResourceDetail';
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=y%2B2SndIjO2vqdm6ioe6MfuPsvGAYgARPBStjtq4QIte4%2B8mBolT%2BYz31y%2FlLDtHHSausIsbdAM5i0bpNlweJtw%3D%3D'; // Service Key
        queryParams += '&' + encodeURIComponent('SIDO') + '=' + encodeURIComponent(sido);
        queryParams += '&' + encodeURIComponent('GUNGU') + '=' + encodeURIComponent(gungu);
        queryParams += '&' + encodeURIComponent('RES_NM') + '=' + encodeURIComponent(res_nm);

        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            //console.log('Status', response.statusCode);
            //console.log('Headers', JSON.stringify(response.headers));
            //console.log('Reponse received', body);
        });
    }
}