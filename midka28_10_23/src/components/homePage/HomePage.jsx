import React, { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { Link } from "react-router-dom";

export default function Categories() {
  const [posts, setposts] = useState([]);
  const [input, setInput] = useState([]);

  const handl = (event) => {
    setInput(event.target.value);
  };

  const fetchData = () => {
    fetch("http://0.0.0.0:4000/api/posts/")
      .then((response) => response.json())
      .then((data) => {
        setposts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.container}>
      <button className={s.addPost}>Add Post</button>
      <ul className={s.ull}>
        {posts
          .filter((element) => element.name.includes(input))
          .map((post) => (
            <Link
              className={s.linkk}
              to={`/list-of-posts/${post.id}`}
              key={post.id}
            >
              <PostItem post={post} />
            </Link>
          ))}
      </ul>
    </div>
  );
}

const PostItem = ({ post }) => {
  const [poster, setSeller] = useState([]);

  const FetchDataSeller = (id) => {
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/PostById/${id}/`)
        .then((response) => response.json())
        .then((data) => {
          setSeller(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  };

  return (
    <div className={s.body}>
      <div className={s.nft}>
        <div className={s.main}>
          <img className={s.tokenImage} src={post.imageURL} alt="logo" />
          <h2>{post.name}</h2>
          <p className={s.description}>{post.description}</p>
          <div className={s.tokenInfo}>
            <div className={s.like}>
              <ins>◘</ins>
              <p>{post.like}</p>
            </div>
            <div className={s.duration}>
              <ins>◷</ins>
              <p>{post.time} ago</p>
            </div>
          </div>
          <hr />
          <div className={s.creator}>
            <p>
              <ins>Poster: </ins> {FetchDataSeller(post.poster)}{" "}
              {poster.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
