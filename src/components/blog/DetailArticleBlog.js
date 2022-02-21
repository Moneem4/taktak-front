import React, {useState, useContext, useEffect} from 'react';
import { PostContext } from "../../context/PostContext";
import withStyles from "@material-ui/core/styles/withStyles";
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

const styles = (theme) => ({
    textInput: {
        fontSize: "2.8rem"
    }
});

function DetailArticleBlog(props) {
    const { classes } = props;
    const { getArticleBlogData } = useContext(PostContext);

    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[5];
        return url;
    
    };

    const renderBloc = (param, index) => {
        switch (param && param.type) {
            case 'TEXT':
                return (
                    <TextareaAutosize 
                        rows={1}
                        name="description"
                        value={param.description} 
                        style={{fontSize: "2.8rem", marginLeft:10}}
                    />
                )
            case 'IMAGE':
                return (
                    <img 
                        src={`https://${param.description}`}
                        alt="img" 
                        style={{height: 250, width: 350, marginLeft: "35%"}}
                    />   
                )
            case 'VIDEO':
                return (
                    <video controls style={{ height: 250, width: 350, marginLeft:"35%" }}>
                        <source src={`https://${param.description}`} />
                    </video>   
                )
            default:
                return (
                    <div></div>
                )
        }
    };

    const [article, setArticle] = useState(null);
    useEffect(() => {
        getArticleBlogData(getUrlFromPath(), setArticle);
    }, [props]);

    return (
        <div style={{marginBottom: 70}}>
            <div className="write-your-article">
                {article && article.title}
            </div>
            <div style={{margin: 20}}>
                <div className="write-post-header">
                    <NavLink exact to={`/blog`}>
                        <button>
                            <i className="icon-arrow-left back-to-page-two" />
                        </button>
                    </NavLink>
                    <div className="categories-dropdown">
                        <div className="choose-categorie" >
                            <span>{article && article.category}</span>
                            <i className="fal fa-sort-down sort-down" />
                        </div>
                    </div>
                </div>
                
                <div className="add-cover" >
                    <img
                        src={article && `https://${article.backgroundImage}`}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>                
                
                <div className="post-draft">
                    <div className="textarea" style={{border: "1px solid #e8e8e8", height: "100%"}}>
                        {article && article.contentBlog.map((section, index) =>
                            <div key={index}>
                                {renderBloc(section, index)}
                            </div>
                        )}                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(DetailArticleBlog);