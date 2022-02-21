import React, {useState, useContext} from 'react';
import { UiContext } from '../../../context/UiContext';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactStars from "react-rating-stars-component";
import Modal from "../../util/UtilModal";

const styles = (theme) => ({
    
});

function BookingArticle(props) {
    const { classes, article } = props;
    const { myReservation, setMyReservation } = useContext(UiContext);
    const [showModalRating, setShowModalRating] = useState(false);

    const handleClose = () => {
        props.setShowModal(!props.showModal);
    };

    const firstExample = {
        size: 15,
        value: article.articleRate,
        edit: false,
    };

    const openModalRating = () => {
        setShowModalRating(true);
    };

    return (
        <div className="show-process">
            <div className="booking-content">
            <span className="close" style={{marginLeft: 300, marginTop: 10, marginBottom: 50}} onClick={() => handleClose()}>Fermer <i className="fal fa-times" /> </span>
                <div className="card-process-header">
                    <div className="left-side">
                        <span className="name">{article.name}</span>
                        <div className="header-bottom">
                            <span>Evaluez cet article</span>
                            <div onClick={openModalRating}>
                                <ReactStars {...firstExample} />
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <span>M</span>
                    </div>
                </div>
                <img src={`https://${article.image}`}/>
                <div className="details">
                    <div className="quantite">
                        <span>Quantité </span>
                        <span>{article.quantity ? article.quantity : 1}</span>
                    </div>
                    <div className="price">
                        <span>Prix Total</span>
                        <span>{article.price * (article.quantity ? article.quantity : 1)} dt</span>
                    </div>
                </div>
                <div className="ingredients">
                    <span className="ingr-title">Ingrédients</span>
                    <div className="list-ingrdients">
                        {article.ingredients && article.ingredients.map((ingredient) => (
                            <div className="ingrdient-item">
                                <span>{ingredient}</span>
                            </div>
                        ))}
                    </div>
                    <div className="new-ingredients">
                        <span className="new-ingredients-title">( <strong style={{color: '#ff6900'}}>
                            {article.newIngredients ? article.newIngredients.length : 0}</strong> ) nouveaux ingrédients ajoutés</span>
                        <div className="list-new-ingrdients">
                            {article.newIngredients && article.newIngredients.map((menu) => (
                                <div className="ingrdient-item">
                                    <span>{menu}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button>Commander</button>
                </div> 
            </div>
            <Modal
                showModal={showModalRating}
                setShowModal={setShowModalRating}
                page="createRating"
                evaluatedId={article._id}
                ratingType="ARTICLE"
            />
        </div>
    )
}

BookingArticle.propTypes = { }

export default withStyles(styles)(BookingArticle)
