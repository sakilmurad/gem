import React from 'react'

function Test() {
    const data = process.env.TEST
    return (
        <div>
            {data}
        </div>
    )
}

export default Test
