import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import axios from 'axios';
import {add, load, clear, allData, loadTime, selectTime, selectColors, loadColors} from "../slices/todoSlice"
import Task from "./Task";
import {selectCount} from "../features/counter/counterSlice";
import {TASK_URL, TIME_URL, CURRENT_URL, PROJECT_URL} from "../constants"
import {Modal, Button, Form} from 'react-bootstrap'
import Calendar from 'react-calendar'

import calendar from '../images/calendar.png';
import '../styles/Home.css';
import 'react-calendar/dist/Calendar.css';

function Home() {
    const data = useSelector(allData);
    const dispatch = useDispatch();
    const time = useSelector(selectTime);
    const colors = useSelector(selectColors);

    const [calendarAppear, setCalendarAppear] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectColor, setNewProjectColor] = useState("");

    function loadData() {
        return dispatch => {
            axios.all([
                axios.get(TASK_URL),
                axios.get(PROJECT_URL)
            ])
                .then(axios.spread((task_res, color_res) => {
                    let combined = [];
                    let colors = {}
                    color_res.data.forEach(x => {
                        let colors_tmp = {};
                        colors_tmp['color']  = x.color;
                        colors_tmp['hex_color'] = x.hex_color;
                        colors[x.id] = colors_tmp;
                    });
                    task_res.data.forEach(d => {
                        let t = {...d}
                        t['projectColor'] = colors[t.project_id].hex_color;
                        combined.push(t);
                    })
                    dispatch(load(combined));
                    dispatch(loadColors(colors));
                }))
                .catch(err => {
                    console.log('failed loadData');
                    console.log(err)
                })
        }
    }

    useEffect(() => dispatch(loadData()), []);

    function loadTtime() {
        return dispatch => {
            axios.get(TIME_URL)
                .then(res => {
                    dispatch(loadTime(res.data))
                })
                .catch(err => console.log(err))
        }
    }

    if (Object.entries(time).length === 0) {
        dispatch(loadTtime());
    }

    const toggleModal = (e) => {
        setCalendarAppear(!calendarAppear);
    }

    const handleChange = (e) => {
        // console.log('')
        // alert(e.target.value);
        if (e.target.name === 'newTask') {
            setNewTask(e.target.value);
        } else if (e.target.name === 'project') {
            console.log('here');
            // console.log(e.target.value);
            // console.log(e.selectedOptions)
            console.log(e.target.value);
            // if (e.target.value === '') ? let [pName, pColor] =

            // let [pName, pColor];
            let [pName, pColor] = e.target.value.split(" ");

            setNewProjectName(pName);
            setNewProjectColor(pColor);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let action = {
            'task': newTask,
            'completed': false,
            'projectName': newProjectName,
            'projectColor': newProjectColor
        };
        console.log(action);
        axios.post(TASK_URL, action)
            .then(res => {
                console.log("successfully updated task");
                console.log(res);
                console.log('see if can grab id');
                console.log(res.data.id);
            })
            .catch(err => {
                console.log("failed to update task");
                console.log(err)
            })
        // dispatch(add({}))
        alert('implement submit');
    }


    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <div className='pt-2 header container-fluid d-flex flex-row justify-content-between align-items-start'>
                <div className='filler'></div>
                <h1 className="row"> {moment().format('MMMM D, YYYY')} </h1>
                {/*<input type='image' src={calendar} className='row'/>*/}
                <Button type='button' className='row calendar-button btn btn-link' onClick={toggleModal}
                        value='exampleModal'>
                    <img src={calendar} alt='calendar-icon'/>
                </Button>
            </div>
            <div className="container-fluid d-flex flex-row justify-content-between">
                <div className="post_it_container justify-content-end flex-wrap">
                    <div className='post_it'>{data.map(x => <Task key={x.id} task_object={x}/>)}
                        <Form inline onSubmit={handleSubmit}>
                            <Form.Control type='text' name='newTask' placeholder='New Task'
                                          onChange={handleChange} value={newTask}></Form.Control>
                            <Form.Control as='select' name='project' onChange={handleChange}>
                                <option value=''>select an option</option>
                                <option value='foo blue'>foo blue</option>
                            </Form.Control>
                            <Button type='submit'>    {'\u2714'}</Button>
                        </Form>
                    </div>
                    <p className='text-right'> + New Note </p>
                </div>
                <div className="chart "> THIS IS CHART</div>
                <Modal show={calendarAppear} onHide={toggleModal} className='modal fade right'>
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
