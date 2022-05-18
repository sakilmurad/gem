import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import { RWebShare } from "react-web-share";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

const domain = "https://gpc.edafter.com";
const redColor = red[900];
const greyColor = grey[50];

function Share(props) {
  const [heartColor, setHeartColor] = useState(greyColor);
  const [tooltipText, setToolTipText] = useState("Save");

  useEffect(() => {
    if (localStorage.getItem("SavedPage")) {
      const SavedPages = JSON.parse(localStorage.getItem("SavedPage"));
      if (SavedPages.filter((data) => data.url === props.url).length > 0) {
        setHeartColor(redColor);
        setToolTipText("Saved");
      }
    }
  }, []);

  const savePost = () => {
    setHeartColor(heartColor == greyColor ? redColor : greyColor);
    let data = [];
    if (localStorage.getItem("SavedPage")) {
      data = JSON.parse(localStorage.getItem("SavedPage"));
    }
    if (heartColor == greyColor) {
      data.push({ title: props.title, url: props.url });
      localStorage.setItem("SavedPage", JSON.stringify(data));
      setToolTipText("Saved");
    } else {
      // var newData = removeByAttr(data, "url", props.url);
      var newData = data.filter((item) => item.url !== props.url);
      localStorage.setItem("SavedPage", JSON.stringify(newData));
      setToolTipText("Save");
    }
    // heartColor == greyColor ? setToolTipText("Saved") : setToolTipText("Save");
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 2 } }}>
      <Stack spacing={1} direction="row">
        <Tooltip title={tooltipText}>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => {
              savePost();
            }}
          >
            <FavoriteIcon sx={{ color: heartColor }} />
          </Fab>
        </Tooltip>
        <RWebShare
          data={{
            text: props.text,
            title: props.title,
            url: `${domain}/${props.url}`,
          }}
        >
          <Tooltip title="Share">
            <Fab variant="extended" color="primary">
              <ShareIcon />
            </Fab>
          </Tooltip>
        </RWebShare>
      </Stack>
    </Box>
  );
}

export default Share;
