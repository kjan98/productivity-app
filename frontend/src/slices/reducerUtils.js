export function updateCompletedAttribute(state, action) {
    console.log('in update completed');
    let tmp = [...state.current_data];
    let idx = state.current_data.findIndex(el => el.tasks.id === action.payload.id);
    let tmp_completed = {...tmp[idx]};
    // let task_tmp = {...tmp_completed.tasks}

    tmp_completed.tasks['completed'] = action.payload.completed;
    // tmp[idx] = {...tmp[idx], completed: action.payload.completed}
    tmp[idx] = {...tmp_completed}

    state.current_data = tmp;
}

export function haltTimer(state, action) {
    let d = {}
    let t = {...state.time[action.payload.id]}
    t['inProgress'] = action.payload.inProgress;
    t['timerInterval'] = action.payload.timerInterval;
    d[action.payload.id] = t;
    state.time = {...state.time, ...d};
}