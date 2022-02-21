import React from 'react';

function DerniersPosts(props) {
    const {restaurant} = props;

    return (
        <div className="restaurants-followed ">
            <h3 className="restaurants-followed-title profile-title"> Derniers posts </h3>
            {restaurant.postes.map((post) => (
                <div className="card restaurant-post-card">
                    <div className="restaurant-post-card-header">
                        <div className="restaurant-post-card-photo">
                            <img src={post.imagePost} alt="restaurant-post " />
                        </div>
                    </div>
                    <div className="restaurant-post-card-body">
                        <div className="restaurant-who-post-wrapper">
                            <div className="restaurant-who-post">
                                <div className="restaurant-who-post-info">
                                    <div className="restaurant-who-post-info-avatar">
                                        <img src={post.userProfileImage} />
                                    </div>
                                    <div className="restaurant-who-post-info-info">
                                        <span className="restaurant-username">{post.userName}</span>
                                        <div className="restaurant-about">
                                            <i className="icon-marker" />
                                            <span>{post.address}, {post.cuisine} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="restaurant-who-post-details">
                                    <span className="date">{post.datePost}</span>
                                    <span className="reading-time">2 min de lecture</span>
                                </div>
                            </div>
                            <div className="description">
                                {post.description}
                            </div>
                        </div>
                    </div>
                    <div className="divider" />
                </div>
            ))}
        </div>        
    )
}

DerniersPosts.propTypes = {

}

export default DerniersPosts