import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import axios from 'axios';
import {add, load, clear, allData, loadTime, selectTime} from "../slices/todoSlice"
import Task from "./Task";
import {selectCount} from "../features/counter/counterSlice";
import {TASK_URL, TIME_URL} from "../constants"
// import Modal from "./Modal"
import { Modal, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Calendar from 'react-calendar'

import calendar from '../images/calendar.png';
import '../styles/Home.css';
import 'react-calendar/dist/Calendar.css';

function Home() {
    const data = useSelector(allData);
    const dispatch = useDispatch();
    const time = useSelector(selectTime);

    const [calendarAppear, setCalendarAppear] = useState(false);
    // const clicked = () => {
    //     setCalendarAppear(true);
    // };

    function loadData() {
        return dispatch => {
            axios.get(TASK_URL)
                .then(res => {
                    // console.log('loaddata');
                    dispatch(load(res.data))
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => dispatch(loadData()), []);

    function loadTtime() {
        return dispatch => {
            axios.get(TIME_URL)
                .then(res => {
                    // console.log('3456');
                    // console.log(res);
                    dispatch(loadTime(res.data))
                })
                .catch(err => console.log(err))
        }
    }

    if (Object.entries(time).length === 0) {
        dispatch(loadTtime());
    }

    const toggleModal = (e) => {
        console.log("here");
        // console.log(props);
        // console.log(e.currentTarget.value)
        // console.log(e.value);
        setCalendarAppear(!calendarAppear);
        // console.log(calendarAppear);
    }



    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <div className='pt-2 header container-fluid d-flex flex-row justify-content-between align-items-start'>
                <div className='filler'></div>
                <h1 className="row"> {moment().format('MMMM D, YYYY')} </h1>
                {/*<input type='image' src={calendar} className='row'/>*/}
                <Button type='button' className='row calendar-button btn btn-link' onClick={toggleModal} value='exampleModal' >
                    <img src={calendar} alt='calendar-icon'/>
                </Button>
            </div>
            <div className="container-fluid d-flex flex-row justify-content-between">
                <div className="post_it_container justify-content-end">
                    <div className='post_it'>{data.map(x => <Task key={x.id} task_object={x}/>)}</div>
                    <p> + New Note </p>
                </div>
                <div className="chart "> THIS IS CHART</div>
                <Modal show={calendarAppear} onHide={toggleModal} className='modal fade right' >
                    <Modal.Header closeButton>
                        {/*<Modal.Title></Modal.Title>*/}
                    </Modal.Header>
                    <Modal.Body>
                        <Calendar calendarType='US'/>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default Home;
