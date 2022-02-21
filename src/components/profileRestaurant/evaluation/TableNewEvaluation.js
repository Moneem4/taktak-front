import React from 'react';

function TableNewEvaluation(props) {
    
    return (
        <div className="news-evalutaion">
            <span> <strong>5 </strong>  nouvelles évaluations.</span>
            <div className="peoples">
                <div className="people">
                    <img src="../../assets/img/avatar.png" />
                </div>
                <div className="people">
                    <img src="../../assets/img/avatar.png" />
                </div>
                <div className="people">
                    <img src="../../assets/img/avatar.png" />
                </div>
                <div className="people">
                    <img src="../../assets/img/avatar.png" />
                </div>
                <div className="people">
                    <img src="../../assets/img/avatar.png" />
                </div>
            </div>
            <span className="examine">Examiner</span>
        </div>
    )
}

TableNewEvaluation.propTypes = {

}

export default TableNewEvaluation