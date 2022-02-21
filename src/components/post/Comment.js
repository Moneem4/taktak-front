import React, { useContext, useEffect } from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Grid from "@material-ui/core/Grid";

function Comment(props) {
  const {comment} = props;
  const { activeUser } = useContext(UserContext);
  const { deleteComment, updateComment } = useContext(PostContext);
  const id = props.comment._id;
  const content = props.comment.content;

  function deleteC() {
    deleteComment(
      id,
      props.setComments,
      props.comments,
      props.setCommentsCount
    );
    handleClose();
  }
  function updateComments() {
    updateComment(id, content, comment);
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {}, [props.comment]);
  
  return (
    <div className="who-comment">
      <div className="who-comment-info">
        <Grid container direction="row">
          <Grid item xs={11}>
            {comment.user.avatar &&
              comment.isRestaurant ? (
              <img
                img
                src={`https://${props.comment.user.avatar}`}
                style={{ borderRadius: "20%" }}
              />
            ) : (
              <img
                img
                src={`https://${comment.user.avatar}`}
                style={{ borderRadius: "50%" }}
              />
            )}
            <span className="who-comment-info-username">
              {!comment.isRestaurant
                ? comment.user.firstName + " " + comment.user.lastName
                : comment.user.name}
            </span>
            <span
              style={{
                marginLeft: "15px",
                fonWeight: "italic",
                fontSize: "1.2rem",
                color: "grey",
              }}
            >
              {moment(comment.createdAt).fromNow()}
              <br />
            </span>
          </Grid>
          <Grid item xs={1}>
            {activeUser && activeUser.userId === comment.handlerId && (
              <div className="user-who-post-options">
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <div className="more-options">
                        <i
                          className="icon-dots-horizontal"
                          style={{ fontSize: "3px",float: 'right' }}
                          {...bindTrigger(popupState)}
                        />
                      </div>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box style={{ height: 60, width: 120 }}>
                          <Grid container direction="row">
                            <Grid item xs={3}></Grid>

                            <Grid item xs={8}>
                              <Typography
                                style={{
                                  fontSize: 14,
                                  marginTop: 5,
                                  marginButtom: 10,
                                }}
                                button
                              >
                                Modifier
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: 14,
                                  marginTop: 5,
                                  marginButtom: 10,
                                }}
                                onClick={() => handleClickOpen()}
                              >
                                Supprimer
                              </Typography>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <Typography variant="h5">
                                  Supprimer le commentaire
                                </Typography>
                                <DialogContent>
                                  <Typography>
                                    Souhaitez-vous vraiment supprimer ce commentaire
                                    ?
                                  </Typography>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} color="primary">
                                    Annuler
                                  </Button>
                                  <Button
                                    onClick={deleteC}
                                    color="primary"
                                    autoFocus
                                  >
                                    Supprimer
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </Grid>
                          </Grid>
                        </Box>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </div>
            )}
          </Grid>
        </Grid>
        <span style={{ fontSize: "1.4rem" }}>{comment.content}</span>
      </div>
    </div>
  );
}
Comment.propTypes = {};

export default Comment;
