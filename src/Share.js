import React from "react";
import Fab from "@mui/material/Fab";
import { RWebShare } from "react-web-share";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
const domain = "https://gpc.edafter.com";
function Share(props) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <RWebShare
        data={{
          text: props.text,
          title: props.title,
          url: `${domain}/${props.url}`,
        }}
      >
        <Fab variant="extended" color="primary">
          <ShareIcon sx={{ mr: 1 }} />
          Share
        </Fab>
      </RWebShare>
    </Box>
  );
}

export default Share;
