import React from 'react';

function Modal(props) {
    return (
        <div>
            <div className={`modal fade ${props.show !== 'exampleModal' ? 'd-none' : ''}`} id='exampleModal' tabIndex='-1'>
                <h1> THIS IS MODAL </h1>
            </div>
            <div className='modal fade' id='example2' tabIndex='-1'>
                <h2> THIS IS EMAPLE 2</h2>
            </div>
        </div>
    )
}

export default Modal;