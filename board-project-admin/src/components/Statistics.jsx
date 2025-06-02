import React, { useEffect, useState } from "react";
import { axiosAPI } from "../api/axiosAPI";

export default function Statistics() {
  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commnetCountData, setCommentCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMember, setNewMember] = useState([]);

  // 최대 조회 수 게시글 조회
  const getMaxReadCountData = async () => {
    try {
      const resp = await axiosAPI.get("/admin/maxReadCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setReadCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 조회 수 게시글 조회 중 예외 발생 : ", error);
    }
  };
  // 최대 좋아요 수 게시글 조회
  const getMaxLikeCountData = async () => {
    try {
      const resp = await axiosAPI.get("/admin/maxLikeCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setLikeCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 좋아요 수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  // 최대 댓글 수 게시글 조회
  const getMaxCommentCountData = async () => {
    try {
      const resp = await axiosAPI.get("/admin/maxCommentCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setCommentCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 댓글 수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  // 신규 가입 회원 조회
  const getNewMemberList = async () => {
    try {
      const resp = await axiosAPI.get("/admin/newMemberList");
      console.log(resp.data);

      if (resp.status === 200) {
        setNewMember(resp.data);
      }
    } catch (error) {
      console.log("신규 가입 회원 조회 중 예외 발생 : ", error);
    }
  };

  // 컴포넌트가 처음 마운트 될 때 딱 1번만 실행
  // -> Statistics 컴포넌트가 화면에 마운트 될 때 서버로 세가지 데이터 요청, 응답받아와야함
  useEffect(() => {
    getMaxReadCountData();
    getMaxLikeCountData();
    getMaxCommentCountData();
    getNewMemberList();
  }, []); // 의존성 배열이 비어있기 때문에 1번만 실행

  // readCountData, likeCountData, commnetCountData에 변화가 감지될 때
  useEffect(() => {
    if (
      readCountData != null &&
      likeCountData != null &&
      commnetCountData != null &&
      newMember != null
    ) {
      setIsLoading(false);
    }
  }, [readCountData, likeCountData, commnetCountData, newMember]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h2>신규가입회원 ({newMember.length}명)</h2>
        <h3>[7일 이내 가입 회원]</h3>
        <table>
          <thead>
            <tr>
              <th>회원번호</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {newMember.map((member, index) => (
              <tr key={index}>
                <td>{member.memberNo}</td>
                <td>{member.memberEmail}</td>
                <td>{member.memberNickname}</td>
                <td>{member.enrollDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p>게시판 종류 : {readCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{readCountData.boardNo} /{" "}
            {readCountData.boardTitle}
          </p>
          <p>게시글 조회 수 : {readCountData.readCount}</p>
          <p>작성자 닉네임 : {readCountData.memberNickname}</p>
        </section>
        <section className="statistics-section">
          <h2>가장 좋아요 많은 게시글</h2>
          <p>게시판 종류 : {likeCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{likeCountData.boardNo} /{" "}
            {likeCountData.boardTitle}
          </p>
          <p>게시글 좋아요 수 : {likeCountData.likeCount}</p>
          <p>작성자 닉네임 : {likeCountData.memberNickname}</p>
        </section>
        <section className="statistics-section">
          <h2>가장 댓글 많은 게시글</h2>
          <p>게시판 종류 : {commnetCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{commnetCountData.boardNo} /{" "}
            {commnetCountData.boardTitle}
          </p>
          <p>게시글 댓글 수 : {commnetCountData.commentCount}</p>
          <p>작성자 닉네임 : {commnetCountData.memberNickname}</p>
        </section>
      </div>
    );
  }
}
