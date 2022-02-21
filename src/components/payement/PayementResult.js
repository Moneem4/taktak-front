import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function PayementResult(props) {
    return (
        <div className="paiement-page">
            <div className="paiement-page-content container">
                <div className="paiement-page-content-second-page">
                    <div className="loading-inner">
                        <div id="circle" />
                        <img className="chief" src="../../assets/img/svg/chief.svg" />
                    </div>
                    <div className="loading-info">
                        <span>
                           Votre paiement est encours d’être traité.
                        </span>
                        <p>
                            Une fois validé, vous recevrez une notification et un email avec votre facture.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

PayementResult.propTypes = { }

export default PayementResult

