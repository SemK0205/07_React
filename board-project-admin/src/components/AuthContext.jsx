import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();
// Context는 React에서 컴포넌트 계층 구조(트리)를 통해 데이터를 효율적으로
// 전달하기 위한 메커니즘.
// 컴포넌트 간에 전역 상태를 공유할 수 있는 컨텍스트를 생성

// Context는 Provider(제공자)와 Consumer(소비자) 존재

// 전역 상태 제공자(Provider) 정의
export const AuthProvider = ({ children }) => {
  // 상태값, 함수
  // 전역적으로 현재 로그인한 회원의 정보를 기억(상태)
  const [user, setUser] = useState(() => {
    const storeUser = localStorage.getItem("userData");
    return storeUser ? JSON.parse(storeUser) : null;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일 입력 핸들러
  const changeInputEmail = (e) => {
    setEmail(e.target.value);
  };

  // 패스워드 입력 핸들러
  const changeInputPw = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    // 비동기로 로그인 요청 -> 서버로
    const response = await axios.post(
      "http://localhost/admin/login",
      {
        memberEmail: email,
        memberPw: password,
      }
      // { "Content-Type": "application/json" } 생략 가능
    );
    console.log(response);

    const adminInfo = response.data;

    if (adminInfo.lenth === 0) {
      alert("이메일 또는 비밀번호 불일치!");
      return;
    }

    // 상태에 세팅
    setUser(adminInfo);

    // 쿠키, localStorage, sessionStorage 등에 저장

    // 브라우저에서 현재 로그인한 관리자 정보를 기억하도록 해야함.
    // localStorage :
    // - 브라우저를 닫아도 데이터가 영구적으로 유지
    // - 브라우저 전역에서 사용(모든 탭과 창에서 공유됨)
    // - 유효기간 만료 기능 없음

    // sessionStorage :
    // - 브라우저 탭 또는 창을 닫으면 데이터가 즉시 삭제
    // - 현재 탭 또는 창에서만 데이터가 유지됨
    // - 유효기간 만료 기능 없음

    // 데이터를 localStorage에 저장
    localStorage.setItem("userData", JSON.stringify(adminInfo));

    // 만료시간 지정 (1시간 뒤에 로그아웃)
    setTimeout(() => {
      // 1시간 뒤에 localStorage에 있는 데이터 삭제
      localStorage.removeItem("userData");
      setUser(null);
      alert("로그인 시간이 만료되었습니다. 다시 로그인해 주세요");
      window.location.href = "/";
    }, 60 * 60 * 1000);
  };

  // 자식(하위) 컴포넌트에게 전달할 데이터 하나로 묶기
  const globalState = {
    user,
    changeInputEmail,
    changeInputPw,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={globalState}>{children}</AuthContext.Provider>
  );
};
