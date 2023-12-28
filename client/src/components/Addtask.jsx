import { useRef } from "react";
const Addtask = ({ socket }) => {
  const taskRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("createTask", taskRef.current.value);
    taskRef.current.value = "";
  };

  return (
    <form className="form__input" onSubmit={handleSubmit}>
      <label htmlFor="task">Add Task</label>
      <input
        type="text"
        name="task"
        id="task"
        className="input"
        required
        ref={taskRef}
      />
      <button className="addTodoBtn">ADD TASK</button>
    </form>
  );
};

export default Addtask;
