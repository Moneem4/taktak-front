import React, { useState, useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import Modal from "../../util/UtilModal";

function Alert(props) {
  return <MuiAlert elevation={7} variant="filled" {...props}  />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),

    },
  },
}));

function MenuCardPM(props) {
  const classes = useStyles();
  const { restaurantId, article, articlesList } = props;
  const {
    getIndex,
    addArticleToPersonalizeMenu,
    deleteArticleFromPersonalizeMenu,
  } = useContext(RestaurantContext);
  
  const [open, setOpen] = React.useState(false);

  const [showModalRating, setShowModalRating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function ajouterAuMenu() {
    addArticleToPersonalizeMenu(restaurantId, article._id);
    handleClick()
  }

  function supprimerDuMenu() {
    deleteArticleFromPersonalizeMenu(article._id);
  }

  const openModalRating = () => {
    setShowModalRating(true);
  };

  const firstExample = {
    size: 30,
    value: article.articleRate,
    edit: false,
  };

  return article ? (  
    <div className="card" style={{ width: "100%", height: 375 }}>
      <div className="cardTop">
        <img
          style={{ objectFit: "contain" }}
          src={`https://${article.image}`}
        ></img>
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <span className="food-name">{article.name}</span>
          <div className="sub-title" style={{height: 120}}>
            <p>{article.ingredients.map((el) => `${el},  `)}</p>
          </div>
          <div className="price" style={{ marginTop: -10 }}>
            <span>{article.price} dt</span>
            <Rating name="read-only" value={article.rate} readOnly />
          </div>
          <div className="cardHoverText">
            <div className="menu-info-bottom">
              <div className="menu-info-bottom-content">
                <Grid container direction="row">
                  <Grid item xs={5}>
                    <div className="time">
                      <i className="fal fa-clock" />
                      <span>{article.duration} min</span>
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <div className="icons">
                      <i className="fal fa-pen" onClick={openModal} />
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <div className="icons">
                      <i className="fal fa-paper-plane paper" />
                    </div>
                  </Grid>
                  <Grid item xs={5}>
                    {/*<div className="icons" onClick={() => ajouterAuMenu()}>
                      <i className="far fa-cart-plus" />
                    </div>*/}
                    <div
                      className="add-to-menu"
                      onClick={() => ajouterAuMenu()}
                      style={{  }}
                    >
                      <button>
                        <i className="far fa-cart-plus" />
                        Ajouter au panier
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <Snackbar open={open} autoHideDuration={6000}style={{width:"300%"}} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" >
                  Article AjoutÃ©
                </Alert>
              </Snackbar>               
            </div>
          </div>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        page="detailArticle"
        article={article}
      />
    </div>
  ) : (
    
    <></>
  );
}


export default MenuCardPM;
