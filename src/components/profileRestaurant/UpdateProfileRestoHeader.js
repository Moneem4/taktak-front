import React, {useState, useContext} from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
  
const styles = (theme) => ({
    container: {
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        height: 390,
        width: 550,
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
    labelTitle: {
        fontSize: '1.4rem',
        textAlign: 'left',
        marginLeft: '1vw',
        width: '-webkit-fill-available',
        fontWeight: 'bold',
        color: '#ff6900',
    },
    textField: {
        color: "#484848",
        height: '5ch',
        backgroundColor: 'white',
        width: '100%',
        fontSize: 13,
        textAlign: 'start',
        border: "0.1px groove darkgrey",
        borderRadius: '3px',
        paddingLeft: 12,
    },
    selectCountry: {
        width: '100%',
        height: '5ch',
        backgroundColor: "white",
        color: "black",
        fontSize: 13,
        textAlign: 'start',
        border: "0.1px groove darkgrey",
        borderRadius: '3px',
        paddingLeft: 12,
    },
});

const topTags = [
    { tag: 'Food'},
    { tag: 'Foodies'},
    { tag: 'Foodist'},
    { tag: 'Pizza'},
    { tag: 'Yummy'}
]

function UpdateProfileRestoHeader(props) {
    const {classes, activeResto} = props;
    const {updateRestaurant, setRestaurant} = useContext(RestaurantContext);

    const [restoState, setRestoState] = useState({
        name: activeResto.name,
        country: activeResto.country,
        city: activeResto.city,
        address: activeResto.address,
        tags: []
    })
    
    const handleClose = () => {
        props.setShowModal(!props.showModal)
    }
    
    const handleChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        setRestoState({...restoState, [field]: value });
    }    
    
    const handleTagsChange = (event, value) => {    
        setRestoState({ ...restoState, tags: value })
    };

    async function submitChange () {
        var tagsList = restoState.tags.map( e  => e.tag);

        const data = { 
            name: restoState.name,
            location: restoState.city,
            country: restoState.country,
            address: restoState.address,
            tags: tagsList,
        };
        
        await updateRestaurant(activeResto._id, data, "header", setRestaurant);
        handleClose()
    }
    
    const selectCountry = (val) => {
        setRestoState({ ...restoState, country: val })
    }
    
    const selectCity = (val) => {
        setRestoState({ ...restoState, city: val })
    }

    return (
        <div className={classes.container}>
            <Grid container direction="row">
                <Grid item xs={11}>
                    <Typography variant="h4" style={{color: "#175db3"}}>
                        Profile Restaurant
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="Close" arrow>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => handleClose()}
                            style={{marginTop: -10}}
                        >
                            <CloseIcon style={{fontSize: 20, color: "#ff6900"}}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <Grid container direction="row" style={{marginTop: 20}}>
                <Grid item xs={3}>
                    {activeResto.avatar ? (
                        <img src={activeResto.avatar} alt="avatar" style={{borderRadius:20}} />
                    ) : (
                        <img src="https://picsum.photos/100/100.jpg" alt="avatar" style={{borderRadius:20}} />
                    )}
                </Grid>
                <Grid item xs={9}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                        style={{marginBottom: 10}}
                    >
                        <Grid item xs={3} className={classes.labelTitle}>
                            Nom Restaurant
                        </Grid>
                        <Grid item xs={8}>
                            <InputBase
                                className= {classes.textField}
                                onChange={handleChange}
                                value={restoState.name}
                                name={'name'}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                    >
                        <Grid item xs={3} className={classes.labelTitle}>
                            Pays
                        </Grid>
                        <Grid item xs={8}>
                            <CountryDropdown
                                defaultOptionLabel="Choisir pays..."
                                value={restoState.country}
                                name={'country'}
                                onChange={selectCountry}
                                className={classes.selectCountry}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                    >
                        <Grid item xs={3} className={classes.labelTitle}>
                            Region
                        </Grid>
                        <Grid item xs={8}>
                        <RegionDropdown
                            blankOptionLabel="No country selected..."
                            defaultOptionLabel="Now select a region..."
                            country={restoState.country}
                            value={restoState.city}
                            name={'city'}
                            onChange={selectCity}
                            className={classes.selectCountry}
                        />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                        style={{marginBottom: 10}}
                    >
                        <Grid item xs={3} className={classes.labelTitle}>
                            Address
                        </Grid>
                        <Grid item xs={8}>
                            <InputBase
                                className= {classes.textField}
                                onChange={handleChange}
                                value={restoState.address}
                                name={'address'}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="baseline"
                        style={{marginBottom: 10}}
                    >
                        <Grid item xs={3} className={classes.labelTitle}>
                            Tags
                        </Grid>
                        <Grid item xs={8} style={{height: 70, overflow: "scroll"}}>
                            <Autocomplete
                                multiple
                                limitTags={1}
                                id="multiple-limit-tags"
                                options={topTags}
                                getOptionLabel={(option) => option.tag}
                                onChange={(event, value) => handleTagsChange(event, value)}
                                name={"tags"}
                                renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Tags" placeholder="Tags" Style={{fontSize: 14}}/>
                                )}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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

export default withStyles(styles)(UpdateProfileRestoHeader)
