import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("https://taskke-aviknayak22.vercel.app/");

const Comments = () => {
  const commentRef = useRef();
  const { category, id } = useParams();
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    socket.on("comments", (data) => setCommentList(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(commentRef.current.value);
    socket.emit("addComment", {
      comment: commentRef.current.value,
      category,
      id,
      userId: localStorage.getItem("userId"),
    });

    commentRef.current.value = "";
  };

  return (
    <div className="comments__container">
      <form className="comment__form" onSubmit={handleSubmit}>
        <label htmlFor="comment"></label>
        <textarea
          type="text"
          name="comment"
          id="comment"
          placeholder="Type your Comments..."
          required
          ref={commentRef}
        ></textarea>
        <button className="commentBtn">ADD COMMENT</button>
      </form>
      <div className="comments__section">
        <h2>Existing Comments</h2>
        {commentList?.map((comment) => (
          <div key={comment.id}>
            <p>
              <span style={{ fontWeight: "bold" }}>
                {comment.text}
              </span>by{" "}
              {comment.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
