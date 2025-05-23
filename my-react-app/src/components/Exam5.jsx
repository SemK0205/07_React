/// JSX 예제

import { useState } from "react";
import profile from "../assets/default-profile.png";

const Exam5 = () => {
  //   return <Exam5_1 />;
  //   return <Exam5_2 />;
  //   return <Exam5_3 isLogin={false} />;
  //   return <Exam5_4 isLogin={true} />;
  return <Exam5_5 />;
};

// JSX 예제 1 : 자바스크립트 변수로 사용하기
const Exam5_1 = () => {
  const name = "React";
  const element = <h1>Hello, {name}</h1>;

  return element;
};

// JSX 예제 2 : img 태그 이미지 사용
const Exam5_2 = () => {
  const [userImg, setUserImg] = useState(
    "https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=612x612&w=0&k=20&c=atEjJlw_9g7W6SBgISn3sebRa94-zw5GGgyeddCf-AU="
  );

  return <img src={profile} />;
};

// JSX 예제 3 : 로그인 여부에 따라 화면 다르게 보이기
const Exam5_3 = (props) => {
  // 조건문 사용!
  if (props.isLogin) {
    return <h1>환영합니다!</h1>;
  } else {
    return <h1>로그인 해주세요~!</h1>;
  }
};

// JSX 예제 4 : 로그인 여부에 따라 화면 다르게 보이기(삼항 연산자)
const Exam5_4 = (props) => {
  return <h1>{props.isLogin ? "환영합니다!" : "로그인 바람"}</h1>;
};

// JSX 예제 5 : 배열을 이용한 화면 렌더링 방법 (***중요 : 자주 사용!!***)
// - 클라이언트(React) <-> 서버(SpringBoot)
// - 서버에서 응답받은 데이터는 대부분 배열(List) 형태
const Exam5_5 = () => {
  // 서버에서 아래 배열(list)를 응답받았다고 가정
  const members = ["짱구", "유리", "철수", "훈이", "맹구"];

  // JS 내장함수 중 배열을 하나씩 순차접근해서 콜백함수 내에있는 내용 수행 후
  // 새로운 배열을 만들어 반환 -> map
  // [ <li>짱구</li>, <li>유리</li>, <li>철수</li>, <li>훈이</li>, <li>맹구</li>]

  // 1. filter
  // 2. map
  // 3. reduce

  const listItems = members.map((mem, index) => <li key={index}>{mem}</li>);

  // Each child in a list should have a unique "key" prop.
  // -> React 에서 동적인 리스트를 렌더링 할 때
  // 각 자식 컴포넌트가 고유한 key 속성을 가져야 한다는 규칙 위배시 발생하는 경고!
  // 고유한 key값 작성하면 경고 해결 -> 보통 key 값은 index값으로 사용함

  return <ul>{listItems}</ul>;
};

export default Exam5;
