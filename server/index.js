const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors(
  {
    origin: ["https://taskke-frontend.vercel.app"],
    methods: ["POST","GET"]
  }
));

const UID = () => Math.random().toString(36).substring(2, 10);

let tasks = {
  pending: {
    title: "pending",
    items: [
      {
        id: UID(),
        title: "Send the Figma file to Dima",
        comments: [],
      },
    ],
  },
  ongoing: {
    title: "ongoing",
    items: [
      {
        id: UID(),
        title: "Review GitHub issues",
        comments: [
          {
            name: "David",
            text: "Ensure you review before merging",
            id: UID(),
          },
        ],
      },
    ],
  },
  completed: {
    title: "completed",
    items: [
      {
        id: UID(),
        title: "Create technical contents",
        comments: [
          {
            name: "Dima",
            text: "Make sure you check the requirements",
            id: UID(),
          },
        ],
      },
    ],
  },
};

const io = new Server(server, {
  cors: {
    origin: https://taskke-frontend.vercel.app",
    methods: ["GET", "POST"]
  }
});
const PORT = 5000;

app.get("/api", (req, res) => {
  res.json(tasks);
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("createTask", (data) => {
    const newTask = { id: UID(), title: data, comments: [] };
    tasks["pending"].items.push(newTask);

    io.sockets.emit("tasks", tasks);
  });

  socket.on("addComment", (data) => {
    const taskItems = tasks[data.category].items;
    for (let i = 0; i < taskItems.length; i++) {
      if (taskItems[i].id === data.id) {
        taskItems[i].comments.push({
          name: data.userId,
          text: data.comment,
          id: UID(),
        });
        socket.emit("comments", taskItems[i].comments);
      }
    }
  });

  socket.on("taskDragged", (data) => {
    console.log(data);
    const { source, destination } = data;
    const itemMoved = {
      ...tasks[source.droppableId].items[source.index],
    };

    tasks[source.droppableId].items.splice(source.index, 1);
    tasks[destination.droppableId].items.splice(
      destination.index,
      0,
      itemMoved
    );

    io.sockets.emit("tasks", tasks);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
