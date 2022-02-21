import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import TakTakPointsHeader from './TakTakPointsHeader';

const styles = (theme) => ({
    gridContainer: {
        justify: 'space-between',
        alignContent: 'space-between',
        height: 600,
        marginTop: 20
    },
    gridList: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
    },
});

function GrilleDeValeurs(props) {
    const { classes } = props;
    const {points} = useContext(UiContext);

    return (
        <div className="taktak-points">
            <div className="taktak-points-content">
                <div className="taktak-points-content-second-page container">
                    <div className="taktak-points-second-page-header">
                        <NavLink exact to={`/taktakPoints`}>
                            <div className="second-page-header-left-side">
                                <i className="fal fa-long-arrow-alt-left" />
                                <span>Retour</span>
                            </div>
                        </NavLink>
                        <TakTakPointsHeader page={"grill"} style={"second-page-header-right-side-solde-wintak"} />
                    </div>
                    <div className="WinTak-Points-Value-Grid">
                        <span>Grille de valeurs des points WinTak</span>
                        <Grid container className={classes.gridContainer} >
                            <GridList cellHeight={0} className={classes.gridList} cols={2} spacing={50}>
                                {points.pointsTaktak.map((point) => (
                                    <Grid item xs={6}>
                                        <div className="contentGrill" style={{height: 40}} >
                                            <i className={point.icon} />
                                            <span className="grid-items-content">{point.description}</span>
                                            <span className="three-wintak"> {point.points} WinTak </span>
                                        </div>
                                    </Grid>
                                ))}
                            </GridList>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

GrilleDeValeurs.propTypes = { }

export default withStyles(styles)(GrilleDeValeurs)
