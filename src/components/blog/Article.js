import React, {useContext} from 'react';
import {PostContext} from '../../context/PostContext';
import { NavLink } from 'react-router-dom';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

function Article(props) {
    const {article, articlesBlog, setArticlesBlog} = props;
    const {deleteArticleBlog} = useContext(PostContext);

    function removeArticlet(id) {
        deleteArticleBlog(article._id, setArticlesBlog);
    }

    return (
        <div className="item">
            {/*article.status === "PUBLISHED" ? (
                <NavLink exact to={`/blog/articleBlog/` + article._id } style={{color: "#fff"}}>
                    <img src={`https://${article.backgroundImage}`} alt="backgroundImage" />
                </NavLink>
            */}
            {/*<NavLink exact to={`/blog/draftArticle/` + article._id } style={{color: "#fff"}}>
                <img src={`https://${article.backgroundImage}`} alt="backgroundImage" />
            </NavLink>*/}
            <img src={`https://${article.backgroundImage}`} alt="backgroundImage" />
            <div className="post-content">
                <p className="title">{article.title}</p>
                <div className="bottom">
                    <span>{article.createdAt}</span>
                </div>
            </div>
            <Grid container direction="row">
                <Grid item>
                    <span className="published">{article.status === "PUBLISHED" ? "Publié" : "Brouillon"}</span>
                </Grid>
                <Grid item>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={removeArticlet}
                    >
                        <DeleteIcon fontSize="large" style={{ color: "#ff6900" }} />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

Article.propTypes = {

}

export default Article