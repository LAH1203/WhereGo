var request = require('request')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.locals.pretty = true
app.set('views', './views')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: false }))

// 관광자원정보 api NodeJs 샘플 코드

// 관광자원리스트조회
var url = 'http://openapi.tour.go.kr/openapi/service/TourisumResourceService/getTourResourceList'
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=y%2B2SndIjO2vqdm6ioe6MfuPsvGAYgARPBStjtq4QIte4%2B8mBolT%2BYz31y%2FlLDtHHSausIsbdAM5i0bpNlweJtw%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('SIDO') + '=' + encodeURIComponent('서울특별시'); /* */
queryParams += '&' + encodeURIComponent('GUNGU') + '=' + encodeURIComponent('종로구'); /* */
queryParams += '&' + encodeURIComponent('RES_NM') + '=' + encodeURIComponent(''); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
});


// 관광자원상세조회
url = 'http://openapi.tour.go.kr/openapi/service/TourismResourceService/getTourResourceDetail';
queryParams = '?' + encodeURIComponent('ServiceKey') + '=y%2B2SndIjO2vqdm6ioe6MfuPsvGAYgARPBStjtq4QIte4%2B8mBolT%2BYz31y%2FlLDtHHSausIsbdAM5i0bpNlweJtw%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('SIDO') + '=' + encodeURIComponent('서울특별시'); /* */
queryParams += '&' + encodeURIComponent('GUNGU') + '=' + encodeURIComponent('종로구'); /* */
queryParams += '&' + encodeURIComponent('RES_NM') + '=' + encodeURIComponent('경복궁'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
});