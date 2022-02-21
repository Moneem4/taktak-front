import React, { useState } from "react";
import CardListItem from "./CardListItem";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {useHistory} from "react-router-dom";
import FaireUnDon from "./FaireUnDon";

function SidebarResidusUser(props) {
  const { myCommande, setMyCommande } = props;
  let history=useHistory();
  const [state, setState] = React.useState({right: false});

  function resetList() {
    setMyCommande((prevMyCommande) => {
      let articles = [];
      let updatedArticles = {...prevMyCommande, articles: articles}
      return updatedArticles;
    });
  }

  function commander(){
    history.push('/payerResidus/'+myCommande.articles[0].restaurantId)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      //sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{width: 700}}
    >
      <FaireUnDon myCommande={myCommande} setMyCommande={setMyCommande} toggleDrawer={toggleDrawer} />
    </Box>
  );
  
  return (
    <div className="feed-secondary">
      <div className="my-list">
        <span className="left-side">
          Ma liste (
          <span style={{ color: "#ff6900" }}>
            {myCommande && myCommande.articles.length && myCommande.articles.length}
          </span>
          )
        </span>
        <span className="right-side" onClick={resetList}>
          Supprimer tout
        </span>
      </div>
      <div className="content-list">
        {myCommande.articles.map((article) => (
          <CardListItem
            article={article}
            myCommande={myCommande}
            setMyCommande={setMyCommande}
          />
        ))}
        {myCommande.articles && myCommande.articles.length===0 ? 
          <button className="confirmation" disabled>Commander</button> 
        : 
          <button className="confirmation" onClick={commander} >Commander</button>
        }
        {myCommande.articles && myCommande.articles.length===0 ? 
          <button style={{width:"100%",height:"60px",borderRadius:"5px",background:"white",fontWeight:"bold",
            fontSize:"18px",color:" #fffff",outline:"none",cursor:"pointer",borderColor:"#ff6900"}} 
            disabled >
            Faire un Don
          </button>
        :
          <button style={{width:"100%",height:"60px",borderRadius:"5px",background:"white",fontWeight:"bold",
            fontSize:"18px",color:" #fffff",outline:"none",cursor:"pointer",borderColor:"#ff6900"}} 
            onClick={toggleDrawer('right', true)} >
            Faire un Don
          </button>
        }
      </div>
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  );
}

SidebarResidusUser.propTypes = {};

export default SidebarResidusUser;
