import React from 'react'

function Test() {
    const data = process.env.TEST
    const newData = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
    return (
        <div>
            {data}
        {newData}
        </div>
    )
}

export default Test
