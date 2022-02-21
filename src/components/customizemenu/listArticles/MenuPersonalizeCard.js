import React, {useContext} from 'react';
import { UiContext } from '../../../context/UiContext';
import Modal from "../../util/UtilModal";
import ReactStars from "react-rating-stars-component";

function MenuPersonalizeCard(props) {
    const {article} = props;
    const {listChoixArticles, setListChoixArticles, myMenu, setMyMenu, getIndex} = useContext(UiContext);
    const [showModalRating, setShowModalRating] = useState(false);

    var index = getIndex(article.id, myMenu, 'id');

    const menu =
    {
        id: listChoixArticles.length+1,
        idArticle: article.id,
        nameArticle: article.name,
        articleImage: article.articleImage,
        prix: article.price,
        newPrice: article.newPrice,
        quantite: 1,
        rate: article.rate,
        duree: article.duree,
        ingredients: article.ingredients,
        addToMenu: article.addToMenu
    };

    function ajouterAuMenu () {
        setListChoixArticles((prevListChoixArticles) => {
            
            return [...prevListChoixArticles, menu];
        }) 

        setMyMenu((prevMyMenu) => {
            let items = [...prevMyMenu];
            const updatedArticle = {...prevMyMenu[index] , addToMenu: true }
            items[index] = updatedArticle;
            return (items) ;
        })
    }

    function supprimerDuMenu () {
        setListChoixArticles((prevListChoixArticles) => {
            let items = [...prevListChoixArticles];

            const indexArticle = items.findIndex(
                el => el.id === listChoixArticles.id
            );

            items.splice(indexArticle, 1);

            return items;
        })
        setMyMenu((prevMyMenu) => {
            let items = [...prevMyMenu];
            const updatedArticle = {...prevMyMenu[index] , addToMenu: false }
            items[index] = updatedArticle;
            return (items) ;
        })
    }

    const openModalRating = () => {
        setShowModalRating(true);
      };
    
      const firstExample = {
        size: 30,
        value: article.rate,
        edit: false,
      };

    return (
        <div className="card">
            <div className="cardTop"> </div>
            <div className="cardBottom">
                <div className="cardText">
                    <span className="food-name">{article.name}</span>
                    <div className="sub-title">
                        <p>{/*article.ingredients*/} Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                    </div>
                    <div className="price">
                        <span>{article.price} dt</span>
                        <div onClick={openModalRating}>
                            <ReactStars {...firstExample} />
                        </div>
                    </div>
                    <div className="cardHoverText">
                        <div className="menu-info-bottom">
                            <div className="menu-info-bottom-content">
                                <div className="time">
                                    <i className="fal fa-clock" />
                                    <span>{article.duree} min</span>
                                </div>
                                <i className="fal fa-paper-plane paper" />
                            </div>
                            <div className="add-to-menu" onClick={() => ajouterAuMenu()} 
                                style={{ display: myMenu[index].addToMenu ? "none" : "block" }}>
                                <button> <i className="far fa-cart-plus" />Ajouter au menu</button>
                            </div>
                            <div className="delete-to-menu" onClick={() => supprimerDuMenu()}
                                style={{ display: myMenu[index].addToMenu ? "block" : "none" }}>
                                <button> <i className="far fa-cart-plus" />Supprimer du menu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                showModal={showModalRating}
                setShowModal={setShowModalRating}
                page="createRating"
                evaluatedId={article.id}
                ratingType="ARTICLE"
            />
        </div>
    )
}

MenuPersonalizeCard.propTypes = { }

export default MenuPersonalizeCard
