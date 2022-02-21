import React, { useState, useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Card, Collapse, List } from "@material-ui/core";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { UserContext } from "../../context/UserContext";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import "./createpost.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Multiselect from "./createPost/Multiselect";
import SettingsIcon from '@material-ui/icons/Settings';
import PublicIcon from '@material-ui/icons/Public';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Modal from "../util/UtilModal";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const styles = (theme) => ({
  textField: {
    color: "#484848",
    height: "5ch",
    backgroundColor: "white",
    fontSize: "2rem",
    textAlign: "start",
    border: "0.1px groove darkgrey",
    borderRadius: "3px",
    paddingLeft: 12,
  },
});

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  const text = files.length > 0 ? "Add more files" : "Choose files";

  return (
    <div className="buttondiv">
      <label
        className="btnAddFiles"
        style={{
          cursor: "pointer",
          marginTop: 30,
          width: "13rem",
          height: "7rem",
          background: "#ff6900",
          fontWeight: "bold",
          fontSize: "1.6rem",
          color: "#484848",
          borderRadius: "5px",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {text}
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    </div>
  );
};

const CustomInput = ({ setUpload }) => {
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        setUpload(chosenFiles);
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  function handleChangeStatus({ meta, file }, status) {
    console.log(status, meta, file);
  }

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      // accept="image/* video/*"
      InputComponent={Input}
      // maxSizeBytes={26,214,400}
      canRemove={true}
      getFilesFromEvent={getFilesFromEvent}
    />
  );
};

function CreatePost(props) {
  const {classes} = props;
  const [loading, setLoading] = useState(false);
  const [typeOfPoste, setTypeOfPost] = useState("1");
  const {
    activeUser,
    createPost,
    restaurants,
    getUsers,
    createPostImage,
    createPostText,
    createPostPromoFlash,
    createPostQuestion,
    users,
    getRestaurants,
    updateTaktakPoints
  } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [autocomplete, setAuto] = useState(null);
  const [options, setOptions] = useState([]);
  const [postForm, setPostForm] = useState({
    content: "",
    taggedRestaurant: "",
    postType: "",
    title: "",
    media: "",
    articlesId: [],
    articles: [],
    accessType: "PUBLIC",
    taggedUser: [],
    duration: "",
    promoValue: 0,
    dateFrom: new Date(),
    dateTo: new Date()
  });
  const [postAskQuestion, setPostAskQuestion] = useState({
    title: "",
    content: "",
  });

  const handleOpen = () => {
    setOpen(!open);
    getRestaurants();
    restaurants && setOptions(restaurants);
    getUsers();
    users && setOptions(users);
  };

  useEffect(() => {
    getRestaurants();
    restaurants && setOptions(restaurants);
    getUsers();
    users && setOptions(users);
  }, []);

  function handleChange(e) {
    setPostForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleDateFromChange = (date, e) => {
    const dateValue = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    setPostForm({ ...postForm, dateFrom: date, dateTo: date });
  };

  const handleDateToChange = (date) => {
    const dateValue = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    setPostForm({ ...postForm, dateTo: date });
  };

  function handlePostQuestionChange(e) {
    setPostAskQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleAutocomplete = (event, newValue) => {
    if (newValue != null) {
      const p = newValue.map((option) => option._id);
      setAuto(newValue);
      // const tab=postForm.taggedUser.push(newValue[1]._id);
      // setPostForm((prev) => ({ ...prev, taggedRestaurant: newValue._id }));
      setPostForm((prev) => ({ ...prev, taggedUser: p }));
    }
  };

  const handleAutocompleteRestaurant = (event, newValue) => {
    if (newValue != null) {
      setAuto(newValue);
      setPostForm((prev) => ({ ...prev, taggedRestaurant: newValue._id }));
    }
  };

  const [upload, setUpload] = useState([]);
  const handleSubmit = (files, allFiles) => {
    // console.log(  files.map((f) => f.meta));
    // allFiles.forEach((f) => f.remove());
    // console.log("upload",files)
    setUpload(allFiles);
  };

  const handleChangeDropZone = (allFiles) => {
    setUpload(allFiles.nativeEvent.target.files);
    return true;
  };

  function handleClick(e) {
    setTypeOfPost(e.target.name);
    setOpen(!open);
  }

  function createComplete() {
    setLoading(false);
    setOpen(!open);
  }

  function submitPost() {
    setLoading(true);
    let postType = {
      content: "",
      taggedRestaurant: "",
      postType: "",
      accessType: "",
      title: "",
      taggedUser: [],
    };
    
    postType = postForm;

    if (upload.length === 0) {
      postType.postType = "TEXT";
      postType.media = "";
      
      createPostText(
        postType,
        activeUser
      ).then((data) => {
        setLoading(false);
        updateTaktakPoints( activeUser.userId, activeUser.countPoints+1);
      });
    }

    const objectFile = upload.map((type) => type.fileObject);
    if (upload.length === 1) {
      const typeImage = upload.map((type) => type.type);
      if (typeImage.indexOf("jpg")) {
        postType.postType = "ALBUM";
        postType.media = objectFile;
        createPostImage(
          postType.taggedRestaurant,
          postType.title,
          postType.content,
          postType.postType,
          postType.taggedUser,
          postType.accessType,
          postType.media,
          activeUser
        ).then((data) => {
          setLoading(false);
          updateTaktakPoints( activeUser.userId, activeUser.countPoints+1);
        });
      } else {
        postType.media = objectFile;
        postType.postType = "ALBUM";
        createPostImage(
          postType.taggedRestaurant,
          postType.title,
          postType.content,
          postType.postType,
          postType.taggedUser,
          postType.accessType,
          postType.media,
          activeUser
        ).then((data) => {
          setLoading(false);
          updateTaktakPoints( activeUser.userId, activeUser.countPoints+1);
        });
      }
    }

    if (upload.length > 1) {
      const typeImage = upload.map((type) => type.type);
      if (objectFile.indexOf("jpg")) {
        postType.media = objectFile;
        postType.postType = "ALBUM";
        createPost(
          postType.taggedRestaurant,
          postType.title,
          postType.content,
          postType.postType,
          postType.taggedUser,
          postType.media,
          postType.accessType,
          activeUser
        ).then((data) => {
          createComplete();
          updateTaktakPoints( activeUser.userId, activeUser.countPoints+1);
        });
      }
    }

    setPostForm({
      content: "",
      taggedRestaurant: "",
      postType: "",
      title: "",
      media: "",
      taggedUser: [],
      duration: ""
    });
    setUpload([]);
    setOpen(false);
    props.setFeedLoader(true);
  }

  function submitPostPromoFlash(type) {
    setLoading(true);
    createPostPromoFlash(
      postForm,
      type,
      activeUser
    ).then((data) => {
      setLoading(false);
      updateTaktakPoints( activeUser.userId, activeUser.countPoints+1);
    });

    setPostForm({
      content: "",
      postType: "",
      title: "",
      media: "",
      articles: [],
      articlesId: [],
      duration: "",
    });
    setOpen(false);
    props.setFeedLoader(true);
  }

  function submitPostQuestion() {
    setLoading(true);

    createPostQuestion(postAskQuestion, postForm.accessType, activeUser).then((data) => {
        setLoading(false);
        updateTaktakPoints( activeUser.userId, activeUser.countPoints+1);
      });

    setPostAskQuestion({
      title: "",
      content: "",
      postType: ""
    });
    
    setOpen(false);
    props.setFeedLoader(true);
  }

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [userFocused, setUserFocused] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log("ss", status, meta);
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const [showModalArticles, setShowModalArticles] = useState(false);
  const [typePost, setTypePost] = useState();
  const openModalArticles = (type) => {
    setTypePost(type);
    setShowModalArticles(true);
  };

  function removeItem(index) {
    setPostForm((prevPostForm) => {
      let items = prevPostForm;
      let listArticles = [...items.articles];
      let listArticlesId = [...items.articlesId];
      listArticles.splice(index, 1);
      listArticlesId.splice(index, 1);
      const updatedForm = {
        ...prevPostForm,
        articles: listArticles,
        articlesId: listArticlesId
      };
      return updatedForm;
    });
  }

  let input;
  if (typeOfPoste === "1") {
    input = (
      <div className="tabs-content" data-tabs-content="feed-tabs">
        <div className="tabs-panel is-active" id="panel1">
          <div className="tab-one collapsed">
            <div>
              <div button 
                //onClick={handleOpen} 
                className="tab-one-header">
                <input
                  type="text"
                  name="content"
                  placeholder="Dites quelques choses !"
                  className="input-post"
                  className="tab-one-header"
                  id="content"
                  value={postForm.content}
                  onChange={handleChange}
                />

                <i className="icon-camera" />
              </div>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Card style={{ padding: 10 }} className="tab-one-body">
                  <div id="dropzone">
                    <CustomInput
                      setUpload={(files) => setUpload([...upload, ...files])}
                    />
                  </div>
                  <div className="tab-one-bottom" style={{marginTop: -15}} onClick={() => openModal()}>
                    <div className="location-icon">
                      {postForm.accessType === "PUBLIC" ?
                        <PublicIcon fontSize="large" style={{ color: "#ff6900" }} />
                      : postForm.accessType === "FRIENDS" ?
                        <PeopleAltIcon fontSize="large" style={{ color: "#ff6900" }} /> 
                      :
                        <LockIcon fontSize="large" style={{ color: "#ff6900" }} />
                      }
                    </div>
                  </div>
                  <div className="tab-one-bottom" style={{marginTop: 15}}>
                      {users && (<Multiselect options={users} selectedOptions={postForm.taggedUser} handleMultiselect={(e,n) => handleAutocomplete(e,n)}labelText="identifier des amis"/>)}
                    
                      {restaurants && (
                        <Multiselect options={restaurants} selectedOptions={postForm} handleMultiselect={(e,n) => handleAutocompleteRestaurant(e,n)} labelText="identifier Restaurant"/>
                        
                      )}

                    {loading === false ? (
                      <button
                        disabled={!postForm.content && !postForm.title}
                        className="upload-now"
                        onClick={() => {
                          submitPost();
                        }}
                        className="upload-now"
                        style={{alignSelf:'flex-start'}}
                      >
                        Postez
                      </button>
                    ) : (
                      <CircularProgress
                        size={100}
                        thickness={1.6}
                        style={{ color: "#ff6900" }}
                      ></CircularProgress>
                    )}
                  </div>

                  {/* <div className="tab-one-bottom">
                    <div className="location-icon">
                      <i className="fal fa-location" />
                    </div>
                  </div> */}

                  <div></div>
                </Card>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (typeOfPoste === "2") {
    input = (
      <div className="tabs-content" data-tabs-content="feed-tabs">
        <div id="panel2">
          <div className="tab-one collapsed">
            <div className="tab-one-header">
              <input
                button
                //onClick={handleOpen}
                type="text"
                placeholder="Titre"
                id="title"
                name="title"
                value={postForm.title}
                onChange={handleChange}
              />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Card style={{ padding: 10 }} className="tab-one-body">
                <div className="tab-one-body">
                  <input
                    className="description"
                    type="text"
                    placeholder="Description"
                    id="content"
                    name="content"
                    value={postForm.content}
                    onChange={handleChange}
                  />
                  <div style={{border: "1px solid #e1e4e8", marginBottom: 10}}>
                    <div className="list-of-articles">
                      {postForm.articles.length>0 ? 
                        <div className="card-ingredients" style={{marginLeft: "42%"}}>
                          <div className="card-ingredients-header">
                            <img
                              className="avatar"
                              src={`https://${postForm.articles[0].image}`}
                              style={{ marginTop: 5 }}
                            />
                          </div>
                          <div className="card-ingredients-body">
                            <span className="username">
                              {postForm.articles[0].name}
                            </span>
                          </div>
                          <div className="card-ingredients-footer">
                            <Grid
                              container
                              direction="row"
                              style={{ marginTop: -93 }}
                            >
                              <Grid item xs={8}></Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  edge="end"
                                  color="inherit"
                                  onClick={() => removeItem(0)}
                                >
                                  <DeleteIcon style={{ fontSize: 18, color: "#ff6900" }} />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      :
                        <></>
                      }
                    </div>
                    <div className="buttondiv" style={{marginBottom: 10}} onClick={() => openModalArticles("venteFlash")}>
                      <label
                        className="btnAddFiles"
                        style={{
                          cursor: "pointer",
                          width: "13rem",
                          height: "7rem",
                          background: "#ff6900",
                          fontWeight: "bold",
                          fontSize: "1.6rem",
                          color: "#484848",
                          borderRadius: "5px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        Add Article
                      </label>
                    </div>
                  </div>
                  <div className="tab-one-bottom" style={{ marginTop: "-1%", marginBottom: "1%"}}>
                    <div className="location-icon" onClick={() => openModal()}>
                      {postForm.accessType === "PUBLIC" ?
                        <PublicIcon fontSize="large" style={{ color: "#ff6900" }} />
                      : postForm.accessType === "FRIENDS" ?
                        <PeopleAltIcon fontSize="large" style={{ color: "#ff6900" }} /> 
                      :
                        <LockIcon fontSize="large" style={{ color: "#ff6900" }} />
                      }
                    </div>
                  </div>
                  <div className="tab-one-footer">
                    <div className="duration">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3} style={{width: "100%"}}>
                          <TimePicker
                            ampm={false}
                            openTo="hours"
                            views={['hours', 'minutes', 'seconds']}
                            inputFormat="HH:mm:ss"
                            mask="__:__:__"
                            //value={value}
                            value={postForm.duration}
                            onChange={(newValue) => {
                              //setValue(newValue);
                              setPostForm((prev) => ({ ...prev, duration: newValue }));
                            }}
                            style={{fontSize: "20 !important"}}
                            renderInput={(params) => <TextField {...params}/>}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                    <div className="duration">
                      <TextField
                        id="standard-number"
                        name="promoValue"
                        label="Promo Value"
                        type="number"
                        value={postForm.promoValue}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                          style: { fontSize: 13}
                        }}
                        variant="standard"
                        style={{width: "100%"}}
                        InputProps={{style: { fontSize: 12}}}
                      />
                    </div>
                    {loading === false ? (
                      <button
                        disabled={!postForm.content && !postForm.title}
                        className="upload"
                        onClick={() => {
                          submitPostPromoFlash("VENTE_FLASH");
                        }}
                        style={{alignSelf:'flex-start'}}
                      >
                        Postez maintenant
                      </button>
                    ) : (
                      <CircularProgress
                        size={50}
                        thickness={1.6}
                        style={{ color: "#ff6900" }}
                      ></CircularProgress>
                    )}
                  </div>
                </div>
              </Card>
            </Collapse>
          </div>
        </div>
      </div>
    );
  } else if (typeOfPoste === "3") {
    input = (
      <div className="tabs-content" data-tabs-content="feed-tabs">
        <div id="panel3">
          <div className="tab-one collapsed">
            <div className="tab-one-header">
              <input
                button
                //onClick={handleOpen}
                type="text"
                placeholder="Titre"
                id="title"
                name="title"
                value={postForm.title}
                onChange={handleChange}
              />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Card style={{ padding: 10 }} className="tab-one-body">
                <div className="tab-one-body">
                  <input
                    className="description"
                    type="text"
                    placeholder="Description"
                    id="content"
                    name="content"
                    value={postForm.content}
                    onChange={handleChange}
                  />
                  <div style={{border: "1px solid #e1e4e8", marginBottom: 10}}>
                    <div className="list-of-articles">
                      {postForm.articles.length>0 ? 
                        postForm.articles.map((article, index) => (
                          <div className="card-ingredients" key={index}>
                            <div className="card-ingredients-header">
                              <img
                                className="avatar"
                                src={`https://${article.image}`}
                                style={{ marginTop: 5 }}
                              />
                            </div>
                            <div className="card-ingredients-body">
                              <span className="username">
                                {article.name}
                              </span>
                            </div>
                            <div className="card-ingredients-footer">
                              <Grid
                                container
                                direction="row"
                                style={{ marginTop: -93 }}
                              >
                                <Grid item xs={8}></Grid>
                                <Grid item xs={1}>
                                  <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={() => removeItem(index)}
                                  >
                                    <DeleteIcon style={{ fontSize: 18, color: "#ff6900" }} />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        ))
                      :
                        <></>
                      }
                    </div>
                    <div className="buttondiv" style={{marginBottom: 10}} onClick={() => openModalArticles("promos")}>
                      <label
                        className="btnAddFiles"
                        style={{
                          cursor: "pointer",
                          width: "13rem",
                          height: "7rem",
                          background: "#ff6900",
                          fontWeight: "bold",
                          fontSize: "1.6rem",
                          color: "#484848",
                          borderRadius: "5px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        Add Article
                      </label>
                    </div>
                  </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <Grid item xs={1} style={{ margin: 'auto' }}>
                        <h4 >From</h4>
                      </Grid>
                      <Grid item xs={5}>
                        <KeyboardDatePicker
                          format="MM/dd/yyyy"
                          value={postForm.dateFrom}
                          name= "dateFrom"
                          onChange={handleDateFromChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputProps={{
                            className: classes.textField,
                          }}
                        />
                      </Grid>
                      <Grid item xs={1} style={{ margin: 'auto' }}>
                        <h4>To</h4>
                      </Grid>
                      <Grid item xs={5}>
                        <KeyboardDatePicker
                          format="MM/dd/yyyy"
                          value={postForm.dateTo}
                          name= "dateTo"
                          onChange={handleDateToChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputProps={{
                            className: classes.textField,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <div className="duration" style={{marginTop: 15}}>
                    <TextField
                      id="standard-number"
                      name="promoValue"
                      label="Promo Value"
                      type="number"
                      value={postForm.promoValue}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: 13, color: "#000"}
                      }}
                      style={{width: "30%"}}
                      InputProps={{style: { fontSize: 12}}}
                    />
                  </div>
                  <div className="tab-one-bottom" style={{ marginTop: "1%", marginBottom: "1%"}} onClick={() => openModal()}>
                    <div className="location-icon">
                      {postForm.accessType === "PUBLIC" ?
                        <PublicIcon fontSize="large" style={{ color: "#ff6900" }} />
                      : postForm.accessType === "FRIENDS" ?
                        <PeopleAltIcon fontSize="large" style={{ color: "#ff6900" }} /> 
                      :
                        <LockIcon fontSize="large" style={{ color: "#ff6900" }} />
                      }
                    </div>
                  </div>
                  {loading === false ? (
                    <button
                      disabled={!postForm.content && !postForm.title}
                      className="upload-promo"
                      onClick={() => {
                        submitPostPromoFlash("PROMO");
                      }}
                      style={{alignSelf:'flex-start'}}
                    >
                      Postez maintenant
                    </button>
                  ) : (
                    <CircularProgress
                      size={100}
                      thickness={1.6}
                      style={{ color: "#ff6900" }}
                    ></CircularProgress>
                  )}
                </div>
              </Card>
            </Collapse>
          </div>
        </div>
      </div>
    );
  } else if (typeOfPoste === "4") {
    input = (
      <div className="tabs-content" data-tabs-content="feed-tabs">
        <div id="panel3">
          <div className="tab-one collapsed">
            <div className="tab-one-header">
              <input
                button
                //onClick={handleOpen}
                type="text"
                placeholder="Titre"
                id="title"
                name="title"
                value={postAskQuestion.title}
                onChange={handlePostQuestionChange}
              />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Card style={{ padding: 10 }} className="tab-one-body">
                <div className="tab-one-body">
                  <input
                    className="description"
                    type="text"
                    placeholder="Description"
                    id="content"
                    name="content"
                    value={postAskQuestion.content}
                    onChange={handlePostQuestionChange}
                  />
                  <div className="tab-one-bottom" style={{ marginTop: "-1%", marginBottom: "1%"}} onClick={() => openModal()}>
                    <div className="location-icon">
                      {postForm.accessType === "PUBLIC" ?
                        <PublicIcon fontSize="large" style={{ color: "#ff6900" }} />
                      : postForm.accessType === "FRIENDS" ?
                        <PeopleAltIcon fontSize="large" style={{ color: "#ff6900" }} /> 
                      :
                        <LockIcon fontSize="large" style={{ color: "#ff6900" }} />
                      }
                    </div>
                  </div>
                  {loading === false ? (
                    <button
                      disabled={!postAskQuestion.content && !postAskQuestion.title}
                      className="upload-promo"
                      onClick={() => {
                        submitPostQuestion();
                      }}
                      //className="upload-now"
                      style={{alignSelf:'flex-start'}}
                    >
                      Postez maintenant
                    </button>
                  ) : (
                    <CircularProgress
                      size={100}
                      thickness={1.6}
                      style={{ color: "#ff6900" }}
                    ></CircularProgress>
                  )}
                </div>
              </Card>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      <ul className="tabs feed-tabs" data-tabs id="feed-tabs">
        <li className={typeOfPoste === 1 ? "tabs-title is-active" : "tabs-title"} >
          <a
            name="1"
            aria-selected={typeOfPoste === 1 ? true : false}
            onClick={handleClick}
          >
            Post
          </a>
        </li>
        <li className={typeOfPoste === 2 ? "tabs-title is-active" : "tabs-title"} >
          <a
            data-tabs-target="panel2"
            name="2"
            aria-selected={typeOfPoste === 2 ? true : false}
            onClick={handleClick}
          >
            Vente Flash
          </a>
        </li>
        <li className={typeOfPoste === 3 ? "tabs-title is-active" : "tabs-title"} >
          <a
            data-tabs-target="panel3"
            name="3"
            aria-selected={typeOfPoste === 3 ? true : false}
            onClick={handleClick}
          >
            Promo
          </a>
        </li>
        <li className={typeOfPoste === 4 ? "tabs-title is-active" : "tabs-title"} >
          <a
            data-tabs-target="panel4"
            name="4"
            aria-selected={typeOfPoste === 4 ? true : false}
            onClick={handleClick}
          >
            Ask Question
          </a>
        </li>
      </ul>
      {input}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        postForm={postForm}
        setPostForm={setPostForm}
        page={"addAccessPost"}
      />
      <Modal
        showModal={showModalArticles}
        setShowModal={setShowModalArticles}
        setPostForm={setPostForm}
        postForm={postForm}
        page={"articlesList"}
        typePost={typePost}
      />
    </div>
  );
}

export default withStyles(styles)(CreatePost);
