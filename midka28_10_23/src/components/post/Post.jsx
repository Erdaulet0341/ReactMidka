import React, { useEffect, useState, useMemo } from "react";
import s from "./Post.module.css";

export default function Post(props) {
  const [post, setpost] = useState([]);
  const [comments, setComments] = useState([]);


  const fetchDataForComment = () => {
    fetch(`http://0.0.0.0:4000/api/posts/comment/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchData = () => {
    fetch(`http://0.0.0.0:4000/api/posts/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        setpost(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchDataForComment()
  }, []);

  const deletePost = () => {
    fetch(`http://0.0.0.0:4000/api/posts/${props.id}`, 
      { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        setpost(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  return (
    <div className={s.container}>
      <h1>{post.name}</h1>
      <p>{post.like}</p>
      <img src={post.imageURL} alt="postImage" />
      <p>{post.description}</p>
      <div className={s.comments}>
        {comments.map((comment) => (
          <p>{comment.text}</p>
        ))}
      </div>
      <div className={s.btns}>
        <button>add comment</button>
        <button>edit post</button>
        <button onClick={deletePost()}>delete post</button>
      </div>
    </div>
  );

  
}