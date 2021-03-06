# WhereGo
### 여행지 후기 검색 웹앱

### 목차
>1. [구현 목록](#구현-목록)
>2. [사용 API](#사용-api)
>3. [Commit 기록](#commit-기록)


## 구현 목록

### 메인
+ 후기 검색, 후기 작성, 여행 코스 세 가지로 나누어 클릭 시 이동할 수 있도록 구현
+ 로그인, 마이페이지 추가
#### 로그인 전
![image](https://user-images.githubusercontent.com/57928612/125718626-de92c75d-b612-4c15-9ee2-b2e568f85b22.png)
#### 로그인 후
![image](https://user-images.githubusercontent.com/57928612/125718783-6df84a6e-1cfc-4462-9cc5-bea17a836d44.png)


### 로그인 및 회원가입
+ 데이터베이스 내에 사용자의 정보가 들어가도록 구현
#### 로그인
![image](https://user-images.githubusercontent.com/57928612/125718699-a659fe2c-b2f6-4a31-927d-93fbe3e05be6.png)
#### 회원가입
![image](https://user-images.githubusercontent.com/57928612/125718735-0f3b2afd-8909-4566-bf88-21f151683a0d.png)


### 마이페이지
+ 이메일과 이름, 내 후기로 간단하게 마이페이지 구성
+ 마이페이지에서 내 정보 수정 시 비밀번호 확인 후 내 정보 수정할 수 있도록 구현
+ 마이페이지에서 로그아웃 클릭 시 로그아웃 할 수 있도록 만듦
![image](https://user-images.githubusercontent.com/57928612/125718869-6046a342-d61b-499c-ad27-1c8f50f8c2e8.png)


### 내 정보 수정
+ 비밀번호가 일치하는지 먼저 확인 후 DB에 저장된 정보와 일치한다면 비밀번호와 이름을 수정할 수 있도록 구현
#### 수정 전 비밀번호 확인
![image](https://user-images.githubusercontent.com/57928612/125718907-84d1b6a6-f797-43bd-89e7-6eeb426219cb.png)
#### 수정 화면
![image](https://user-images.githubusercontent.com/57928612/125718930-eefa9178-5dbd-4ef0-91c9-e1afb5f04960.png)


### 후기 검색
+ 관광지명을 입력하고 검색했을 때 각 장소로 쓰인 후기를 DB에서 꺼내어 출력하도록 구현
+ 첫 화면에서 모든 후기를 볼 수 있도록 구현
+ 내 후기는 수정 및 삭제가 가능하도록 구현
![image](https://user-images.githubusercontent.com/57928612/125719004-aa15ab5f-0eda-4aa6-9f23-6f3fd68f78c3.png)
#### 검색 시 화면 (부분 검색 가능)
![image](https://user-images.githubusercontent.com/57928612/125719085-f8df27e7-407b-4940-92a6-d555d746f633.png)


### 후기 작성
+ 관광지에 대해 후기글을 쓸 수 있도록 구현
+ 데이터베이스 내에 저장
![image](https://user-images.githubusercontent.com/57928612/125719123-14e42e55-b7be-4843-a7d9-00c30cd1850a.png)


### 후기 수정 및 삭제
+ 데이터베이스의 key인 num을 사용해 글을 수정하거나 삭제할 수 있도록 구현
![image](https://user-images.githubusercontent.com/57928612/125719159-bc53a665-7b1b-412f-9b01-c8064464f079.png)


### 여행 코스
+ api 내에 존재하는 관광코스를 나열해주는 창 만들기
![image](https://user-images.githubusercontent.com/57928612/125719201-d89dcdc5-4ae2-4f30-80cf-556be8cbda3e.png)


### 데이터베이스
+ Mysql의 localhost에 연결하여 사용
+ localhost이므로 다른 컴퓨터에서 사용하지 못하는 것을 고려해 사진 첨부
#### User's Information
![유저 정보 DB 구성](https://user-images.githubusercontent.com/57928612/106604872-8f1c4000-65a3-11eb-8975-e0f3a77d6bfb.png)
+ 이메일, 비밀번호, 이름으로 구성
#### Reviews
![후기 DB 구성](https://user-images.githubusercontent.com/57928612/106573122-95e38c80-657c-11eb-8eef-0faf944de2d1.png)
+ 장소명, 내용, 사용자 이메일, num으로 구성

### 기타
+ CSS 꾸미기
  - 구글 웹 폰트 사용
    - https://fonts.google.com/specimen/Do+Hyeon?subset=korean

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
  - **로그인 및 회원가입 ver3** (2021-02-02)
    + already_user.pug, not_equal_password.pug, not_user.pug
    + 로그아웃과 회원 정보 수정을 만들기 위해 Auth0를 mysql로 전부 바꿈
    + 로그인 시 세션에 사용자 정보를 저장함
    + 회원가입 시 mysql에 사용자 정보를 저장함
    + localhost 구현이므로 외부에서 접속 불가
  - **로그아웃 ver2** (2021-02-02)
    + mysql로 바꾼 후 로그아웃 구현
    + 세션 정보 없앨 시 로그아웃이라고 정하고 이를 구현함
+ 검색
  - **검색 ver1** (2021-01-05)
    + search_page.jade, search_fail.jade
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
  - **검색 ver3** (2021-02-02)
    + 내 후기는 수정 및 삭제가 가능하도록 추가
    + 첫 검색 화면에서 모든 후기가 나오도록 구현
+ 여행 코스
  - 코스 정보 받아오는 샘플 코드 작성 (2021-01-07)
    + course.js
  - **여행 코스 ver1** (2021-01-27)
    + 코스 번호 입력 시 api가 제공하는 정보가 있는 링크로 이동하도록 만듦
    + 버튼이 아닌 엔터로 검색할 경우 전달되는 쿼리를 처리하는 과정에서 오류가 나는데, 해결하려면 조금의 시간이 더 필요할 것으로 보임
    + 현재는 api 링크로 바로 이동해 정돈되지 않은 정보가 보이나, 조금 더 공부 후 다음 버전에서는 정돈된 형태로 바꿀 예정
  - **여행 코스 ver2** (2021-02-14)
    + 검색 시 원하는 날짜를 직접 입력할 수 있도록 구현
    + 날짜의 디폴트 값은 현재 날짜
    + 버튼 클릭뿐만 아니라 엔터 입력 시에도 검색되도록 변경
+ 후기 작성
  - **후기 작성 ver1** (2021-01-11)
    + 후기 작성 폼 틀 완성
    + new_page.jade
  - **후기 작성 ver2** (2021-01-11)
    + 후기 작성 시 mysql에 저장되도록 연동
    + mysql.js
    + 참고 : https://gongbu-ing.tistory.com/32
    + 계속해서 Connection lost: The server closed the connection과 Cannot enqueue Query after fatal error가 발생한다. 구글에 검색하며 원인을 분석하고 여러 방법을 써보았지만 고쳐지지 않았기 때문에 이에 대해 조금 더 알아봐야 할 것 같다.
  - **후기 작성 ver3** (2021-01-13)
    + 후기 작성 시 사용자와 연계되어 Mysql에 저장되도록 연동 완료
+ 마이페이지
  - **마이페이지 ver1** (2021-01-19)
    + my_page.jade, profile.js
    + 유저 이메일, 닉네임, 프로필 사진
+ 내 정보 수정
  - **내 정보 수정 ver1** (2021-02-02)
    + before_updateInfo.pug, updateInfo_page.pug, updateInfo_success.pug, updateInfo_fail.pug, wrong_password.pug
    + 비밀번호가 일치할 경우 해당 유저의 비밀번호와 이름을 바꿀 수 있도록 만듦
+ 내 후기 보기
  - **내 후기 보기 ver1** (2021-01-31)
    + my_reviews_page.jade, my_reviews_fail.jade
  - **내 후기 보기 ver2** (2021-02-02)
    + 수정 및 삭제 기능 추가
+ 후기 수정 및 삭제
  - **후기 수정 및 삭제 ver1** (2021-02-02)
    + update_review_page.pug, update_review_success.pug, update_review_fail.pug, delete_review_success.pug, delete_review_fail.pug, my_reviews.js
    + 데이터베이스의 key인 num을 이용하여 후기를 불러와 수정하고 삭제할 수 있도록 구현
    + 삭제 시 경고 메시지를 띄우는 코드 추가(참고: https://wisetrue.tistory.com/35)
+ 기타
  - **CSS update ver1** (2021-01-31)
    + 모든 페이지 CSS 일부 업데이트
  - **CSS update ver2** (2021-02-02)
    + 로그인, 로그아웃, 회원가입 페이지 CSS 업데이트
  - view engine을 jade에서 pug로 교체 (2021-02-02)
  - 데이터베이스 컬럼 추가 (2021-02-02)
    + 데이터베이스에 num이라는 primary key를 추가하여 데이터가 저장될 때마다 auto_increment되도록 만듦
  - 로그인, 로그아웃, 회원가입 등 회원 정보와 관련 있던 모든 코드를 Auth0 api에서 mysql로 변경 (2021-02-02)
    + 내 정보 수정과 로그아웃을 만들고 싶었지만, Auth0에서 계속 오류가 났기에 mysql로 바꾸었다.
  - 유저 정보가 들어간 데이터베이스 생성 (2021-02-02)
  - routes 분리 및 일부 UI 변경 (2021-07-15)
