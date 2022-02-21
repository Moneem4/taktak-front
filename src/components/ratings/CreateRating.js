import React, { useState, useRef, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReactStars from "react-rating-stars-component";
import "./createRating.css";

import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
    fontSize: 15,
  },
});

function CreateRating(props) {
  const { ratingType, evaluatedId,setShowModal } = props;
  const classes = useStyles();
  const { createRating, getRatingsByUserId, updateRating } = useContext(PostContext);
    const [loading, setLoading] = useState(false)
  const { activeUser, updateTaktakPoints } = useContext(UserContext);
  const [myRatings, setMyRatings] = useState([]);
  const commentInputRef = useRef(null);
  const [commentValue, setCommentValue] = useState("");
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    getRatingsByUserId(activeUser.userId, setMyRatings);
  }, [props]);
  const [myRating, setMyRating] = useState(null);
  useEffect(() => {
    let Ratingfound = myRatings.find((el) => el.evaluatedId === evaluatedId);
    Ratingfound && setMyRating(Ratingfound);
    Ratingfound && setValue(Ratingfound.rateValue);
    Ratingfound && setCommentValue(Ratingfound.comment);
    console.log(Ratingfound, "ratingfound");
  }, [myRatings]);

  function handleChange(e, emojiObject) {
    setCommentValue(e.target.value);

    console.log("dndn", commentValue);
  }

  function submit() {
    !myRating
      ? createRating(evaluatedId, ratingType, value, commentValue,setLoading,setShowModal).then(response => {
          updateTaktakPoints( activeUser.userId, activeUser.countPoints+5);
        })
      : updateRating(myRating._id, value, commentValue,setLoading,setShowModal);
  }

  const [adjective, setAdjective] = useState("");
  useEffect(() => {
    if (value === 1) {
      setAdjective("Très insatisfait");
    } else if (value === 2) {
      setAdjective("Insatisfait");
    } else if (value === 3) {
      setAdjective("Bon");
    } else if (value === 4) {
      setAdjective("Très Bon");
    } else if (value === 5) {
      setAdjective("Excellent");
    }
  }, [value]);
  const firstExample = {
    size: 30,
    value: value,
    edit: true,
    onChange: (newValue) => {
      setValue(newValue);
    },
  };
  console.log(myRating, "myRating");
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {!myRating ? (
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Donner votre évaluation
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Vous avez déja évaluer ce {ratingType}, Changer votre évaluation :
          </Typography>
        )}
        {<ReactStars {...firstExample} />}
        <Typography className={classes.pos} color="textSecondary">
          {adjective}
        </Typography>
        {
          <div className="rating-comment-input">
            <textarea
              placeholder="Commenter cette évaluation"
              className="rating-comment-input-field"
              type="text"
              value={commentValue}
              ref={commentInputRef}
              onChange={handleChange}
              // onKeyPress={onKeyUp}
              name="content"
            />
          </div>
        }
      </CardContent>
      <CardActions style={{ float: "right" }}>{
          loading ?    <div className="buttonEnregistrerRating" ><CircularProgress /></div>  : 
          <div className="buttonEnregistrerRating" onClick={submit}>
          <Button className="buttonEnregistrerRating" size="large">
            <span style={{ fontSize: 12 }}>Submit </span>
          </Button>
        </div>
      }
        
      </CardActions>
    </Card>
  );
}

CreateRating.propTypes = {};

export default CreateRating;
