import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { PostContext } from "../../../context/PostContext";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ReportIcon from '@material-ui/icons/Report';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from "../../util/UtilModal";

function PopupModal(props) {
	const { post, setPosts } = props;
	const { activeUser, updateTaktakPoints } = useContext(UserContext);
  const { deletePost } = useContext(PostContext);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  function removePost() {
    deletePost(post._id, setPosts);
  }
  
	return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-popover" >
              {(popupState) => (
                <div>
                  <div className="more-options">
                    <i
                      className="icon-dots-horizontal"
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
                    <Box style={{ height: "100%", width: 180 }}>
                        {post.userId === activeUser.userId ?
                          <div>
                            <Grid container direction="row">
                              <Grid item xs={3}> <PeopleAltIcon style={{fontSize: 20, margin: 5}}/></Grid>
                              <Grid item xs={8}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    marginTop: 5,
                                    marginButtom: 10,
                                    cursor: "pointer"
                                  }}
                                  onClick={() => openModal()}
                                >
                                  Modifier l'audience
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container direction="row">
                              <Grid item xs={3}> <DeleteForeverIcon style={{fontSize: 20, margin: 5}}/></Grid>
                              <Grid item xs={8}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    marginTop: 5,
                                    marginButtom: 10,
                                    cursor: "pointer"
                                  }}
                                  onClick={removePost}
                                >
                                  Supprimer
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                            :
                            <></>
                          }
                      {post.userId === activeUser.userId ?
                        <></>
                      :
                        <div>
                          <Grid container direction="row">
                            <Grid item xs={3}> <ReportIcon style={{fontSize: 20, margin: 5}}/></Grid>
                            <Grid item xs={8}>
                              <Typography
                                style={{
                                  fontSize: 14,
                                  marginTop: 5,
                                  marginButtom: 10,
                                }}
                                button    
                              >
                                Masquer
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid container direction="row">
                            <Grid item xs={3}> <RemoveCircleIcon style={{fontSize: 20, margin: 5}}/></Grid>
                            <Grid item xs={8}>
                              <Typography
                                style={{
                                  fontSize: 14,
                                  marginTop: 5,
                                  marginButtom: 10,
                                }}
                              >
                                Signaler
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                      }
                    </Box>
                  </Popover>
                </div>
              )}
      </PopupState>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        post={post}
        page={"accessPost"}
      />
    </div>
	);
}

export default PopupModal;
