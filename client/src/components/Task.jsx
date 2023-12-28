import Nav from "./Nav";
import Addtask from "./Addtask";
import TaskContainer from "./TaskContainer";

import io from "socket.io-client";

const socket = io.connect("http://localhost:5000/");

const Task = () => {
  return (
    <div>
      <Nav />
      <Addtask socket={socket} />
      <TaskContainer socket={socket} />
    </div>
  );
};

export default Task;
