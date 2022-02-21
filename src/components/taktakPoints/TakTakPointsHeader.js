import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink } from 'react-router-dom';

const styles = (theme) => ({
    
});

function TakTakPointsHeader(props) {
    const { classes, page, style } = props;
    const {points} = useContext(UiContext);

    return (
        <div className={style}>
            <div className="solde-wintak-left-side">
                <span>Votre solde TakTak</span>
                <span>Jusqu’au {points.dateExpirer}</span>
                <img className="triangle" src="../assets/img/svg/Polygone 2.png" />
            </div>
            <div className="solde-wintak-right-side">
                <img src="../assets/img/svg/row_1.png" alt="" />
                <div className="solde">
                    <span>{points.somme}</span>
                    <span>WinTak</span>
                </div>
                <NavLink exact to={`/taktakPoints/grille`}>
                    <div className="show-grid" style={{ display: page === "taktakPoint" ? "block" : "none" }}>
                        <span>Voir la grille</span>
                        <i className="fa fa-angle-right" />
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

TakTakPointsHeader.propTypes = { }

export default withStyles(styles)(TakTakPointsHeader)
