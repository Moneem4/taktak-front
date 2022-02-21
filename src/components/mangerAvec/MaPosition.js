import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Map from '../map/App';

const styles = (theme) => ({
    
});

function MaPosition(props) {
    const {classes, setPlace} = props;
    const {} = useContext(UiContext);

    return (
        <div className="cover-picture">
            <img src="assets/img/eat-with-str-cover-pic.png" />
            
            <div className="items">
                <button> <i className="fal fa-location" /> Ma position</button>
            </div>
        </div>
    )
}

MaPosition.propTypes = { }

export default withStyles(styles)(MaPosition)