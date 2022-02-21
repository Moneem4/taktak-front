import React, { useState, useRef, useEffect, useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import PostStandard from "../post/PostStandard";
import HomeSideBar from "../home/HomeSideBar";

const styles = (theme) => ({
    
});

function Promos(props) {
  const { classes } = props;
  const { getPromoPosts } = useContext(PostContext);
  const { activeUser } = useContext(UserContext);

  const [promosList, setPromosList] = useState(null);
  useEffect(() => {
    getPromoPosts().then((posts) => {
        let arr = posts;
        setPromosList(arr.sort((a, b) => {
          let na = new Date(a.createdAt) 
          let nb = new Date(b.createdAt)
          return nb - na
        }));
      });
  }, []);
  
  return (promosList ?
    <div className="feeds-page" id="feeds-page">
        <div className="feeds-page-content container">
            <div className="feeds-page-content-feed">
                <div className="feed-main">
                    {promosList && promosList.map((post) => (
                        <PostStandard post={post} user={activeUser} key={post._id} setPosts={setPromosList}/>
                    ))}
                </div>
                <HomeSideBar />
            </div>
        </div>
    </div>
  :
    <div>
      <LinearProgress style={{ marginBottom: 10 }} />
      <LinearProgress color="secondary" />
    </div>
  );
}

export default withStyles(styles)(Promos);
