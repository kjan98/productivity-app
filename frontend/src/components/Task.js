import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {selectInProgress, selectTime, selectCompleted, start, pause, stop, update, loadTime} from "../slices/todoSlice";
import {TASK_URL, TIME_URL} from "../constants";
import todos from '../styles/Task.css'

export function Task(props) {
    const time = useSelector(selectTime);
    const dispatch = useDispatch();

    const task_id = props.task_object.id;
    const task = props.task_object.task;
    const done = props.task_object.completed;
    const project = props.task_object.project;

    const writeCompleted = (task_id, val) => {
        console.log('write completed');
        axios.put(TASK_URL + task_id + '/', {
            'task': task,
            'completed': val,
            'project': project
        })
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
            axios.put(TIME_URL + task_id + '/', action )
                .then((response) => {console.log('success for save values');console.log(response)})
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
            dispatch(pause({id: task_id, inProgress: false, ttimer: interval}));
            //save time progress to db
            saveValues(interval)

        } else { //stop
            let interval = clearInterval(time[task_id].ttimer);
            dispatch(stop({id: task_id, inProgress: false, ttimer: interval}));
            saveValues(interval);
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
            <button className='button' value={time_option} onClick={toggle}>{time_option}</button>
            <button className='button' value='stop' onClick={toggle}>{'\u25A0'}</button>

        </div>
    )
}

export default Task;