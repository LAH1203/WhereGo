function update_review(num) {
    var url = 'http://localhost:3000/updateReview';
    var queryParams = '?num=' + num;
    var link = url + queryParams;
    location.href = link;
}

function delete_review(num) {
    // 삭제하기 전 삭제 경고문구 출력
    if (confirm('삭제하시겠습니까?')) {
        var url = 'http://localhost:3000/deleteReview';
        var queryParams = '?num=' + num;
        var link = url + queryParams;
        location.href = link;
    } else {
        return;
    }
}