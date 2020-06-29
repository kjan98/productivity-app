import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { selectInProgress, selectTimeCompleted, start, end } from "../slices/taskSlice";

import todos from '../styles/Task.css'

export function Task(props) {
    // console.log(props)
    const inProgress = useSelector(selectInProgress);
    // console.log(inProgress);
    const timeCompleted = useSelector(selectTimeCompleted);
    const dispatch = useDispatch();

    const [play, setPlay] = useState(false);
    console.log(play);

    const toggle = (props) => {
        console.log(props);
        // alert("hey");
        setPlay(play => !play);
    }
    return (
        <div className='foo'>
            <span>{props.task_object.task}</span>
            {/*<button className='button paused' onClick={toggle}></button>*/}

            <button className={`button ${play ? "paused" : "" }`} onClick={toggle}></button>
            {/*<button className='button play'></button>*/}
            {/*<button className='button pause'></button>*/}
            {/**/}
            {/*<span>&#9654;</span>*/}
            {/*<span>&#9655;</span>*/}
            {/*<span>&#8214;</span>*/}
            {/*<span>	&#x23f8;</span>*/}
            {/*<span>&#9208;</span>*/}
            {/*<span>&#9646;</span>*/}
            {/*<span className='fee'><b>&#8545;</b></span>*/}

            {/*<span>&#9616;&#9616;</span>*/}
        </div>
    )
}

export default Task;