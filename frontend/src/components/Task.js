import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {selectInProgress, selectTime, selectCompleted, start, pause, stop, update, loadTime} from "../slices/todoSlice";
import {TASK_URL, TIME_URL} from "../constants";
import {Button} from "react-bootstrap";
import todos from '../styles/Task.css'

export function Task(props) {
    const time = useSelector(selectTime);
    const dispatch = useDispatch();

    const task_id = props.task_object.id;
    const task = props.task_object.task;
    const done = props.task_object.completed;
    const projectName = props.task_object.projectName;
    const projectColor = props.task_object.projectColor;

    const writeCompleted = (task_id, val) => {
        console.log('write completed');
        let action = {
            'task': task,
            'completed': val,
            'projectName': projectName,
            'projectColor': projectColor
        };
        console.log(action);
        axios.put(TASK_URL + task_id + '/', action)
            .then(response => {
                console.log('success for write ocmpleted');
                console.log(response)
            })
            .catch(err => {
                console.log('fail');
                console.log(err);
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
        if (time.hasOwnProperty(task_id)) {
            axios.put(TIME_URL + task_id + '/', action)
                .then((response) => {
                    console.log('success for save values');
                    console.log(response)
                })
                .catch((err) => console.log(err))

        } else {
            axios.post(TIME_URL + task_id + '/', action)
                .then(response => console.log(response))
                .catch(err => console.log(err))
        }
    };

    const toggle = (e) => {
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
                ttimer: timer
            }));
            writeCompleted(task_id, false);

        } else if (e.target.value === '\u0965') { //pause
            let interval = clearInterval(time[task_id].ttimer);
            //save time progress to db; write to db first so can ensure post/put correctness
            saveValues(interval)
            dispatch(pause({id: task_id, inProgress: false, ttimer: interval}));

        } else { //stop
            let interval = clearInterval(time[task_id].ttimer);
            saveValues(interval);
            dispatch(stop({id: task_id, inProgress: false, ttimer: interval}));
            writeCompleted(task_id, true);
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
                <span className='task' onClick={toggle}>{task}</span>
            </span>

            <span className='time_elapsed'>{countdown_time}</span>
            <Button variant='outline-secondary' value={time_option} onClick={toggle}>{time_option}</Button>
            <Button variant='outline-secondary' value='stop' onClick={toggle}>{'\u25A0'}</Button>

        </div>
    )
}

export default Task;