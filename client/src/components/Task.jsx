import Nav from "./Nav";
import Addtask from "./Addtask";
import TaskContainer from "./TaskContainer";

import io from "socket.io-client";

const socket = io.connect("https://taskke-aviknayak22.vercel.app/");

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
