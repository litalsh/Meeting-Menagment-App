import React, { useState, useEffect, useContext } from 'react';
import {meetingContext} from '../../Context/store';
import './Task.css';

const Task = (props) => {
  const {stack, heap, clock} = useContext(meetingContext);
  const [timer, setTimer] = useState(new Date().getTime() - props.time);

  let minutes = Math.floor(timer / 60000);
  let seconds = Math.abs(timer / 1000);
  minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
  seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;

    useEffect(() => {
      
      const id = window.setInterval(() => {
        setTimer(new Date().getTime() - props.time);
      }, 1000);
      console.log(timer)
      return () => window.clearInterval(id);
    })


  return (
    <li className='task-item' key={props.id}  onDoubleClick={props.changeList}>
      {props.type !== 'heap' ? <div> <span className="duration-display" > {minutes}:{seconds} </span> </div> : null}
      <label className='task-title' >{props.title}</label>
      <button className="remove" onClick={props.remove}>X</button>
    </li>
  );
}

export default Task;

