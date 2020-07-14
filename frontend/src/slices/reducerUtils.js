export function updateCompletedAttribute(state, action) {
    console.log('in utils');
    let tmp = [...state.data];
    let idx = state.data.findIndex(el => el.id === action.payload.id);
    tmp[idx] = {...tmp[idx], completed: action.payload.completed}
    state.data = tmp;
}

export function haltTimer(state, action) {
    let d = {}
    let t = {...state.time[action.payload.id]}
    t['inProgress'] = action.payload.inProgress;
    t['timerInterval'] = action.payload.timerInterval;
    d[action.payload.id] = t;
    state.time = {...state.time, ...d};
}