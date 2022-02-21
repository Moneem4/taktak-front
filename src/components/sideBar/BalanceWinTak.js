import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function BalanceWinTak(props) {
    const {restaurant} = props;
    const {} = useContext(UiContext);

    return (
        <a className="balance" href="taktak-points.html">
            <img src="../assets/img/row_.png" alt="" />
            <div className="your-balance">
                <span className="title">Votre balance</span>
                <div className="sold">
                    <span className="numb">367</span>
                    <span className="wintak">Wintak</span>
                </div>
            </div>
            <i className="fal fa-angle-right" aria-hidden="true" />
        </a>
    )
}

export default BalanceWinTak