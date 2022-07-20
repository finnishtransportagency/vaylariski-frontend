// src/components/GetRIV.js

import React from "react";
import axios from "axios";

const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts" 
    //baseURL: "http://127.0.0.1:8000/fairway/helsinki"
  
  });

  const App = () => {
    const [posts, setPosts] = React.useState([]);
 
    //React.useEffect(() => {
      // client.get().then((response) => {
         // setPosts(response.data);
       //});
    //}, []);

    React.useEffect(() => {
        const fetchPost = async () => {
           let response = await client.get();
           setPosts(response.data);
        };
        fetchPost();
    }, []);   
  

    return (
        <ul className="posts">
          {posts.map((post) => (
            <li className="post" key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      );
 };
 
 export default App;

