import React from 'react';
import Box from '@mui/material/Box'
import Image from "next/image"
function img(props) {
    return (
        <Box style={{
            position: "relative",
            maxHeight: "200px",
            maxWidth: "200px",
          }}>
            <Image
                src={props.src}
                alt={props.alt}
                layout='fill'
                style={{ width: "100%", height: "100%" }}
            />
        </Box>
    );
}

export default img;
