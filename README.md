## 설치
```
yarn
```

## 실행
```
yarn start
```

## 주요 파일 및 폴더

### ./
App.js 내부에 homework.pdf를 참고하여 만든 컴포넌트와 장르 별 세팅이 가능한 변수를 생성했습니다.
통신 가능한 api를 연결한다면 장르 입력해도 페이지를 불러올 수 잇게 커스텀할 수 있을 것 같습니다.

### ./components/
Header.js: 장르가 다른 페이지를 고려하여 제목을 불러 세팅
Filter.js: 구현 제한 사항에 있던 필터 리스트
RankList.js: 주요

### ./models
comics.js: 초기 세팅 후 변경될 일이 적은 변수 모음

### ./services
rankListSet.js: 레이아웃와 UI을 판단하고 그리는 로직
### stores
rankListApi.js: api 통신 데이터 패치
rankListSlice.js: redux mutation, actions, state를 모아둔 파일

### styles
스타일시트 모음