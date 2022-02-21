import React, {useContext, useEffect} from 'react';
import { RestaurantContext } from "../../../context/RestaurantContext";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from "react-router-dom";

function Followers(props) {
    const {restaurantId} = props;
    const { getRestoFollowers, restoFollowers } = useContext(RestaurantContext);

    useEffect(() => {
		getRestoFollowers(restaurantId);
	}, [props]);

    return (
        <div>
            <div className="followers">
                <h3 className="followers-title profile-title"> Liste des followers </h3>
                {restoFollowers ? (
                    <div className="followers-list">
                        <Grid
                            container
                            direction="row"
                            spacing={1}
                            style={{height: 210, overflow: 'scroll'}}
                        >
                            {restoFollowers.map((follower) => (
                                <Grid item xs={6} >
                                    <NavLink style={{margin:'0px'}} exact to={`/profile/${follower._id}`} target="_blank">
                                        <div className="one-follower">
                                            <div className="one-follower-inner">
                                                <div className="user-who-post-info-avatar">
                                                    <img src={follower.avatar} />
                                                </div>
                                                <div className="user-who-post-info-info">
                                                    <span className="user-username">{follower.firstName} {follower.lastName}</span>
                                                    <div className="user-about">
                                                        <i className="icon-marker" />
                                                        <span> {follower.location} </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : (
                    <CircularProgress />
                )}
            </div>
            <div className="soft-restaurants-footer">
                <div className="line" />
                <span>Afficher Plus</span>
                <div className="line" />
            </div>
        </div>
    )
}

Followers.propTypes = {

}

export default Followers