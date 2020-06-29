import React, {useState} from 'react';
import calendar from '../images/calendar.png';
import moment from 'moment';
import {Counter} from '../features/counter/Counter';
import '../styles/Home.css';

function Home() {
    console.log(moment().format('MMMM D, YYYY'));
    const [calendarAppear, setCalendarAppear] = useState(false);
    const clicked = () => {
        setCalendarAppear(true);
    };
    return (
        <div className="container-fluid d-flex flex-column align-items-center">
                            {/*<img className='d-flex justify-content-end align-items-end' src={calendar} alt='calendar-icon' />*/}

            <div className='header container-fluid d-flex flex-row justify-content-between align-items-start'>
                <div className='filler'></div>
                <h1 className="row"> {moment().format('MMMM D, YYYY')} </h1>
                {/*<input type='image' src={calendar} className='row'/>*/}
                <button type ='button' className='row calendar-button btn btn-link' onClick={clicked}><img src={calendar} alt='calendar-icon' /></button>
            </div>
            <div className="container-fluid d-flex flex-row justify-content-between">
                <div className="post_it_container justify-content-end">
                    <div className='post_it'>POST IT</div>
                    <p> + New Note </p>
                </div>
                <div className="chart "> THIS IS CHART</div>
            </div>
        </div>
    );
}

export default Home;
