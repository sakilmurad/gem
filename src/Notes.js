import React from 'react'

function Notes(props) {
    return (
        <div className='notes'>
            <p className="title">{props.title}</p>
            <p className='content'>{props.content}</p>
        </div>
    )
}

export default Notes
