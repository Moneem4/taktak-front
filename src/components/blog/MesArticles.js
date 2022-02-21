import React, {useState, useContext, useEffect} from 'react';
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import Article from './Article';
import { NavLink } from 'react-router-dom';

function MesArticles(props) {
    const { activeUser } = useContext(UserContext);
    const { getArticlesBlogByUserId } = useContext(PostContext);
    const [articlesBlog, setArticlesBlog] = useState(null);

    const items = articlesBlog && articlesBlog.map((article, index) => (
        <div key={index}>
          <Article article={article} articlesBlog={articlesBlog} setArticlesBlog={setArticlesBlog}/>
        </div>
    ));

    useEffect(() => {
        if(activeUser.isRestaurant){
            getArticlesBlogByUserId(activeUser.connectedRestaurentId, setArticlesBlog);
        }else{
            getArticlesBlogByUserId(activeUser.userId, setArticlesBlog);
        }
    }, [props]);

    return (
        <div className="my-post">
            <div className="header">
                <span>Mes articles</span>
                <NavLink exact to={`/blog/nouveauArticle`} style={{color: "#fff"}}>
                    <button className="button-new-article">
                        <i className="fal fa-pencil" aria-hidden="true" style={{color: "#fff"}} />
                            Nouveau article
                    </button>
                </NavLink>
            </div>
            <div className="all-post-body" style={{overflow: "scroll", height: "62%"}}>
                {items}
            </div>
            {/*<div className="show-all">
                <span>Voir tout</span> 
            </div>*/}
        </div>                  
    )
}

export default MesArticles