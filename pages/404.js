import React from 'react'
import Head from 'next/head'
import Link from "next/link"
import ErrorIcon from '@mui/icons-material/Error';
import  Grid  from '@mui/material/Grid';
function custom404() {
    return (
        <div>
            <Head>
                <meta name="robots" content="noindex" />
                <title>404 - Nothing Found</title>
                <meta name="description" content='Nothing found here' />
            </Head>
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <ErrorIcon color='error' sx={{fontSize: "80px"}} />
            </Grid>
            <h2 className='center'>Page Not Found</h2>
            <Link href="/">Home</Link>
        </div>
    )
}

export default custom404
