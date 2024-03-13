# 🌊 The Wave

이벤트용 풍선과 파티 소품을 판매하는 쇼핑몰 프로젝트입니다.<br />
<br />

## 🗓️ 프로젝트 기간

2023.11.24 ~ 2024.1.11


## 📌 배포 주소

https://thewavemarket.co.kr/
<br /><br />

## 📌 주요 기능

1. 일반 사용자(회원/비회원)

- 상품 탐색 및 구매: 카테고리별로 분류된 상품들을 쉽게 확인할 수 있습니다. 마음에 드는 상품을 선택하여 장바구니에 담은 후, 간편하게 주문 요청을 할 수 있습니다. <br />
- 정보 관리: (회원 전용) 마이페이지를 통해 개인 정보를 업데이트하거나, 필요한 경우 회원 탈퇴를 진행할 수 있습니다. <br />

2. 관리자

- 상품 관리: 관리자 전용 페이지에서 새로운 상품을 등록하거나 기존 상품 정보를 수정할 수 있습니다. <br />
- 주문 및 배송 관리: 고객들의 주문 현황과 배송 상태를 실시간으로 확인하고 관리할 수 있습니다. <br />
- 회원 관리: 회원의 정보를 관리하고 필요에 따라 회원 계정을 관리(활성화/비활성화)할 수 있습니다. <br />
  <br />

## 👥 팀원 소개

<div align=center >

| 프로필  | 이름 | 역할 | 역할 내용 |
| --- | --- | --- | --- |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/cbffbe1f-68de-4974-9ba3-1cc76519ead8" width="150" height="150" /> | [권구호(팀장)](https://github.com/9walnut) | BE | 기획/문서 작성, DB 설계, CI/CD 구축, https 보안 서버 구축, <br /> 관리자 / 장바구니 API 구현, S3 이미지 업로드 기능 구현 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/620a9128-de56-4b96-8775-9a37372ab9f1"  width="150" height="150" /> | [이예찬](https://github.com/yeeeeechan) | BE | 회원 전용 기능 전반(주문하기/결제하기/상품 페이지) API 구현(JWT), <br /> SNS 간편 로그인 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/81420a4b-c1ca-48ec-a57a-45b8f5224bdd" width="150" height="150" /> | [양현정](https://github.com/hyeoonjeoong) | FE | 관리자 전용 기능 전반(대시보드, 상품 등록/수정/삭제,  회원 관리, 거래 내역 관리) <br /> 페이지네이션, 반응형 디자인 적용 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/bc0aa2ec-89f0-411a-a538-6de87c1fca4d" width="150" height="150" /> | [정우성](https://github.com/dntjd129) | FE | 메인 공통 반응형 컴포넌트 (Navbar, Footer, Carousel), <br /> 회원 전용 기능 전반(장바구니/주문하기/결제하기/상품 페이지) 구현 |

</div>


<br />

## 📌 시작 가이드

```
$ git clone https://github.com/9walnut/TheWave.git
```

### Front-end

```
$ cd client
$ npm install
$ npm start
```

### Back-end

```
$ cd server
$ npm install
$ node .\app.js
```

<br />

<details>
<summary>
    
## 📌 화면 구성

</summary>

<div align=center >

| 회원/비회원 서비스 | 
| :---: |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/4beeb8e0-1ca9-47d4-b5c6-55c2d8e77baf" width="750"> |
| 홈페이지 메인 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/a2e1eb43-0e3c-40a0-bcae-33211b4f3cd7" width="750"> |
| 로그인 페이지 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/b0a3bcae-ce62-42a3-b795-4e95d07e483a" width="750"> |
| 회원 가입 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/167cc85c-f8ce-45c6-b8c3-c71730510d1c" width="750"> |
| 회원 정보 수정 |


---

| 관리자 서비스 |
| :---: |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/01365fa8-feca-4fa8-b0e3-7fa3ed7beff5" width="750"> |
| 어드민 페이지 메인 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/8ccc1488-4329-4aa8-9d5f-9edbf8d87e2c" width="750"> |
| 상품 등록 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/d1e718cb-9ae1-4b3f-848f-2d0f04faf3b8" width="750"> |
| 회원 관리 |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/516f2529-1961-4f50-82ea-e186b18095ad" width="750"> |
| 거래 내역 관리 |

</details>

</div>

<br /><br />

## 📌 프로젝트 구성

<div align=center> 

</div>

<div align=center> 

| **요구사항 정의서 / API 명세서** | **팀 노션** |
| :----------: | :----------: |
| [TheWave_Googlesheet](https://docs.google.com/spreadsheets/d/1RtbeO5gLKY2L9PXQLtN-wkrCOxkJ_HIiNwR-4jxgKNA/edit?usp=sharing) | [TheWave_Notion](https://www.notion.so/TheWave-f74e4e4189904b36a13bd11d4c3bffba?pvs=4) |

</div>
<br />
<div align=center> 
  
| **개체-관계 모델(ERD)** |
| :----------: |
| <img src='https://github.com/9walnut/TheWave/assets/144768130/cb4944e5-13c7-4575-ac9a-ef6e91fb4db5' width="800" /> |


| **시스템 구성** |
| :----------: |
| <img src='https://github.com/9walnut/TheWave/assets/144768130/e718ac2a-4707-4d99-a3f1-ec247c0f5674' width="800" /> |


## 🛠️ 기술 스택

### Front-end
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black" /> <img src="https://img.shields.io/badge/nginx-BA2BD2?style=for-the-badge&logo=nginx&logoColor=black" /> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=black" /> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=black" />
<br />

### Back-end

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" /> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white" /> <img alt="Sequelize" src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" /> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" /> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" /> <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" /> <img src="https://img.shields.io/badge/jsonwebtokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<br />

### DevOps Tools

<img src="https://img.shields.io/badge/Jenkins-%23D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white">
<br />

<details>
<summary>
  
## 📌 커밋 컨벤션

</summary>

| Emoji | Code                          | 기능     | Description              |
| ----- | ----------------------------- | -------- | ------------------------ |
| ✨    | `:sparkles:`                  | Feat     | 새 기능                  |
| ♻️    | `:recycle:`                   | Refactor | 코드 리팩토링            |
| 🔧    | `:wrench:`                    | Chore    | 리소스 수정/삭제         |
| 🐛    | `:bug:`                       | Fix      | 버그 수정                |
| 📝    | `:memo:`                      | Docs     | 문서 추가/수정           |
| 💄    | `:lipstick:`                  | Style    | UI/스타일 파일 추가/수정 |
| 🎉    | `:tada:`                      | Init     | 프로젝트 시작 / Init     |
| ✅    | `:white_check_mark:`          | Test     | 테스트 추가/수정         |
| ⏪    | `:rewind:`                    | Rewind   | 변경 사항 되돌리기       |
| 🔀    | `:twisted_rightwards_arrows:` | Merge    | 브랜치 합병              |
| 🗃     | `:card_file_box:`             | DB       | 데이터베이스 관련 수정   |
| 💡    | `:bulb:`                      | Comment  | 주석 추가/수정           |
| 🚀    | `:rocket:`                    | Deploy   | 배포                     |

</details>
