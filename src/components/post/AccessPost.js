import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import PublicIcon from '@material-ui/icons/Public';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  title: {
    fontSize: 18,
  },
  appBar: {
    borderBottom: "0.1px groove #CAD0D4",
    height: 50
  },
});

function AccessPost(props) {
  const classes = useStyles();
  const { setShowModal, post } = props;
  const { updateAccessPost } = useContext(UserContext);
  const [audiance, setAudiance] = useState([
    {icon:<PublicIcon style={{fontSize: 40}}/>, access:"Pulic", value:"PUBLIC"},
    {icon:<PeopleAltIcon style={{fontSize: 40}}/>, access:"Amis", value:"FRIENDS"},
    {icon:<LockIcon style={{fontSize: 40}}/>, access:"Moi Uniquement", value:"PRIVATE"},
  ]);

  const handleClose = () => {
    setShowModal(!props.showModal);
  };

  const [selectedValue, setSelectedValue] = useState();
  useEffect(() => {
    setSelectedValue(post.accessType);
  }, [props]);
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    updateAccessPost(post._id, event.target.value)
    handleClose()
  };

  function changeProfile(el) {
    updateAccessPost(post._id, selectedValue)
    handleClose()
  };

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container direction="row" className={classes.appBar}>
        <Grid item xs={9} style={{marginTop: "3%", marginLeft: "5%"}}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sélectionner l'audiance
          </Typography>
        </Grid>
        <Grid item xs={1} style={{marginTop: "1%"}}>
          <Tooltip title="Close" arrow>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => handleClose()}
            >
              <CloseIcon style={{fontSize: 20, color: "#ff6900"}}/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <CardContent>
        {audiance.map((item) => (
          <Grid container direction="row" key={item}>
            <Grid item xs={2}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => handleClose()}
              >
                {item.icon}
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Typography
                className={classes.title}
                style={{marginTop: "8%"}}
                color="textSecondary"
                gutterBottom
              >
                {item.access}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Radio
                checked={selectedValue === item.value}
                onChange={handleChange}
                value={item.value}
                style={{fontSize: "30 !important", marginTop: "80%"}}
              />
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
}

export default AccessPost;
