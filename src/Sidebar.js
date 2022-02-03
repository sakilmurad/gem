import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Fuse from "fuse.js";

const postData = require("./data.json");

const Search = styled("div")(({ theme }) => ({
  margin: "8px 3px",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "97%",
  border: "1px solid rgb(211, 212, 212)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function Sidebar(props) {
  const router = useRouter();
  const [menuData, setMenuData] = useState(postData);
  const handleListItemClick = (event, index) => {
    if (props.handleDrawerToggle) {
      props.handleDrawerToggle();
    }
  };

  const [searchparam, setSearchparam] = useState("invoice");
  const handleChange = (e) => {
    let value = e.target.value;
    if (value == "") {
      setMenuData(props.data);
      return;
    }
    setSearchparam(value);
    setMenuData(fuse.search(searchparam));
  };

  useEffect(() => {
    setMenuData(props.data);
  }, []);

  const options = {
    keys: ["title", "slug"],
  };
  const fuse = new Fuse(postData, options);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
      </Search>
      <ul className="sidebar-link">
        {menuData.map((post, index) => (
          <li
            key={index}
            onClick={(event) => handleListItemClick(event, index)}
            className={router.asPath == `/${post.slug}` ? "active" : ""}
          >
            <Link
              href={
                post.slug == undefined
                  ? `/${post.item.slug}`
                  : `${post.slug == "/" ? "" : "/"}${post.slug}`
              }
              className="sidebar-anchor"
            >
              {post.title == undefined ? post.item.title : post.title}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default Sidebar;
