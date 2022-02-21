import React, {useState, useContext, useEffect} from 'react';
import { UiContext } from '../../context/UiContext';
import { UserContext } from '../../context/UserContext';

function SideBarAmelioreJournal(props) {
    const {} = props;
    const {improveProfile} = useContext(UserContext);
    const {points} = useContext(UiContext);
    const [profilData, setProfilData] = useState(null);
    const [showMore, setShowMore] = useState(false);

    function showPageBottom() {
        setShowMore(!showMore)
    }

    useEffect(() => {
        improveProfile(setProfilData);
    }, []);
    
    return (profilData && 
        <div>
            <div className="title-feed-secondary">
                <span>Améliorer votre Journal</span>
            </div>
            <div className="list-to-dos">
                {profilData.follow10Restaurants ?
                    <div className="to-do-item">
                        <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                        <span className="to-do">Suivre 10 restaurants</span>
                    </div>
                :
                    <div className="to-do-item">
                        <i className="fal fa-check-circle"/>
                        <span className="to-do">Suivre 10 restaurants</span>
                    </div>
                }
                {profilData.follow10Users ?
                    <div className="to-do-item">
                        <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                        <span className="to-do">
                            Ajouter 10 personnes à ta liste d’amis
                        </span>
                    </div>
                :
                    <div className="to-do-item">
                        <i className="fal fa-check-circle" />
                        <span className="to-do">
                            Ajouter 10 personnes à ta liste d’amis
                        </span>
                    </div>
                }
                {profilData.posterStory ?
                    <div className="to-do-item">
                        <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                        <span className="to-do">Poster ton premier story</span>
                    </div>
                :
                    <div className="to-do-item">
                        <i className="fal fa-check-circle" />
                        <span className="to-do">Poster ton premier story</span>
                    </div>
                }
                {profilData.posterArticle ?
                    <div className="to-do-item">
                        <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                        <span className="to-do">Poster un article dans Blog</span>
                    </div>
                :
                    <div className="to-do-item">
                        <i className="fal fa-check-circle" />
                        <span className="to-do">Poster un article dans Blog</span>
                    </div>
                }
                <div style={{ display: showMore ? "block" : "none" }}>
                    {profilData.recommendRestaurant ?
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                            <span className="to-do">Recommander un restaurant</span>
                        </div>
                    :
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" />
                            <span className="to-do">Recommander un restaurant</span>
                        </div>
                    }
                    {profilData.downloadApp ?
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                            <span className="to-do">Téléchargez l’application mobile</span>
                        </div>
                    :
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" />
                            <span className="to-do">Téléchargez l’application mobile</span>
                        </div>
                    }
                    {profilData.addReview ?
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                            <span className="to-do">Ajouter un 1er avis</span>
                        </div>
                    :
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" />
                            <span className="to-do">Ajouter un 1er avis</span>
                        </div>
                    }
                    {profilData.createPostMedia ?
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                            <span className="to-do">Publier votre 1er Image/vidéo</span>
                        </div>
                    :
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" />
                            <span className="to-do">Publier votre 1er Image/vidéo</span>
                        </div>
                    }
                    {profilData.eatWithStranger ?
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                            <span className="to-do">Essayer Eat With Stranger</span>
                        </div>
                    :
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" />
                            <span className="to-do">Essayer Eat With Stranger</span>
                        </div>
                    }
                    {profilData.makeDonation ?
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" style={{color: "#ff6900"}}/>
                            <span className="to-do">Faire un 1er don</span>
                        </div>
                    :
                        <div className="to-do-item">
                            <i className="fal fa-check-circle" />
                            <span className="to-do">Faire un 1er don</span>
                        </div>
                    }
                </div>
                <div className="show-missions" onClick={showPageBottom} style={{cursor:'pointer'}}>
                    {showMore ?
                        <span>Afficher moins de missions</span>
                    :
                        <span>Afficher plus de missions</span>
                    }
                </div>
                <a className="list-to-dos-footer" href="taktak-points.html">
                    <span className="your-balance">Votre balance</span>
                    <div className="sold-wintak">
                        <span className="sold">{points.somme}</span>
                        <span className="wintak">WinTak</span>
                    </div>
                    <div className="right">
                        <i className="fal fa-angle-right" />
                     </div>
                </a>
            </div>
        </div>
    )
}

export default SideBarAmelioreJournal