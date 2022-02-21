import React, { useState, useContext, useEffect } from 'react';
import { PostContext } from "../../context/PostContext";
import NavBarBlog from './NavBarBlog'
import MesArticles from './MesArticles'
import BlogInviterAmis from './BlogInviterAmis'
import BlogPost from './BlogPost'

function Blog(props) {
  const { filter, getPublishedArticles } = useContext(PostContext);
  
  const [articles, setArticles] = useState(null);
  useEffect(() => {
      getPublishedArticles(filter, setArticles);
  }, [filter]);
   
    return (articles &&
      <div className="blog-page">
        <div className="blog-page-content ">
          <div className="eprimez-vous">
            Exprimez-vous
          </div>
          <div className="write-your-article">
            Rédiger votre article
          </div>
          <NavBarBlog />
          
          <div className="blog-page-content-feed container">
            <div className="feed-main">
              <div className="tabs-content" data-tabs-content="example-tabs">
                <div className="tabs-panel is-active" id="panel1">
                  <div className="write-post">
                    <div className="write-post-header">
                      <button className="back-to-page-two"><i className="icon-arrow-left back-to-page-two" /></button>
                      <div className="categories-dropdown">
                        <div className="choose-categorie">
                          <span>    Choisir une catégorie pour votre article</span>
                          <i className="fal fa-sort-down sort-down"/>
                        </div>                        
                      </div>
                      <div className="dropdown-categorie" id="country-dropdown">
                          <form> 
                            <div className="dropdown-top">
                              <span>Choisir une catégorie</span>
                              <i className="fal fa-sort-up sort-up" />
                            </div>
                            <div className="categories">
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus visités</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                  </div>
                  
                  {articles ? (
                    <BlogPost post={articles[0]} />
                  ):(
                    <></>
                  )}

                  <MesArticles />

                  {articles && articles.slice(1, 3).map((article, index) =>
                    <BlogPost post={article} key={index}/>
                  )} 

                  <BlogInviterAmis />

                  {articles && articles.slice(3, articles.length).map((article, index) =>
                    <BlogPost post={article} key={index} />
                  )}
                  
                </div>
                <div className="tabs-panel" id="panel2" />
              </div>
            </div>
          </div>
        
        </div>
       
     
      </div>
    )
}

Blog.propTypes = {

}

export default Blog

