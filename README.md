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
![img.png](img.png)

## 데이터베이스 실행 방법
도커 설치가 필요합니다.
[Docker](https://www.docker.com/get-started) 설치 & 로그인 (tested on v4.3.0)
데이터베이스를 docker-compose 로 구성하고 환경에 따라 DB를 세팅합니다.
- 개발 DB 세팅
```bash
docker-compose --env-file .dev.env up -d    
```
- 프로덕션 DB 세팅
```bash
docker-compose --env-file .prod.env up -d    
```

# 프로젝트 실행 방법
DB를 먼저 실행 시킨 후에 프로젝트를 실행시킵니다.
- 개발 환경에서 실행
```bash
npm run start:dev
```
- 프로덕션 환경에서 실행
```bash
npm run start:prod
```
http://localhost:8080/ 접속했을 때, "Hello World"가 출력된다면 데이터베이스와 서비스 실행이 성공적으로 실행된 것입니다.

# API 명세서
[postman api document](https://documenter.getpostman.com/view/19629582/2sA35MzzM5)


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# 개발 DB 실행
$ docker-compose --env-file .dev.env up 

# 프로덕션 DB 실행
$ docker-compose --env-file .prod.env up 
```