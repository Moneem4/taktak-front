import React, {useContext} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    gridContainer: {
        justify: 'space-between',
        alignContent: 'space-between',
        height: 130,
        marginTop: 0
    },
    gridList: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        
    },
});

function FoodistesNearby(props) {
    const {classes, restaurant} = props;

    return (
        <div className="foodists-nearby">
            <span className="title">Foodistes près de chez vous</span>
            <div className="foodists">
                <Grid container className={classes.gridContainer} >
                    <GridList cellHeight={0} className={classes.gridList} cols={2} spacing={0}>
                        {restaurant.foodlists.map((item) => (
                            <Grid item xs={6}>
                                <div className="foodist-user">
                                    <img src={item.profileImage} />
                                    <div className="details-foodist">
                                        <span className="name">{item.personName}</span>
                                        <div className="location">
                                            <i className="fal fa-map-marker-alt" />
                                            <span className="city">{item.adresse}</span>
                                        </div>
                                    </div>
                                    <div className="add-social">
                                        <i className="fal fa-user-plus" />
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </GridList>
                </Grid>
            </div>
        </div>
    )
}

FoodistesNearby.propTypes = { }

export default withStyles(styles)(FoodistesNearby)