import React, { useEffect, useState } from "react";
import { axiosAPI } from "./../api/axiosAPI";

export default function Restore() {
  const [withdrawnMembers, setWithdrawnMembers] = useState(null); // 탈퇴한 회원 목록
  const [deleteBoards, setDeleteBoards] = useState(null); // 삭제 게시글 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async () => {
    try {
      const resp = await axiosAPI.get("/admin/withdrawnMemberList");
      console.log(resp.data);
      if (resp.status === 200) {
        setWithdrawnMembers(resp.data);
      }
    } catch (error) {
      console.log("탈퇴 회원 목록 조회 중 에러 발생 : ", error);
    }
  };

  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async (member) => {
    if (confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")) {
      try {
        const resp = await axiosAPI.put("/admin/restoreMember", {
          memberNo: member.memberNo,
        });
        if (resp.status === 200) {
          alert("복구 되었습니다!");
          getWithdrawnMemberList();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 삭제한 게시글 목록 조회용 함수
  const getDeleteBoardsList = async () => {
    try {
      const resp = await axiosAPI.get("/admin/deleteBoardsList");
      console.log(resp.data);
      if (resp.status === 200) {
        setDeleteBoards(resp.data);
      }
    } catch (error) {
      console.log("삭제된 게시글 목록 조회 중 에러 발생 : ", error);
    }
  };

  // 삭제한 게시글 복구 요청 함수
  const restoreBoard = async (board) => {
    if (confirm(board.boardNo + "번 게시글을 복구 시키겠습니까?")) {
      try {
        const resp = await axiosAPI.put("/admin/restoreBoard", {
          memberNo: board.memberNo,
        });
        if (resp.status === 200) {
          alert("복구 되었습니다!");
          getDeleteBoardsList();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Restore 컴포넌트가 처음 렌더링 될 때
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardsList();
  }, []);

  // withdrawnMembers, deleteBoards 상태가 변경될 때 실행(isLoading 값 변경)
  useEffect(() => {
    if (withdrawnMembers != null && deleteBoards != null) setIsLoading(false);
  }, [withdrawnMembers, deleteBoards]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="menu-box">
        <RestoreMember
          withdrawnMembers={withdrawnMembers}
          restoreMember={restoreMember}
        />
        <RestoreBoard deleteBoards={deleteBoards} restoreBoard={restoreBoard} />
      </div>
    );
  }
}

const RestoreMember = ({ withdrawnMembers, restoreMember }) => {
  return (
    <section className="section-border">
      <h2>탈퇴 회원 복구</h2>

      <h3>탈퇴한 회원 목록</h3>
      {withdrawnMembers.length === 0 ? (
        <p>탈퇴한 회원이 없습니다</p>
      ) : (
        withdrawnMembers.map((member, index) => (
          <ul className="ul-board" key={index}>
            <li>회원 번호 : {member.memberNo}</li>
            <li>회원 이메일 : {member.memberEmail}</li>
            <li>회원 닉네임 {member.memberNickname}</li>
            <button
              className="restoreBtn"
              onClick={() => {
                restoreMember(member);
              }}
            >
              복구
            </button>
          </ul>
        ))
      )}
    </section>
  );
};

const RestoreBoard = ({ deleteBoards, restoreBoard }) => {
  return (
    <section className="section-border">
      <h2>삭제 게시글 복구</h2>

      <h3>삭제된 게시글 목록</h3>
      {deleteBoards.length === 0 ? (
        <p>삭제한 게시글이 없습니다.</p>
      ) : (
        deleteBoards.map((board, index) => (
          <ul className="ul-board" key={index}>
            <li>{board.boardNo}</li>
            <li>{board.boardTitle}</li>
            <li>{board.boardName}</li>
            <li>{board.memberNickname}</li>
            <button
              className="restoreBtn"
              onClick={() => {
                restoreBoard(board);
              }}
            >
              복구
            </button>
          </ul>
        ))
      )}
    </section>
  );
};
