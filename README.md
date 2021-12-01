# AgileStorming

서비스 주소 : https://agilestorming.live/
	
💡 `AgileStorming`은 쉽게 쓰는 **실시간 애자일 협업 툴**입니다.
	
저희는 마인드맵 방식으로 애자일 방법론에 기반한 협업을 간편하게 시작할 수 있도록 지원합니다. 
	
아이디어는 [마인드마이스터](https://mm.tt/2098746496?t=M91wlxD15G)에서 얻었으며, 프로젝트를 위한 마인드맵을 그리다가 애자일 방법론을 접목한 협업툴을 만들게 되었습니다.

![image](https://user-images.githubusercontent.com/60315683/143397838-57bbc531-801a-4c30-841a-7aa646e929c9.png)

### ✅ 마인드맵 작성을 통해 프로젝트를 개발하세요!

실시간으로 팀원들과 다 함께 마인드맵을 그리며, 프로젝트를 기획할 수 있습니다.

### ✅ 마인드맵만 작성하세요! 애자일을 위한 환경은 저희가 만들어 드릴게요!

마인드맵을 작성하시면, 칸반 보드, 백로그, 번업 차트, 캘린더는 자동으로 생성됩니다.

### ✅ 다양한 방식으로 프로젝트를 관리하세요!

칸반보드에서 작업중인 작업은 다른 사람들에게도 나타납니다. 
마인드맵 히스토리를 통해 프로젝트 발전 과정을 한 눈에 파악하세요.
스프린트, 라벨을 통해 태스크를 관리할 수 있습니다.
백로그, 캘린더, 차트를 통해 프로젝트 현황을 파악할 수 있습니다.

<br/>

## Member

|J036 김승현|J046 김유석|J122 안주영|J195 조성현|
|---|---|---|---|
|<img src="https://github.com/daejjyu.png" width="110">|<img src="https://github.com/yusokk.png" width="110">|<img src="https://github.com/juyahn.png" width="110">|<img src="https://github.com/Tongky-HGU.png" width="110">|
|[@daejjyu](https://github.com/daejjyu)|[@yusokk](https://github.com/yusokk)|[@juyahn](https://github.com/juyahn)|[@Tongky-HGU](https://github.com/Tongky-HGU)|
  
<br/>

## 사용 스택

<div align="center">
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black" style="margin: 2px"/>
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" style="margin: 2px"/>
	  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" style="margin: 2px"/>
</div>
<div align="center">
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" style="margin: 2px">
    <img src="https://img.shields.io/badge/create_react_app-09D3AC?style=for-the-badge&logo=create-react-app&logoColor=black" style="margin: 2px">
    <img src="https://img.shields.io/badge/emotion/styled-DB7093?style=for-the-badge&logo=react&logoColor=black" style="margin: 2px">
    <img src="https://img.shields.io/badge/recoil-000000?style=for-the-badge&logo=react&logoColor=white" style="margin: 2px">
</div>
<div align="center">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" style="margin: 2px">
    <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white" style="margin: 2px">
    <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" style="margin: 2px">
    <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" style="margin: 2px">
    <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" style="margin: 2px">
    <img src="https://img.shields.io/badge/typeorm-262627?style=for-the-badge&logo=typeorm&logoColor=white" style="margin: 2px">
</div>
<div align="center">
	<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" style="margin: 2px">
	<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" style="margin: 2px">
	<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=GitHubActions&logoColor=white" style="margin: 2px">
</div>

<br/>

## 애자일스토밍의 구조

![image](https://user-images.githubusercontent.com/73219421/144015475-9abd93cb-2d0f-43ae-b031-2cdfffa69a21.png)

레디스를 사용해 이벤트 소싱 패턴을 적용하였습니다. 소켓 통신을 전달된 프로젝트의 변경 사항이 요청되면, 레디스에 로그를 저장해 빠르게 응답하고 비동기로 데이터베이스에 반영합니다.

서버를 도커화시키고, 자동 배포 환경을 구축했습니다.

CI 환경을 구축, 테스트와 lint를 자동화하여 코드 품질을 보호했습니다.

<br/>	

## 주요 기능 소개

### 프로젝트 생성 및 공유
![프로젝트 생성 및 공유](https://user-images.githubusercontent.com/37368480/144149825-ff57578c-dae3-4212-8d14-89c12d26e821.gif)

- 프로젝트를 생성하고 링크 공유를 통해 함께 프로젝트를 시작할 수 있습니다.

### 실시간 공동 편집 기능
![공동 편집](https://user-images.githubusercontent.com/37368480/144149869-251bc31b-c7a5-462d-815a-3a1ba34ad553.gif)

- 소켓통신을 이용하여 실시간으로 공동 편집이 가능합니다.
- 스프린트, 라벨을 생성하여 원하는 작업을 할당할 수 있습니다.

### 히스토리 기능
![히스토리 기능](https://user-images.githubusercontent.com/37368480/144149877-b8a7b3bc-51d0-404d-a3c8-3340e5864bcb.gif)

- 마인드맵의 전체 히스토리를 확인할 수 있습니다.

### 칸반보드, 캘린더, 차트, 백로그 기능
![칸반보드, 캘린더, 차트, 백로그 기능](https://user-images.githubusercontent.com/37368480/144149883-184bd8b6-e82f-4cf0-8335-86cf60b307a6.gif)

- 할당된 태스크를 칸반보드, 캘린더, 차트, 백로그 탭에서 쉽게 확인할 수 있습니다.

### 필터링 기능
![필터링 기능](https://user-images.githubusercontent.com/37368480/144149884-5d7df62f-5737-43ec-a9c3-84bd4257426d.gif)

- 스프린트, 담당자, 라벨의 필터링 기능을 제공함으로써 전체 진행 상태를 쉽게 파악할 수 있습니다.

<div align="center">
<a href="https://github.com/boostcampwm-2021/web08/wiki"><h2>Wiki Home</h2></a>

|<a href="https://docs.google.com/spreadsheets/d/1OVi6fjFgQ8Pn-q-Mb5ZRSB4xBjd0Dcyfu4gJRR42esU/edit">📝 백로그</a>|<a href="https://www.mindmeister.com/ko/2067819219">💭 마인드맵</a>|
|---|---|
|<img src="https://user-images.githubusercontent.com/60315683/140671941-78cead49-9faf-4257-8fe2-0f1c937cc022.png" style="width:500px;height:300px;"/>|<img src="https://user-images.githubusercontent.com/60315683/140672316-fa646228-3dc8-4b93-9122-294ae097358f.png" style="width:500px;height:300px;"/>|
	
<br/>
	
|<a href="https://www.figma.com/file/2q8KexaWzWsfdptQfBviLX/AgileStorming">🎀 피그마</a>|<a href="https://github.com/boostcampwm-2021/web08/wiki/ER-Diagram">🛢 ER Diagram</a>|
|---|---|
|<img src="https://user-images.githubusercontent.com/60315683/140672467-22b3aa52-daab-47ac-93fc-44a02662c98c.png" style="width:500px;height:300px;"/>|<img src="https://user-images.githubusercontent.com/60315683/140672641-5bfd2e75-b626-4afa-9b41-cfe4efc0e627.png" style="width:500px;height:300px;"/>|
</div>
