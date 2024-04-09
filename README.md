# 프로젝트명
> classum-assignment

# 프로젝트 설명
사용자가 공간을 개설하고, 공간에 참여하여 자유롭게 글과 댓글을 작성하는 서비스 입니다.

# 개발환경
- [Nest](https://github.com/nestjs/nest).js 10.32
- Node.js 18.20.1
- TypeORM 0.3.20
- TypeScript 5.1.3
- docker-compose 3.8

# 데이터베이스
- MySQL 8.0.22
- 테이블 구조는 아래와 같습니다.
<img width="504" alt="image" src="https://github.com/Suzzzzzy/community_project/assets/97580836/9356e57b-ec32-4f12-b1b5-4f9dc04feb8b">


## 데이터베이스 실행 방법
도커 설치가 필요합니다.
[Docker](https://www.docker.com/get-started) 설치 & 로그인 (tested on v4.3.0)
데이터베이스를 docker-compose 로 구성하고 환경에 따라 DB를 세팅합니다.
- 개발 DB 세팅
```bash
$ docker-compose --env-file .dev.env up -d    
```
- 프로덕션 DB 세팅
```bash
$ docker-compose --env-file .prod.env up -d    
```

# 프로젝트 실행 방법
프로젝트에 필요한 모듈 설치
```bash
$ npm install
```
DB를 먼저 실행 시킨 후에 프로젝트를 실행시킵니다.
- 개발 환경에서 실행
```bash
$ npm run start:dev
```
- 프로덕션 환경에서 실행
```bash
$ npm run start:prod
```
http://localhost:8080/ 접속했을 때, "Hello World"가 출력된다면 데이터베이스와 서비스 실행이 성공적으로 실행된 것입니다.

# API 명세서
[postman api document](https://documenter.getpostman.com/view/19629582/2sA35MzzM5)

# 추가 개발 계획
시간이 부족하여 못다한 개발에 대하여 계획을 작성해보았습니다.
## 파일 및 이미지 업로드
- Multer 라이브러리를 사용하여 파일을 업로드 합니다.
- s3를 연결하여 파일을 저장합니다.
- 파일 업로드 후 응답받은 url을 클라이언트로 부터 전달받아 DB에 저장합니다.

## '좋아요' 및 '궁금해요' 신규기능 추가
- like 테이블을 만들고 post테이블의 id와 매핑되는 post_id 칼럼, user테이블의 id와 매핑되는 user_id을 지정합니다.
- post 테이블에 likeCount 필드를 새로 추가합니다.
- [POST] 메소드로 좋아요 기능을 구현합니다.
- 요청시 like 데이터가 생성되고, post테이블의 likeCount 칼럼은 +1 저장합니다.
- '궁금해요' 기능도 같은 방식으로 구현합니다.
- 또한 FindAllPosts(post 목록 조회) 기능에서 '궁금해요' count 조건도 추가합니다.

## 게시글 상태 표시 신규기능 추가
- 유저의 post 조회 history 테이블을 생성합니다.
- 1. 조회 기록이 없다면 '새로운 게시글 입니다.' 태그를 추가합니다.
- 2. post.updated_at 값이 postHistory.createdAt 보다 최신이라면 '게시글이 수정되었습니다.' 태그를 추가합니다.
- 3. post.chats의 가장 최신 chat.create_at 값이 postHistory.createdAt 보다 최신이라면 '새로운 댓글이 달렸습니다.' 태그를 추가합니다.
- 태그 우선순위에 따라 한 개의 태그만 응답합니다.