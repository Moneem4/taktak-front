import React from 'react';
import Rating from "@material-ui/lab/Rating";

function TableEvaluationEtoile(props) {
    
    return (
        <div className="percentages-evaluation">
            <div className="header">
                <Rating 
                    name="read-only"
                    value={4}
                    readOnly
                />
                <div className="right-side">
                    <span className="number">4.2/5</span>
                    <span className="vote">12 votes</span>
                </div>
            </div>
            <div className="main">
                <div className="item">
                    <span className="number-of-star">1 étoile</span>
                    <div className="progress-bar">
                        <span className="progress-bar__inner" style={{width: '10%'}} />
                    </div>
                    <span className="pourcentage">12%</span>
                </div>
                <div className="item">
                    <span className="number-of-star">2 étoile</span>
                    <div className="progress-bar">
                        <span className="progress-bar__inner" style={{width: '25%'}} />
                    </div>
                    <span className="pourcentage">12%</span>
                </div>
                <div className="item">
                    <span className="number-of-star">3 étoile</span>
                    <div className="progress-bar">
                        <span className="progress-bar__inner" style={{width: '45%'}} />
                    </div>
                    <span className="pourcentage">12%</span>
                </div>
                <div className="item">
                    <span className="number-of-star">4 étoile</span>
                    <div className="progress-bar">
                        <span className="progress-bar__inner" style={{width: '90%'}} />
                    </div>
                    <span className="pourcentage">12%</span>
                </div>
               <div className="item">
                    <span className="number-of-star">5 étoile</span>
                    <div className="progress-bar">
                        <span className="progress-bar__inner" style={{width: '15%'}} />
                    </div>
                    <span className="pourcentage">12%</span>
                </div>
            </div>
        </div>
    )
}

TableEvaluationEtoile.propTypes = {

}

export default TableEvaluationEtoile