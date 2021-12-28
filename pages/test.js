import React from 'react'

function Test() {
    const data = process.env.NEXT_PUBLIC_TEST
    return (
        <div>
            {data}
        </div>
    )
}

export default Test
