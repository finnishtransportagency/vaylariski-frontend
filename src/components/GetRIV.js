// src/components/GetRIV.js

import React from "react";
import axios from "axios";

import styled from 'styled-components';

const Button = styled.button`
   background-color: #ffe082;
   color: white; 
   padding: 5px 15px;
   border-radius: 5px;
   outline: 0;
   text-transform: uppercase;
   margin: 10px 0px;
   cursor: pointer;
   box-shadow: 0px 2px 2px lightgray;
   transition: ease background-color 250ms;
   & hover {
    background-color: white;
   }
   `  

function clickMe(){
  alert('You clicked me!');
}

function ButtonClick() {
  return(
    <>
    <div>
      <Button onClick={clickMe}>
        Button 
      </Button>
     </div> 

     <div>
     <Button onClick={clickMe}>
       Button 
     </Button>
    </div> 
    </>
  );
}

const client = axios.create({
    //baseURL: "https://jsonplaceholder.typicode.com/posts" 
    baseURL: "http://127.0.0.1:8000/fairway/helsinki"
  
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
           setPosts(response.data.helsinki_west.sites);
           console.log(response.data)
        };
        fetchPost();
    }, []);   
  
 
    return (
        <ul className="posts">
        <ButtonClick/>
          {posts.map((post) => (
            <li className="post" key={post.id}>
              <h4>{post.id}</h4>
              <p>Number of lanes: {post.number_of_lanes}</p>
              <p>Aids to navigation: {post.aids_to_navigation}</p>
              <p>Bottom surface: {post.bottom_surface}</p>
            </li>
          ))}
        </ul>
      );
 };
 
 export default App;

