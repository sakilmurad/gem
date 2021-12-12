import React from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import  ListItem  from '@mui/material/ListItem';
import { useRouter } from "next/router";

function Sidebar(props) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    if(props.handleDrawerToggle){
      props.handleDrawerToggle();
    }
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ul className="sidebar-link">
      {props.data.map((post, index) => (
         <li onClick={(event) => handleListItemClick(event, index)} className={router.asPath == `/${post.slug}` ? "active" : ""}>
         <Link href={post.slug} >
         {post.title} 
       </Link>
     </li>
      ))}
      </ul>
    </Box>
  
  )
}

export default Sidebar
