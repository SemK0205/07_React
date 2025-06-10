import { useEffect, useState } from "react";
import { axiosAPI } from "../api/axiosAPI";
import OpenModal from "./OpenModal";

const TodoList = () => {
  // 작성한 todo를 기억할 List(배열) 상태
  const [todoList, setTodoList] = useState([]);

  // 모달 열기/닫기
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 현재 수정 중인 todo
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  // 수정 버튼 클릭 시 모달 열기
  const handleEditClick = (index) => {
    setCurrentEditIndex(index);
    setIsModalOpen(true);
  };

  // 서버에서 todolist를 가져오는 함수
  const todoListSelect = async () => {
    try {
      const resp = await axiosAPI.get("/api/selectTodo");
      if (resp.status === 200) {
        // 변환된 리스트 생성
        const dataList = resp.data.map((todo) => ({
          id: todo.todoNo,
          title: todo.todoTitle,
          isDone: todo.complete === "Y",
        }));
        setTodoList(dataList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    todoListSelect();
  }, []);

  useEffect(() => {
    if (todoList !== null) setIsLoading(false);
  }, [todoList]);

  const [inputValue, setInputValue] = useState("");

  // Add Todo 버튼 클릭 시 todoList 상태에 업데이트 이벤트 핸들러 함수
  const handleAddTodo = async () => {
    try {
      const resp = await axiosAPI.post("/api/insertTodo", {
        todoTitle: inputValue,
        complete: false,
      });
      if (resp.status === 200) {
        if (resp.data === 1) {
          setTodoList([...todoList, { title: inputValue, isDone: false }]);
          setInputValue("");
          todoListSelect();
          alert("할 일 추가 성공");
        } else {
          alert("할 일 추가 실패");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 수정 모달에서 저장 버튼 클릭 시 todoList 상태 업데이트
  const handleSaveEdit = async (newTitle) => {
    const updatedTodo = {
      ...todoList[currentEditIndex],
      title: newTitle,
    };

    try {
      const resp = await axiosAPI.post("/api/updateTodoTitle", {
        todoNo: updatedTodo.id,
        todoTitle: newTitle,
        complete: updatedTodo.isDone ? "Y" : "N",
      });
      if (resp.status === 200) {
        const newTodoList = [...todoList];
        newTodoList[currentEditIndex] = updatedTodo;
        setTodoList(newTodoList);
        setIsModalOpen(false);
        setCurrentEditIndex(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 완료/미완료 상태 업데이트 이벤트 핸들러 함수
  const handleToggleTodo = async (index) => {
    // todoList 상태 업데이트
    const updatedTodo = {
      ...todoList[index],
      isDone: !todoList[index].isDone,
    };

    const newTodoList = [...todoList];
    newTodoList[index] = updatedTodo;
    setTodoList(newTodoList);

    // 서버에 업데이트 요청 보내기
    try {
      const resp = await axiosAPI.post("/api/updateTodo", {
        todoNo: updatedTodo.id,
        complete: updatedTodo.isDone ? "Y" : "N",
      });
      if (resp.status === 200) {
        console.log("update 성공");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // todoList에 있는 현재 상태(todo요소)를 삭제하는 이벤트 핸들러 함수
  const handleDeleteTodo = async (index) => {
    const resp = await axiosAPI.post("/api/deleteTodo", {
      todoNo: todoList[index].id,
    });
    if (resp.status === 200) {
      if (resp.data === 1) {
        alert("할 일 삭제 성공");
      } else {
        alert("할 일 삭제 실패");
      }
    }
    const newTodoList = todoList.filter((_, i) => i !== index);

    setTodoList(newTodoList);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>나의 TodoList</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button onClick={handleAddTodo}>Add Todo</button>

        <ul>
          {todoList.map((todo, index) => {
            return (
              <li key={index}>
                <span
                  style={{
                    textDecoration: todo.isDone ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => handleToggleTodo(index)}>
                  {todo.isDone ? "미완료" : "완료"}
                </button>
                <button onClick={() => handleEditClick(index)}>수정</button>
                <button onClick={() => handleDeleteTodo(index)}>삭제</button>
              </li>
            );
          })}
        </ul>

        <OpenModal
          open={isModalOpen}
          close={() => setIsModalOpen(false)}
          save={handleSaveEdit}
          initialTitle={
            currentEditIndex !== null ? todoList[currentEditIndex].title : ""
          }
        />
      </div>
    );
  }
};

export default TodoList;
