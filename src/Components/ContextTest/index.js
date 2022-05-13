import React,{useState,useEffect} from 'react'
import PubSub from 'pubsub-js';

let token;
var IntervalId;


export default function ContextTest() {
  //函数局部变量，函数运行完后就会被释放，所以定时器不能放在这里。
  const [count, setCount] = useState(0);
  const [start,setStart]=useState(false)
  useEffect(() => {
    token = PubSub.subscribe('START', hanldeStart);

    return () => {
      PubSub.unsubscribe(token)
    }
  })

  let hanldeStart=() => {
    setCount((preCount)=>preCount+1);
  }

  let handleClick=()=>{
    if (!start) {
      IntervalId=setInterval(() => {
        PubSub.publish('START', 'hello');
      }, 1000);
      setStart(true)
    }
    else {
      console.log('unpublish')
      clearInterval(IntervalId);  
      setStart(false);
    }
  }


  let tip = start ? 'end' : 'start';

  return (
    <div>
      count:{count}
      <button onClick={handleClick}>{tip}</button>
    </div>)
}