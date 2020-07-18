import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {
    selectInProgress,
    selectTime,
    selectCompleted,
    start,
    pause,
    stop,
    update,
    loadTime,
    updateCompleted
} from "../slices/todoSlice";
import {TASK_URL, TIME_URL, CURRENT_URL} from "../constants";
import {Button} from "react-bootstrap";
import todos from '../styles/Task.css'

export function Task(props) {
    const time = useSelector(selectTime);
    const dispatch = useDispatch();

    const current_id = props.task_object.id;
    const task_id = props.task_object.tasks.id;
    const task = props.task_object.tasks.task;
    const done = props.task_object.tasks.completed;
    const project_info = props.task_object.tasks.project_info;
    const projectName = project_info.name;
    const projectColor = project_info.project_color.hex_color;
    // debugger;

    const writeCompleted = (current_id, val) => {
        console.log('write completed');
        let project_color_tmp = {
            'id': project_info.project_color.id,
            'color': project_info.project_color.color,
            'hex_color': projectColor
        }
        let project_info_tmp = {
            'id': project_info.id,
            'name': projectName,
            'project_color': project_color_tmp
        }
        let tasks_tmp = {
            "id": task_id,
            "task": task,
            "completed": val,
            "project_info": project_info_tmp
        }
        let action = {
            'id': current_id,
            'tasks': tasks_tmp
        }
        axios.put(CURRENT_URL + current_id + '/', action)
            .then(response => {
                console.log('success for write ocmpleted');
                console.log(response)
            })
            .catch(err => {
                console.log('fail');
                console.log(err);
                // console.log(err.get_full_details())
                console.log(action);
                console.log(val);
            })
    }

    const saveValues = (interval) => {
        console.log('saveValues');
        let action = {
            'task_id': task_id,
            'inProgress': false,
            'timerTimer': interval,
            'timerStart': time[task_id].timerStart,
            'timerTime': time[task_id].timerTime
        }
        axios.put(TIME_URL + task_id + '/', action)
            .then((response) => {
                console.log('success for save values');
                console.log(response)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    console.log('in catch, error 404');
                    axios.post(TIME_URL, action)
                        .then(response => {
                            console.log('success in 404 reroute');
                            console.log(response)
                        })
                        .catch(err2 => {
                            console.log('error in 404 reroute');
                            console.log(err2)
                        })
                } else {
                    console.log('not a 404 error');
                    console.log(err)
                }
            })
    };

    const toggle = (e) => {
        console.log(e.target.value);
        if (e.target.value === '\u25B6') { // play
            let timerSpecs;
            if (time.hasOwnProperty(task_id)) {
                timerSpecs = time[task_id];
            } else {
                timerSpecs = {timerStart: 0, timerTime: 0};
            }
            const timer = setInterval(() => {
                dispatch(update({id: task_id, val: Date.now() - timerSpecs.timerStart}, 1000))
            });
            dispatch(start({
                id: task_id,
                timerTime: timerSpecs.timerTime,
                timerStart: Date.now() - timerSpecs.timerTime,
                inProgress: true,
                timerInterval: timer,
                completed: false
            }));
            writeCompleted(current_id, false);

        } else if (e.target.value === '\u0965') { //pause
            let interval = clearInterval(time[task_id].timerInterval);
            console.log(interval);
            saveValues(interval)
            dispatch(pause({id: task_id, inProgress: false, timerInterval: interval}));

        } else if (e.target.value === '\u25A0') { //stop
            console.log('in stop');
            let interval = clearInterval(time[task_id].timerInterval);
            saveValues(interval);
            dispatch(stop({id: task_id, inProgress: false, timerInterval: interval, completed: true}));
            writeCompleted(current_id, true);
        } else { // pressed tasked
            console.log('in else');
            dispatch(updateCompleted({id: task_id, completed: !done}))
            writeCompleted(current_id, !done);
        }
    }

    const formatNumber = (num) => {
        return (num < 10) ? `0${num}` : `${num}`;
    }

    const formatTime = (timeParam) => {
        if (timeParam.hasOwnProperty(task_id)) {
            const timeElapsed = timeParam[task_id].timerTime - timeParam[task_id].timerStart;
            let hoursString = formatNumber(Math.floor(timeElapsed / 3600000));
            let minString = formatNumber(Math.floor((timeElapsed / 60000) % 60));
            let secString = formatNumber(Math.floor((timeElapsed / 1000) % 60));
            return `${hoursString}:${minString}:${secString}`
        } else {
            return "00:00:00"
        }

    }

    const time_option = time.hasOwnProperty(props.task_object.id) && time[props.task_object.id]['inProgress'] ? '\u0965' : '\u25B6'; // pause/play
    const countdown_time = formatTime(time);
    return (
        <div className='foo'>
            <span className={`${done ? 'strikethrough' : ''}`}>
                <span className='task' style={{color: projectColor}} onClick={toggle}>{task}</span>
            </span>

            <span className='time_elapsed'>{countdown_time}</span>
            <Button variant='outline-secondary' value={time_option} onClick={toggle}>{time_option}</Button>
            <Button variant='outline-secondary' value={'\u25A0'} onClick={toggle}>{'\u25A0'}</Button>

        </div>
    )
}

export default Task;