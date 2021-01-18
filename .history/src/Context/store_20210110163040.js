import React, { useState, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from "uuid";


export const meetingContext = createContext();


const MeetingContextProvider = (props) => {

  const [stack, setStack] = useLocalStorage('stack', []);
  const [heap, setHeap] = useLocalStorage('heap', []);
  const [notes, setNotes] = useLocalStorage('notes', []);

  // Create a new stack task
  const newStackHandler = (event) => {
    if (event.which === 13 && event.target.value !== '') {
      setStack([
        ...stack,
        { id: uuidv4(), type: 'stack', topic: event.target.value, time: new Date() }
      ]);
      event.target.value = '';
      console.log(stack)
      // setTimer(stack[0] !== undefined ? stack[stack.length - 1].time * 60 : null);
    };
  };

  // Create a new heap task
  const newHeapHandler = (event) => {
    if (event.which === 13 && event.target.value !== '') {
      setHeap([
        ...heap,
        { id: uuidv4(), type: 'heap', topic: event.target.value, time: new Date() }
      ]);
      event.target.value = '';
    };
  };

  // Remove a task
  const taskRemoveHandler = (id, type) => {
    if (type === 'stack') {
      const taskIndex = stack.findIndex(task => {
        return task.id === id;
      });

      let tempList = [...stack];
      tempList.splice(taskIndex, 1);
      setStack(tempList);
      console.log(taskIndex)
    };

    if (type === 'heap') {
      const taskIndex = heap.findIndex(task => {
        return task.id === id;
      });

      let tempList = [...heap];
      tempList.splice(taskIndex, 1);
      setHeap(tempList)
      console.log(taskIndex)
    };
    return console.log('taskRmoveHandler: ', stack);

  }

  const keyboardRemoveHandler = (e) => {
    if (e.ctrlKey && e.shiftKey && e.which === 88) {
      let tempStack = [...stack];
      tempStack.splice(tempStack.length - 1, 1);
      setStack(tempStack);
      setIsRunning(false);
      setTimer(stack[stack.length - 2] ? stack[stack.length - 2].duration * 60 : 0);
    }
  }

    // remove from stack with the keyboard
    useEffect(() => {
      if (document) {
        document.addEventListener('keydown', keyboardRemoveHandler);
      }
      return () => {
        document.removeEventListener('keydown', keyboardRemoveHandler);
      }
    }, [stack]);


  return (
    <meetingContext.Provider value={
      {
        stack,
        setStack,
        heap,
        notes,
        newStackHandler,
        newHeapHandler,
        taskRemoveHandler
      }
    }>
      {props.children}
    </meetingContext.Provider>
  );
}

export default MeetingContextProvider;