import React, {useState, useContext} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    gridContainer: {
        justify: 'space-between',
        alignContent: 'space-between',
        height: 110,
        marginTop: 10
    },
    gridList: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
    },
});

function Foodlists(props) {
    const {classes, restaurant} = props;
    const [open, setOpen] = useState(false);

    return (
        <div className="Foodists-on-site" >
            <div className="Foodists-on-site-header">
                <span className="Foodists-on-site-title" style={{ display: open ? "none" : "block" }}> Foodistes sur place</span>
                <span className="meaning-symbols" style={{ display: open ? "block" : "none" }} >Signification des symboles</span>
                <div className="question-icon"><i className="fas fa-question" 
                    onMouseEnter={() => {
                        setOpen(true);
                    }}
                    onMouseLeave={() => {
                        setOpen(false);
                    }}/>
                </div>
            </div>
            <div style={{ display: open ? "none" : "block" }}>
                <Grid container className={classes.gridContainer} >
                    <GridList cellHeight={0} className={classes.gridList} cols={2} spacing={20}>
                        {restaurant.foodlistsSurPlace.map((item) => (
                            <Grid item xs={6}>
                                <div className="Foodists-on-site-people" >
                                    <div className="foodists-on-site-active" >
                                        <img src={item.profileImage} />
                                        <div className="foodists-on-site-active-right-side">
                                            <div className="foodists-on-site-person-details">
                                                <span className="name">{item.personName}</span>
                                                <div className="number-available">
                                                    <i className="fal fa-chair" />
                                                    <span className="number"><strong>{item.placesDisponibles} places</strong> disponibles</span>
                                                </div>
                                            </div>
                                            <div className="symbol">
                                                <i className="fal fa-cookie-bite cookie" />
                                                <span>Répondre à sa demande</span>
                                                <i className="fal fa-dot-circle circle" />
                                                <i className="fal fa-comment-dots comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </GridList>
                </Grid>
            </div>
            <div className="foodists-on-site-body-hover" style={{ display: open ? "block" : "none" }}>
                <div className="type">
                    <div className="symbol">
                        <i className="fal fa-cookie-bite cookie" />
                        <i className="fal fa-dot-circle circle" />
                    </div>
                    <span>Cercle pleine en vert signifie que cette personne accepte de partager sa table</span>
                </div>
                <div className="type">
                    <div className="symbol">
                        <i className="fal fa-cookie-bite cookie" />
                        <i className="fal fa-dot-circle dot-circle" />
                    </div>
                    <span>Cercle avec contour vert signifie que cette personne n’a pas indiquer qu’il accepte les
                      demandes de lui rejoindre sur sa table. Mais vous pouvez lui demander par messagerie directe. </span>
                </div>
            </div>
        </div>
    )
}

Foodlists.propTypes = { }

export default withStyles(styles)(Foodlists)
