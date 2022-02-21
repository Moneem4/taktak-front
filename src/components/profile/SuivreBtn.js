import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import './updateProfile/updateProfile.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  
});

function SuivreBtn(props) {
  const { classes, isntme, isFollowing } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
      if(anchorEl) {
        setAnchorEl(null);
      } else {
        setAnchorEl(event.currentTarget);
      }
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="suivre-btn" style={{ display: isntme ? "block" : "none" }}>
        <div style={{ display: isFollowing ? "none" : "block" }}>
            <Button className="suivre-button" variant="contained">
                <PersonAddIcon style={{fontSize: 19, color: "#ffffff"}} /> &emsp;
                <span>Follow</span>
            </Button>
        </div>
        <div style={{ display: isFollowing ? "block" : "none" }} >
            <Button className="suivre-button" variant="contained" onClick={handleClick}>
                <MoreHorizIcon style={{fontSize: 20, color: "#ffffff"}} />
            </Button>
        </div>
        <div
            className="unfollow-pane"
            data-dropdown
            data-auto-focus="true"
            style={{ display: anchorEl ? "block" : "none" }}
        >
            <ul className="unfollow-pane-items">
                <li>
                    <div className="filter-content">
                        <span className="content-title" onClick={handleClose}>Unfollow</span>
                        <span className="content-title" onClick={handleClose}>Report</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default withStyles(styles)(SuivreBtn);
