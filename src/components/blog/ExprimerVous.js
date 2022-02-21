import React from 'react';
import { NavLink } from 'react-router-dom';

function ExprimerVous(props) {
    
    return (
        <div style={{marginBottom: 70}}>
            <div className="write-your-article">
                Exprimez-vous
            </div>
            <div style={{marginTop: 20}}>
                <div className="blog-post-details-header">
                    <div className="details-back">
                        <span className="icon-arrow-left back-to-page-one" />
                        <p> Voyage Culinaire </p>
                    </div>
                    <NavLink exact to={`/blog/nouveauArticle`} style={{color: "#fff"}}>
                        <button>
                            <i className="fal fa-pencil" />
                            <span style={{marginLeft: 10}}>Nouveau article</span>
                        </button>
                    </NavLink>
                </div>
                <div className="blog-post with-details">
                    <div className="blog-post-media">
                        <img src="../assets/img/image3.jpg" />
                    </div>
                    <div className="blog-post-content">
                        <div className="post-content-header">
                            <div className="post-header-poster">
                                <img src="../assets/img/avatar.png" />
                                <div className="poster-info">
                                    <span className="poster-name">
                                    Salma Mustafa
                                    </span>
                                    <span className="poster-location">
                                    <i className="icon-marker"> </i>
                                    Marsa, Tunis
                                    </span>
                                </div>
                            </div>
                            <div className="post-info">
                                <span>12 janvier 2020 . 2 min de lecture</span>
                            </div>
                        </div>
                        <div className="post-content-content">
                            <div className="content-title-new-article">
                                Lorem ipsum dolor sit amet, consect etur adipiscing elit.
                            </div>
                            <p>
                                Sed at ornare lectus, id fermentum eros. Maecenas
                                nunc nisl, viverra ac vulputate quis, vehicula sed
                                massa. Proin et sem at tortor venenatis mattis eget
                                quis leo. Suspendisse ut ante pulvinar, suscipit
                                sapien vel, efficitur est. Sed justo tellus, pretium
                                eget commodo a, volutpat semper arcu. Maecenas
                                iaculis sodales orci, sit amet tempor justo ultrices
                                ut. Vestibulum porttitor ante id nisl scelerisque,
                                eget efficitur justo interdum. Cras lobortis nisl
                                sit amet vestibulum convallis. Vivamus at libero
                                ligula. Nulla at porta ante. Fusce sit amet lacinia
                                est, ac pellentesque massa. Duis vel pharetra nunc.
                                Morbi pretium felis vel felis accumsan volutpat.
                            </p>
                            <p>
                                Mauris placerat mi ac eros mollis, sit amet porta
                                leo scelerisque. Fusce sagittis pulvinar lorem,
                                vitae tempus dolor aliquet vel. Duis tempus metus
                                nec velit sodales, quis accumsan velit sodales. Nunc
                                sodales bibendum mattis. Mauris porttitor cursus dui
                                ut ultricies.
                            </p>
                            <p>
                                Mauris placerat mi ac eros mollis, sit amet porta
                                leo scelerisque. Fusce sagittis pulvinar lorem,
                                vitae tempus dolor aliquet vel. Duis tempus metus
                                nec velit sodales, quis accumsan velit sodales. Nunc
                                sodales bibendum mattis. Mauris porttitor cursus dui
                                ut ultricies.
                            </p>
                        </div>
                    </div>    
                </div>
                <div className="divider" />
                <div className="card post-card">
                    <div className="post-card-footer">
                        <div className="post-card-social-info">
                            <div className="post-card-likes">
                                <i className="icon-heart" />
                                <span className="likes-number">33</span>
                            </div>
                            <div className="post-card-comments">
                                <i className="icon-comment" />
                                <span className="comments-number">32</span>
                                <span className="comments-show-more">Afficher commentaires</span>
                            </div>
                            <div className="post-card-comment-button">
                                <i className="icon-send"> </i>
                            </div>
                        </div>
                        <div className="post-card-comment">
                            <div className="post-card-comment-avatar">
                                <img src="../assets/img/avatar.png" />
                                <i className="fal fa-caret-down" aria-hidden="true" />
                            </div>
                            <div className="post-card-comment-input">
                                <input placeholder="Commenter ce post" className="post-card-comment-input-field" type="text" />
                                <div className="comment-options">
                                    <i className="icon-camera" />
                                    <i className="icon-smile" />
                                    <i className="icon-mic" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>        
        </div>
    )
}

ExprimerVous.propTypes = {

}

export default ExprimerVous