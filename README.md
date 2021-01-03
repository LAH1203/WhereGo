# WhereGo

<구현 목록>

1. 메인
+ 검색, 글쓰기, 관광코스 세 가지로 나누어 클릭 시 이동할 수 있도록 구현
+ 로그인 및 회원가입 클릭 시 이동할 수 있도록 추가

2. 로그인 및 회원가입
+ 데이터베이스 내에 사용자의 정보가 들어가도록 구현

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
