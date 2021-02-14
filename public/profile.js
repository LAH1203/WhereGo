function logout() {
    // 로그아웃하기 전 경고문구 출력
    if (confirm('로그아웃하시겠습니까?')) {
        var link = 'http://localhost:3000/logout';
        location.href = link;
    } else {
        return;
    }
}