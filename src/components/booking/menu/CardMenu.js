import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from "../../util/UtilModal";

const styles = (theme) => ({
    
});

function CardMenu(props) {
    const { classes, article } = props;
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };
    
    return (
        <div>
            <div className="menu-item" onClick={() => openModal()}>
                <div className="name-food">{article.name}</div>
                <img src={`https://${article.image}`} />
                {/*<span className="date"> <strong>Modifié le:</strong>{article.createdAt}</span>*/}
            </div>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                menu={article}
                page={"menu"}
            />
        </div>
    )
}

export default withStyles(styles)(CardMenu)
