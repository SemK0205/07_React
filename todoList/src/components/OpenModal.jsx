import { useEffect, useState } from "react";
import "../css/OpenModal.css";

const OpenModal = ({ open, close, save, initialTitle }) => {
  const [inputValue, setInputValue] = useState(initialTitle);

  useEffect(() => {
    setInputValue(initialTitle);
  }, [initialTitle]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>할 일 수정</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={() => save(inputValue)}>저장</button>
          <button onClick={close}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default OpenModal;
