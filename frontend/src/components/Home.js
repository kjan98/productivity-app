import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import axios from 'axios';
import {add, load, clear, allData} from "../slices/todoSlice"
import Task from "./Task";
import {selectCount} from "../features/counter/counterSlice";

import calendar from '../images/calendar.png';
import '../styles/Home.css';

function Home() {
    const data = useSelector(allData);
    const dispatch = useDispatch();
    console.log(data);


    const [calendarAppear, setCalendarAppear] = useState(false);
    const clicked = () => {
        setCalendarAppear(true);
    };

    function loadData() {
        return dispatch => {
            axios.get("http://localhost:8000/api/tasks/")
                .then(res => {
                    console.log(res);
                    dispatch(load(res.data))
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => dispatch(loadData()), []);


    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            {/*<img className='d-flex justify-content-end align-items-end' src={calendar} alt='calendar-icon' />*/}
            {console.log(data)}
            <div className='header container-fluid d-flex flex-row justify-content-between align-items-start'>
                <div className='filler'></div>
                <h1 className="row"> {moment().format('MMMM D, YYYY')} </h1>
                {/*<input type='image' src={calendar} className='row'/>*/}
                <button type='button' className='row calendar-button btn btn-link' onClick={clicked}><img src={calendar}
                                                                                                          alt='calendar-icon'/>
                </button>
            </div>
            <div className="container-fluid d-flex flex-row justify-content-between">
                <div className="post_it_container justify-content-end">
                    <div className='post_it'>{data.map(x => <Task key={x.id} task_object={x}/>)}</div>
                    <p> + New Note </p>
                </div>
                <div className="chart "> THIS IS CHART</div>
            </div>
        </div>
    );
}

export default Home;
