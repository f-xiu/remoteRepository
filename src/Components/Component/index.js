import React, { useReducer} from 'react'

const initialState = {
  count: 0,
  inputText1:'123'
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {...state,count: state.count + 1};
    case 'decrement':
      return { ...state ,count: state.count - 1 };
    case 'change':
      return {...state , inputText1: action.inputText1 }
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <p>Count: {state.count}</p>
      <p>nowValue:{ state.inputText1}</p>
      <input type='text'  value={state.inputText1} onChange={(e)=>{dispatch({type:'change',inputText1:e.target.value})}}  />
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}