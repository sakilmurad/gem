import React from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import  ListItem  from '@mui/material/ListItem';

function Sidebar(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
      {props.data.map((post, index) => (
         <ListItem
         key={index}
         selected={selectedIndex === index}
         onClick={(event) => handleListItemClick(event, index)}
       >
         <Link href={post.slug} >
         {post.title} 
       </Link>
       </ListItem>
      ))}
      </List>
    </Box>
  
  )
}

export default Sidebar
