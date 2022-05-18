![oasis](https://user-images.githubusercontent.com/68256639/150932775-15ca8b68-16b2-496a-ba0f-f1646ad83ceb.png)

<br />

<h2 align="center">Oasis</h2>

<br />

<p align="center">
  예술 대학생들을 위한 포트폴리오 커뮤니티 서비스
</p>

<br />
<br />

## 🛠 기술 스택

[![TypeScript Badge](https://img.shields.io/badge/Typescript-235A97?style=flat-square&logo=Typescript&logoColor=white)]()
[![React Badge](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)]()
[![webpack Badge](https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=white)]()
[![redux Badge](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white)]()
[![webpack Badge](https://img.shields.io/badge/ReduxSaga-999999?style=flat-square&logo=ReduxSaga&logoColor=white)]()
[![styled Badge](https://img.shields.io/badge/StyledComponent-DB7093?style=flat-square&logo=styled-components&logoColor=white)]()
[![swr Badge](https://img.shields.io/badge/SWR-000?style=flat-square&logo=SWR&logoColor=white)]()
[![storybook Badge](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=Storybook&logoColor=white)]()

<br />
<br />

## 📂 폴더 구조

```
client
└── src
    ├── apis                         # api 관련 클래스
    ├── assets                       # 이미지, 폰트
    └── components
    |   └── layout                   # 페이지를 둘러싸는 공통 레이아웃
    |   └── shared                   # 공통 컴포넌트 라이브러리
    |   └── features                 # 페이지를 구성하는 컴포넌트
    |       └── index.tsx
    |       └── styled.ts            # 컴포넌트에 사용되는 styled-components
    |       └── useCustomHooks.ts    # 컴포넌트에 사용되는 custom hooks
    |
    ├── constants                    # 상수
    ├── hooks                        # custom hooks
    ├── pages                        # 페이지
    ├── services                     # 컴포넌트에 사용되는 클래스
    ├── stores                       # redux 상태 관리
    ├── stories                      # storybook
    |   └── Common
    |   └── Page
    |
    └── utils                        # 유틸 함수
```
