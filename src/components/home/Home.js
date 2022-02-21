import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../post/CreatePost";
import PostStandard from "../post/PostStandard";
import HomeSideBar from "../home/HomeSideBar";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import Suggestions from "../suggestions/Suggestions";
import PromoTakTak from "../ads/PromoTakTak";
import MobileAppAd from "../ads/MobileAppAd";
import Reviews from "../post/Reviews";
import RestaurantBook from "../post/RestaurantBook";
import GesionResidus from "../post/GesionResidus";
import Stories from "../stories/Stories";
import { CircularProgress } from "@material-ui/core";

function Home(props) {
  const { activeUser, getPosts } = useContext(UserContext);
  const { setFeed } = useContext(PostContext);
  const [posts, setPosts] = useState(null);
  const [feedLoader, setFeedLoader] = useState(true);

  useEffect(() => {
    getPosts(setFeed).then((posts) => {
      let arr = posts;
      setPosts(arr.sort((a, b) => {
        let na = new Date(a.createdAt) 
        let nb = new Date(b.createdAt)
        return nb - na
      }));
      setFeedLoader(false);
    });
  }, [props]);

  return (
    <div>
      <div className="feeds-page" id="feeds-page">
        <div className="feeds-page-content container">
          <div className="feeds-page-content-feed">
            <div className="feed-main">
              <div className="stories">
                <Stories />
              </div>
              <CreatePost setFeedLoader={setFeedLoader} />
              {feedLoader ? (
                <div
                  style={{
                    display : "flex",
                    justifyContent:"center",
                    alignItems : "center",
                    marginBottom: "3rem",
                    border: "1px solid #e8e8e8",
                    boxShadow: " 2px 2px 2px rgb(0 0 0 / 5%)",
                    borderRadius: " 5px",
                    marginTop: "2rem",
                    height : "30rem"
                  }}
                >
                  <CircularProgress
                    size={70}
                    thickness={1}
                    style={{ color: "#ff6900" }}
                  />
                </div>
              ) : (
                <div>
                  {posts &&
                    posts.map((post) => (
                      <PostStandard post={post} user={activeUser} key={post._id} setPosts={setPosts}/>
                    ))}
                </div>
              )}
              
              <Suggestions />
              <RestaurantBook />
              <MobileAppAd />
              <Reviews />
              <PromoTakTak />
              <hr className="separator" />
              <GesionResidus />
            </div>
            <HomeSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
