// SpringBoot 서버로, React 클라이언트로 서로 요청/응답 주고받는 예제

import { useState } from "react";

const Exam7 = () => {
  const [portMsg, setPortMsg] = useState(null);
  const [userMsg, setUserMsg] = useState("");

  const getPortNumber = () => {
    fetch("http://localhost/getPortNumber")
      .then((resp) => resp.json())
      .then((data) => {
        setPortMsg(data);
      });
  };

  const getUserInfo = () => {
    fetch("http://localhost/getUserInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "홍길동", age: 20 }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        setUserMsg(data);
      });
  };
  return (
    <div>
      <p>1. 서버로부터 응답 받은 값(GET)</p>
      <button onClick={getPortNumber}>GET 요청 보내기</button>
      <ul>
        {portMsg?.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <p>2. 서버로부터 응답 받은 값(POST)</p>
      <button onClick={getUserInfo}>POST 요청 보내기</button>
      <p>{userMsg}</p>
    </div>
  );
};

export default Exam7;
