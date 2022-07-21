// src/components/GetRIV.js

import React, {useState, useEffect} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
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

const defaultInputValues = {
  "boat": {
    "speed": 10,
    "beam": 30,
    "draft": 10,
    "length": 210,
    "manoeuvrability": 1
  },
  "fairway": ""
}

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/" //bäkkärin osote
});

//Kutsuu calculate_risk endpointtia parametreillä
const fetchRiskValue = async (input_fairway) => {
  const path = 'fairway/calculate_risk'
  defaultInputValues.fairway = input_fairway;
  console.log('You clicked me!' + JSON.stringify(defaultInputValues));
  const response = await api.post(path, defaultInputValues);
  console.log(response.data)

}

const ButtonToggle = styled(Button)`
 opacity: 0.7;
 ${({active}) => active &&`
   opacity: 1
`}
`

const fairwayList = ['Helsinki','Oulu','Rauma', 'Saimaa','Turku'];

const ToggleGroup = () => {
  const [active, setActive] = useState(fairwayList[0]);
  return <div>
    {fairwayList.map(fairway => (
      <ButtonToggle
        active = {active ===fairway}
        onClick={() => fetchRiskValue(fairway)}
        >{fairway}
        </ButtonToggle>
    ))}
  </div>
}

const GetRIV = () => {

  const [posts, setPosts] = useState([]);

  return (
    <ul className="posts">
      <ToggleGroup/>
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

export default GetRIV;


