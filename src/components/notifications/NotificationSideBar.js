import React from 'react';

function NotificationSideBar(props) {
    
    return (
        <div className="feed-secondary">
            <img src="../assets/img/birthday-img.png" className="birthday" />
            <div className="promotion-discount">
                <div className="promotion-discount-header">
                    <div className="restaurant-item">
                        <img src="../assets/img/icon-restaurant.png" />
                        <div>
                            <span>Moh Yamin Resto</span>
                            <span><i className="icon-marker" /> Sousse, Cuisine Chinoise</span>
                        </div>
                    </div>
                    <span>-70 %</span>
                </div>
                <div className="promotion-discount-invisible">
                    <img src="../assets/img/Rectangle 1442.png" alt="" />
                    <div className="description">
                        <span> <strong> Vivez pleinement votre anniversaire !</strong></span>
                        <span>TakTak vous offre spécialement une réduction de 70% sur votre consommation et 5 de tes amis.</span>
                    </div>
                    <div className="promotion-discount-invisible-bottom">
                        <div className="content">
                            <span className="invit">Invitez vos amis à vous rejoindre</span>
                            <input type="text" />
                            <i className="fal fa-at at" />
                            <span className="send">Envoyer</span>
                            <div className="content-footer">
                                <img src="../assets/img/Ellipse 31.png" alt="" />
                                <img src="../assets/img/Ellipse 31.png" alt="" />
                                <div className="add-user"> <i className="fal fa-user-alt user" /> </div>
                                <div className="add-user"> <i className="fal fa-user-alt user" /> </div>
                                <div className="add-user"> <i className="fal fa-user-alt user" /> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="title-feed-secondary">
                <span>Améliorer votre Journal</span>
            </div>
            <div className="list-to-dos">
                <div className="to-do-item">
                    <i className="fal fa-check-circle" aria-hidden="true" />
                    <span className="to-do">Suivre 10 restaurants</span>
                </div>
                <div className="to-do-item">
                    <i className="fal fa-check-circle" aria-hidden="true" />
                    <span className="to-do">Ajouter 10 personnes à ta liste d’amis</span>
                </div>
                <div className="to-do-item">
                    <i className="fal fa-check-circle" aria-hidden="true" />
                    <span className="to-do">Poster ton premier story</span>
                </div>
                <div className="to-do-item">
                    <i className="fal fa-check-circle" aria-hidden="true" />
                    <span className="to-do">Poster un article dans Blog</span>
                </div>
                <div className="show-missions">
                    <span>Afficher plus de missions</span>
                </div>
                <a className="list-to-dos-footer" href="taktak-points.html">
                    <span className="your-balance">Votre balance</span>
                    <div className="sold-wintak">
                        <span className="sold">367</span>
                        <span className="wintak">WinTak</span>
                    </div>
                    <div className="right">
                        <i className="fal fa-angle-right" aria-hidden="true" />
                    </div>
                </a>
            </div>
        </div>
    )
}

NotificationSideBar.propTypes = {

}

export default NotificationSideBar