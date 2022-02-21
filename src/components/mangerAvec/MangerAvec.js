import React, {useState, useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function MangerAvec(props) {
    const {restaurant} = props;
    const {} = useContext(UiContext);
    const [partage, setPartage] = useState( false );

    const handleChange = (event) => {
        setPartage(event.target.checked);
    };

    return (
        <div className="eating-with-stranger">
            <span className="eating-with-stranger-title"> EatMeet</span>
            <span className="eating-with-stranger-description">
                Nous avons détecté que vous êtes maintenant dans <strong>{restaurant.name} Restaurant</strong> !
                Est ce que vous désirez rester pour manger?</span>
            <div className="accept-the-concept-or-refuse">
                <button>Oui, c’est bien ça</button>
                <div className="accept">
                    <i className="fal fa-coffee" />
                    <span>Je partage ma table</span>
                    <label className="eat-switch ">
                        <input type="checkbox" checked={partage} onChange={handleChange}/>
                        <span className="slider round" />
                    </label>
                </div>
                <div className="refuse" style={{ display: partage ? "none" : "block", marginLeft: 70 }}>
                    <span>Non merci, je sors</span>
                </div>
                <div className="number-of-place" style={{display: partage ? "block" : "none" }}>
                    <div>
                        <i className="fal fa-chair" />
                        <span>places</span>
                        <i className="far fa-minus-square plus-moins" />
                        <div className="number">2</div>
                        <i className="far fa-plus-square plus-moins" />
                    </div>
                </div>
            </div>
        </div>
    )
}

MangerAvec.propTypes = { }

export default MangerAvec
