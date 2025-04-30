import React from "react";
import Task from "./Task";


const Home = (props) => {
  const {showAlert}=props
  return (
    <Task showAlert ={showAlert} />
  );
};

export default Home;