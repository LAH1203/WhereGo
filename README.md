# WhereGo

<구현 목록>

1. 메인
+ 검색, 글쓰기, 관광코스 세 가지로 나누어 클릭 시 이동할 수 있도록 구현
+ 로그인 및 회원가입 클릭 시 이동할 수 있도록 추가

2. 로그인 및 회원가입
+ 데이터베이스 내에 사용자의 정보가 들어가도록 구현 -> Auth0 사용

3. 검색창
+ 시도, 시군구, 관광지명별로 검색할 수 있는 텍스트창
  + 유의점 1: 관광지명만 검색했을 때도 나오도록 구현
  + 유의점 2: 관광지명이 있을 때와 없을 때를 나누어야 할 듯..? (api에서 관광자원리스트조회와 관광자원상세조회가 나눠져 있는 듯하다.)
+ 검색 후 검색에 맞는 결과를 출력하는 부분
+ 각 관광지를 눌렀을 때 관광지에 대한 자세한 설명 창으로 넘어가는 부분

4. 각 장소별 창
+ api에 포함된 정보 및 사진, 사용자의 후기를 볼 수 있도록 구현

5. 후기글 쓰는 창
+ api에 존재하는 관광지에 대해 별점을 남기고 후기글을 쓸 수 있도록 구현
+ 데이터베이스 내에 저장

6. 관광코스별 소개
+ api 내에 존재하는 관광코스를 나열해주는 창 만들기


<사용 api>
| api명 | 제공처 | Link |
| ------ | ------ | ------ |
| 관광자원정보 | 한국문화관광연구원 | https://data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=3035538 |
| 한국관광공사 관광사진 정보 | 한국관광공사 | https://data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15024675 |
| 관광코스별 관광지 상세 날씨 조회서비스 | 기상청 | https://data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15056912 |


<Commit 기록>
- 메인 화면 버튼 추가 및 페이지 이동 코드 작성 (2021-01-04)
  + 간단한 뼈대 생성
- 로그인 및 회원가입 ver1 (2021-01-04)
  + 로그인, 회원가입 페이지 구현
  + 로그인 알고리즘 일부 구현
- 로그인 및 회원가입 ver2 (2021-01-05)
  + Auth0로 구현함(자동으로 DB와 연결까지 해주는 착한 아이)
- 검색 창 ver1 (2021-01-05)
  + search_page.jade
    + 필수 부분만 구현(아직 꾸미진 X)
  + search.js
    + 관광자원정보 api 추가
    + request를 require하는 부분에서 'Uncaught ReferenceError: require is not defined'하는 오류가 남 -> 내일 바로 고쳐보자
- (2021-01-06) 여전히 오류를 고치고 있다..
  + 'SERVICE KEY IS NOT REGISTERED ERROR.'라는 오류가 계속해서 나고 있다.
- (2021-01-07) 관광자원정보 api에서 계속 오류가 나길래 문의를 했다.
  + 문의 결과, api 인증키 등록 오류가 있지만 현재 원인을 몰라 서비스가 정상적으로 작동되지 않는다고 한다. 언제쯤 서비스가 정상화될지 모르기 때문에 양해를 부탁드린다는 메일을 받았다.
  + 검색 기능은 조금만 고민을 해본 뒤, 다른 api로 바꾸거나 내 나름대로 소박하게나마 DB를 만들어서 그곳에 검색을 하는 방식으로 바꾸거나 둘 중에 하나로 해야할 것 같다.
- 코스 정보 받아오는 샘플 코드 작성 (2021-01-07)
  + course.js
- 글 작성 폼 틀 완성 (2021-01-11)
  + new_page.jade
- 글 작성 시 Mysql에 저장되도록 연동 (2021-01-11)
  + mysql.js
  + 참고 : https://gongbu-ing.tistory.com/32
  + 계속해서 Connection lost: The server closed the connection과 Cannot enqueue Query after fatal error가 발생한다. 구글에 검색하며 원인을 분석하고 여러 방법을 써보았지만 고쳐지지 않았기 때문에 이에 대해 조금 더 알아봐야 할 것 같다.


(임시로 쓰는 다음에 해야할 부분)
1. 검색 창 api와 연결하고 검색 UI 구축하기(api 오류로 인해 보류)
2. 글쓰기할 때 db에 사용자와 연계되어 저장되도록 만들기
3. api 받아와서 코스 정보 사용자에게 알려주기
