import React, { useState, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from "uuid";


export const meetingContext = createContext();


const MeetingContextProvider = (props) => {
  
  const [stack, setStack] = useLocalStorage('stack', []);
  const [heap, setHeap] = useLocalStorage('heap', []);
  const [notes, setNotes] = useLocalStorage('notes', []);

  const newStackHandler = (event) => {
          
      setStack([
        ...stack,
        { id: uuidv4(), type: 'stack', topic: event.target.value, time: 0 }
      ]);
      event.target.value = '';
      return console.log(stack)
    
  };

  const newHeapHandler = (event) => {
    if (event.which === 13 && event.target.value !== '') {
      setHeap([
        ...heap,
        { id: uuidv4(), type: 'heap', topic: event.target.value, time: 0 }
      ]);
      event.target.value = '';
    };
  };




  return (
    <meetingContext.Provider value={{ stack, setStack, heap, notes ,newStackHandler }}>
      {props.children}
    </meetingContext.Provider>
  );
}

export default MeetingContextProvider;