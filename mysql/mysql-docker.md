# MYSQL DOCKER IMAGE BUILD하기
- createTable.sql을 docker 컨테이너 생성시에 실행시킬 것  
  `ADD ./createTable.sql  /docker-entrypoint-initdb.d` 명령어를 사용하였음  
- 필요한 데이터의 경우 flask서버에서 갱신할 예정  

- test.yml은 이 디렉토리 안에서 테스트용으로 생성한 docker-compose file입니다.   

## MYSQL의 구성
1. 유튜브 테이블  
  - 영상 ID, 조회수 정보가 담겨있습니다  
2. 랭킹 테이블  
  - 랭킹 시스템 구현을 위해 사용자 닉네임을 입력받습니다  

- mysql workbanch로 접속하여 아래 명령어들을 사용하면 제대로 초기화가 되었는지 확인이 가능합니다.
```sql
show databases;
use toyProject;
show tables;
```