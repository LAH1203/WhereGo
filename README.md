# WhereGo
### 여행지 후기 검색 웹앱

### 목차
>1. [구현 목록](#구현-목록)
>>    1. [메인 화면](#메인)
>>    2. [로그인 및 회원가입](#로그인-및-회원가입)
>>    3. [마이페이지](#마이페이지)
>>    4. [내 후기 보기](#내-후기-보기)
>>    5. [후기 검색](#후기-검색)
>>    6. [각 장소별 창](#각-장소별-창)
>>    7. [후기](#후기글-쓰는-창)
>>    8. [관광코스](#관광코스별-소개)
>>    9. [데이터베이스](#데이터베이스)
>>    10. [기타](#기타)
>2. [사용 API](#사용-api)
>3. [Commit 기록](#commit-기록)


## 구현 목록

### 메인
+ 검색, 글쓰기, 관광코스 세 가지로 나누어 클릭 시 이동할 수 있도록 구현
+ 로그인, 마이페이지 추가

### 로그인 및 회원가입
+ 데이터베이스 내에 사용자의 정보가 들어가도록 구현 -> Auth0 사용

### 마이페이지
+ Auth0에서 빼내온 정보로 간단하게 마이페이지 구현
+ 마이페이지에서 로그아웃 클릭 시 로그아웃 할 수 있도록 만듦

### 내 후기 보기
+ 마이페이지에서 내 후기 보기를 클릭 시 DB에서 본인 이메일로 쓰인 후기를 꺼내 보여주도록 만듦

### 후기 검색
+ 관광지명을 입력하고 검색했을 때 각 장소로 쓰인 후기를 DB에서 꺼내어 출력하도록 구현

### 각 장소별 창
+ api에 포함된 정보 및 사진, 사용자의 후기를 볼 수 있도록 구현

### 후기글 쓰는 창
+ api에 존재하는 관광지에 대해 별점을 남기고 후기글을 쓸 수 있도록 구현
+ 데이터베이스 내에 저장

### 관광코스별 소개
+ api 내에 존재하는 관광코스를 나열해주는 창 만들기

### 데이터베이스
+ Mysql의 localhost에 연결하여 사용
+ localhost이므로 다른 컴퓨터에서 사용하지 못하는 것을 고려해 사진 첨부
![WhereGo DB 구성](https://user-images.githubusercontent.com/57928612/104992684-e4653700-5a64-11eb-8ae6-4cfee4ea34a7.png)
+ 장소명, 내용, 사용자 이메일로 구성

### 기타
+ CSS 꾸미기


## 사용 API
| api명 | 제공처 | Link |
| :------: | :------: | ------ |
| 관광자원정보(서비스 중지) | 한국문화관광연구원 | https://data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=3035538 |
| 관광코스별 관광지 상세 날씨 조회서비스 | 기상청 | https://data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15056912 |


## Commit 기록
+ 메인
  - 메인 화면 버튼 추가 및 페이지 이동 코드 작성 (2021-01-04)
    + 간단한 뼈대 생성
+ 로그인/로그아웃 및 회원가입
  - **로그인 및 회원가입 ver1** (2021-01-04)
    + 로그인, 회원가입 페이지 구현
    + 로그인 알고리즘 일부 구현
  - **로그인 및 회원가입 ver2** (2021-01-05)
    + Auth0로 구현함(자동으로 DB와 연결까지 해주는 착한 아이)
    + localhost가 아니므로 아무 곳에서나 로그인 및 회원가입 가능
  - **로그아웃 ver1** (2021-01-15)
    + 로그아웃을 시도했지만 오류가 난다. 좀 더 알아본 뒤에 가능하다면 고치고, 아니면 기능을 빼는 형태로 가야할 것 같다.
+ 검색
  - **검색 ver1** (2021-01-05)
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
  - **검색 ver2** (2021-01-19)
    + api 서비스 중지로 인해 api가 아니라 DB와 연계해서 DB에 해당 장소가 존재할 경우 후기들을 보여주도록 만들었다.
+ 여행 코스
  - 코스 정보 받아오는 샘플 코드 작성 (2021-01-07)
    + course.js
  - **여행 코스 ver1** (2021-01-27)
    + 코스 번호 입력 시 api가 제공하는 정보가 있는 링크로 이동하도록 만듦
    + 버튼이 아닌 엔터로 검색할 경우 전달되는 쿼리를 처리하는 과정에서 오류가 나는데, 해결하려면 조금의 시간이 더 필요할 것으로 보임
    + 현재는 api 링크로 바로 이동해 정돈되지 않은 정보가 보이나, 조금 더 공부 후 다음 버전에서는 정돈된 형태로 바꿀 예정
+ 글 작성
  - **글 작성 ver1** (2021-01-11)
    + 글 작성 폼 틀 완성
    + new_page.jade
  - **글 작성 ver2** (2021-01-11)
    + 글 작성 시 mysql에 저장되도록 연동
    + mysql.js
    + 참고 : https://gongbu-ing.tistory.com/32
    + 계속해서 Connection lost: The server closed the connection과 Cannot enqueue Query after fatal error가 발생한다. 구글에 검색하며 원인을 분석하고 여러 방법을 써보았지만 고쳐지지 않았기 때문에 이에 대해 조금 더 알아봐야 할 것 같다.
  - **글 작성 ver3** (2021-01-13)
    + 글 작성 시 사용자와 연계되어 Mysql에 저장되도록 연동 완료
+ 마이페이지
  - **마이페이지 ver1** (2021-01-19)
    + my_page.jade, profile.js
    + 유저 이메일, 닉네임, 프로필 사진
+ 내 후기 보기
  - **내 후기 보기 ver1** (2021-01-31)
    + my_reviews_page.jade, my_reviews_fail.jade
+ 기타
  - **CSS update ver1** (2021-01-31)
    + 모든 페이지 CSS 일부 업데이트
  - **CSS update ver2** (2021-02-02)
    + 로그인, 로그아웃, 회원가입 페이지 CSS 업데이트


(임시로 쓰는 다음에 해야할 부분)
1. api 받아와서 코스 정보 사용자에게 알려주기
2. 로그아웃 기능
3. CSS 사용해서 UI 꾸미기
