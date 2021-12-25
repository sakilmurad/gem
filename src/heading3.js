import * as React from 'react';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
function getAnchor(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/[ ]/g, '-');
  }
  const H3 = ({ children }) => {
    const anchor = getAnchor(children);
    const link = `#${anchor}`;
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const copylink = (link) =>{
      // let link = e.target.dataset.link;
      const currentPageLink = `${window.location.origin}${window.location.pathname}`;
      navigator.clipboard.writeText(`${currentPageLink}${link}`);
      setOpen(true);
    }
    return (
      <>
      <h3 id={anchor}>
        <span>{children}</span>
        <Tooltip title={`Copy link to this section: ${children}`}>
      <IconButton onClick={() => copylink(link)} className="anchor-link">
        <InsertLinkIcon />
      </IconButton>
    </Tooltip>
      </h3>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={`Copied: ${children}`}
        onClose={handleClose}
      />
      </>
    );
  };
  export default H3;