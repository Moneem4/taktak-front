import React, {useState, useContext} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
    container: {
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        height: 270,
        width: 500,
        padding: 10
    },
    inputBase: {
        color: theme.palette.common.black,
        width: '100%',
        fontSize: 14
    },
    appBar: {
        borderBottom: '0.1px groove white',
    },
});

function UpdateDescriptionResto(props) {
    const {classes, activeResto} = props;
    const {updateRestaurant} = useContext(RestaurantContext)
    const [description, setDescription] = useState(activeResto.description)
    
    const handleClose = () => {
        props.setShowModal(!props.showModal)
    }
    
    const handleChange = (event) => {
        const value = event.target.value
        setDescription(value)
    }    
    
    async function submitChange () {
        const data = {
            description: description,
        };

        await updateRestaurant(activeResto._id, data, "description");
        handleClose();
    }

    return (
        <div className={classes.container}>
            <Grid container direction="row">
                <Grid item xs={11} style={{ marginTop: 10 }}>
                    <Typography variant="h4" style={{marginBottom: 10, color: "#175db3"}}>
                        Description
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="Close" arrow>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => handleClose()}
                        >
                            <CloseIcon style={{fontSize: 20, color: "#ff6900"}}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <InputBase
                multiline
                rows={9}
                placeholder="Brief"
                className={classes.inputBase}
                value={description}
                onChange={handleChange}
            />
            <Divider />
            <Grid container direction="row" style={{marginTop: 10}}>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={submitChange}
                    >
                        Enregistrer
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(UpdateDescriptionResto)
