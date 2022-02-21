import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../../context/UiContext";
import { UserContext } from "../../../context/UserContext";
import { RestaurantContext } from "../../../context/RestaurantContext";
import withStyles from "@material-ui/core/styles/withStyles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Modal from "../../util/UtilModal";
import Slider from "infinite-react-carousel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { us, useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";

import chief from '../../autourDeMoi/chief.svg'

const styles = (theme) => ({
  styleClicked: {
    border: "1px solid #d40562",
    borderRadius: 5,
    //width: '95%'
  },
  styleUnClicked: {
    border: "1px solid #ffffff",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  selectCountry: {
    width: "100%",
    height: "5ch",
    backgroundColor: "white",
    color: "#484848",
    fontSize: 13,
    textAlign: "start",
    border: "0.1px groove #e8e8e8",
    borderRadius: "3px",
    paddingLeft: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 670,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
});

const cuisines = [
  "American",
  "Chinese",
  "French",
  "Greek",
  "Indian",
  "Italian",
  "Japanese",
  "Korean",
  "Mediterranean",
  "Mexican",
  "Spanish",
  "Syrian",
  "Thai",
  "Tunisian",
  "Turkish",
];

const servicesItems = [
  "OUTDOOR_SEATING",
  "FAMILY_FRIENDLY",
  "KIDS_FRIENDLY",
  "LGBTQ_FRIENDLY",
  "LARGE_GATHERING",
  "WHEELCHAIR_ACCESSIBLE",
  "HAS_TV",
  "PET_FRIENDLY",
  "LIVE_MUSIC",
  "PARKING",
  "LIVE_FOOTBALL_GAMES",
  "SMOKING_AREA",
  "NO_SMOKING",
  "MINDFUL_DINING",
  "BEERS_AND_WINE",
  "HAPPY_HOUR",
  "FREE_WIFI",
  "GOOD_FOR_ANNIVERSARIES",
  "GOOD_FOR_BIRTHDAYS",
  "ROMANTIC",
  "PANORAMIC_VIEW",
  "PRIVATE_DINING",
  "BUSINESS_MEETINGS",
];

const topTags = [
  { tag: "Food" },
  { tag: "Foodies" },
  { tag: "Foodist" },
  { tag: "Pizza" },
  { tag: "Yummy" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CreateRestaurant(props) {
  const { classes } = props;
  const history = useHistory()
  const { activeUser } = useContext(UserContext);
  const { profileRestaurant, setProfileRestaurant, createRestaurant } = useContext(RestaurantContext);
  const [showModal, setShowModal] = useState(false);
  const [servicesName, setServicesName] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [uploadedBackImage, setUploadedBackImage] = useState(null);
  const [showBackImage, setShowBackImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const [checked, setChecked] = useState({
    mode1: false,
    mode2: false,
    mode3: false,
    mode4: false,
  });

  const [servicesClicked, setServicesClicked] = useState({
    OUTDOOR_SEATING: false,
    FAMILY_FRIENDLY: false,
    KIDS_FRIENDLY: false,
    LGBTQ_FRIENDLY: false,
    LARGE_GATHERING: false,
    WHEELCHAIR_ACCESSIBLE: false,
    HAS_TV: false,
    PET_FRIENDLY: false,
    LIVE_MUSIC: false,
    PARKING: false,
    LIVE_FOOTBALL_GAMES: false,
    SMOKING_AREA: false,
    NO_SMOKING: false,
    MINDFUL_DINING: false,
    BEERS_AND_WINE: false,
    HAPPY_HOUR: false,
    FREE_WIFI: false,
    GOOD_FOR_ANNIVERSARIES: false,
    GOOD_FOR_BIRTHDAYS: false,
    ROMANTIC: false,
    PANORAMIC_VIEW: false,
    PRIVATE_DINING: false,
    BUSINESS_MEETINGS: false,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setProfileRestaurant({ ...profileRestaurant, [field]: value });
  };

  const handleTagsChange = (event, value) => {
    setProfileRestaurant({ ...profileRestaurant, tags: value });
  };

  const handleClickChange = (value) => {
    setServicesClicked({
      ...servicesClicked,
      [value]: !servicesClicked[value],
    });

    if (!servicesClicked[value] === true) {
      setProfileRestaurant((prevProfileRestaurant) => {
        let items = { ...prevProfileRestaurant };

        let services = [...items.services, value];

        let updatedServices = { ...prevProfileRestaurant, services: services };

        return updatedServices;
      });
    } else {
      setProfileRestaurant((prevProfileRestaurant) => {
        let items = { ...prevProfileRestaurant };
        let services = [...items.services];

        const indexService = services.findIndex((el) => el.service === value);

        services.splice(indexService, 1);

        return { ...prevProfileRestaurant, services: services };
      });
    }
  };

  const handleCheckChange = () => {
    setProfileRestaurant({
      ...profileRestaurant,
      accordTaktak: !profileRestaurant.accordTaktak,
    });
  };

  const handlePayementChange = (value, e) => {
    setChecked({ ...checked, [value]: e.target.checked });

    if (!checked[value] === true) {
      setProfileRestaurant((prevProfileRestaurant) => {
        let items = { ...prevProfileRestaurant };

        let modes = [...items.payment, value];

        let updatedMode = { ...prevProfileRestaurant, payment: modes };

        return updatedMode;
      });
    } else {
      setProfileRestaurant((prevProfileRestaurant) => {
        let items = { ...prevProfileRestaurant };
        let modes = [...items.payment];

        const indexMode = modes.findIndex((el) => el.mode === value);

        modes.splice(indexMode, 1);

        return { ...prevProfileRestaurant, payment: modes };
      });
    }
  };

  const handleCuisinesChange = (event, value) => {
    setProfileRestaurant({ ...profileRestaurant, specialty: value });
  };

  const selectCountry = (val) => {
    setProfileRestaurant({ ...profileRestaurant, country: val });
  };

  const selectCity = (val) => {
    setProfileRestaurant({ ...profileRestaurant, location: val });
  };

  const handleServicesChange = (event) => {
    setServicesName(event.target.value);
  };

  const handleAddPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImageChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      setProfileRestaurant({ ...profileRestaurant, avatar: img });
      setUploadedImage(URL.createObjectURL(img));
      setShowImage(true);
    }
  };

  const handleAddBackPicture = () => {
    const fileInput = document.getElementById("backImageInput");
    fileInput.click();
  };

  const handleBackImageChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      setProfileRestaurant({ ...profileRestaurant, backgroundImage: img });
      setUploadedBackImage(URL.createObjectURL(img));
      setShowBackImage(true);
    }
  };

const [restaurantId, setRestaurantId] = useState(null)
const submitRestaurant = () => {
    setLoading(true)

    var tagsList = profileRestaurant.tags.map((e) => e.tag);

    const data = {
      userId: activeUser.userId,
      name: profileRestaurant.name,
      phone: profileRestaurant.phone,
      description: profileRestaurant.description,
      address: profileRestaurant.address,
      location: profileRestaurant.location,
      country: profileRestaurant.country,
      tags: tagsList,
      services: servicesName,
      openingTime: profileRestaurant.openingTime,
      specialty: profileRestaurant.specialty,
      averageCost: profileRestaurant.averageCost,
      payment: profileRestaurant.payment,
      accordTaktak: profileRestaurant.accordTaktak,
      avatar: profileRestaurant.avatar,
      backgroundImage: profileRestaurant.backgroundImage,
    };
    
    createRestaurant(data,setRestaurantId,setLoading);

    setProfileRestaurant((prevProfileRestaurant) => {
      return {
        ...prevProfileRestaurant,
        profileImage: "https://picsum.photos/100/100.jpg",
        backgroundImage: "https://picsum.photos/100/100.jpg",
        name: "",
        phone: "",
        description: "",
        address: "",
        location: "",
        tags: [],
        services: [],
        openingTime: {
          timeFrom: new Date(),
          timeTo: new Date(),
          days: [],
        },
        specialty: [],
        averageCost: "",
        payment: [],
        accordTaktak: false,
      };
    });

    setChecked((prevChecked) => {
      return {
        ...prevChecked,
        CASH: false,
        BANK_CARD: false,
        CHECK: false,
        TAKTAK_POINTS: false,
        RESTAURANT_TICKET: false,
      };
    });

};

useEffect(() => {
  restaurantId && history.push(`/profileRestaurant/${restaurantId}`)
}, [restaurantId])

  let timeFrom =
    profileRestaurant.openingTime.timeFrom.getHours() +
    ":" +
    profileRestaurant.openingTime.timeFrom.getMinutes();
  let timeTo =
    profileRestaurant.openingTime.timeTo.getHours() +
    ":" +
    profileRestaurant.openingTime.timeTo.getMinutes();

  const servicesList = (
    <FormControl
      className={classes.formControl}
      style={{ marginTop: -30, marginLeft: 20 }}
    >
      <InputLabel id="demo-mutiple-chip-label">Services</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={servicesName}
        onChange={handleServicesChange}
        name={"services"}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {servicesItems.map((service) => (
          <MenuItem key={service} value={service}>
            <Checkbox checked={servicesName.indexOf(service) > -1} />
            <ListItemText primary={service} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div>
    {loading ? 
      <div id="loading" className="autour-de-moi-loading">
        <div className="loading-inner">
          <div>
            <CircularProgress
              className="chief"
              size={300}
              thickness={1.6}
              style={{ color: "#ff6900" }}
            />{" "}
            <img className="chief" src={chief} />
          </div>
        </div>
        <div className="loading-info">
          <span>Momtéééz!</span>
          <p>Veuillez patientez pendant la création de votre Restaurant</p>
        </div>
      </div>
    :  
    <div className="create-profile-restaurant" style={{ marginBottom: 50 }}>
      <span className="title-header">Créer un nouveau restaurant</span>
      <div className="add-picture-media">
        <div style={{ display: showImage ? "none" : "block" }}>
          <div className="profile-picture">
            <i className="fal fa-portrait" style={{marginRight: "15%"}}/>
            <span id="dropzone3" style={{marginTop: "25%"}}>
              Glissez directement votre photo de profile
            </span>
            <span className="here3" onClick={() => handleAddPicture()}>
              Parcourir mes photos
            </span>
          </div>
        </div>
        <div
          className="profile-picture"
          style={{ display: showImage ? "block" : "none" }}
        >
          <img
            src={uploadedImage}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div style={{ display: showBackImage ? "none" : "block" }}>
          <div className="cover-picture">
            <i className="fal fa-image" />
            <span id="dropzone4">
              Glissez directement votre photo de couverture
            </span>
            <span className="here" onClick={() => handleAddBackPicture()}>
              Parcourir mes photos
            </span>
          </div>
        </div>
        <div
          className="profile-picture"
          style={{ display: showBackImage ? "block" : "none" }}
        >
          <img
            src={uploadedBackImage}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <input
          type="file"
          id="imageInput"
          onChange={handleImageChange}
          hidden="hidden"
          accept="image/*"
        />
        <input
          type="file"
          id="backImageInput"
          onChange={handleBackImageChange}
          hidden="hidden"
          accept="image/*"
        />
      </div>
      <div className="instruction-media">
        <span className="instruction-pict-profile">
          Photo ne doit pas dépasser 500 ko Formats acceptées: .jpeg .gif .png
        </span>
        <span className="instruction-pict-cover">
          Photo ne doit pas dépasser 1 Mo. Format idéal
          <strong> 1366x280</strong>
          Formats acceptées: .jpeg .gif .png
        </span>
      </div>
      <div className="restaurant-informations">
        <div className="basic-information">
          <input
            type="text"
            placeholder="Nom restaurant"
            name="name"
            value={profileRestaurant.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="N° Téléphone"
            name="phone"
            value={profileRestaurant.phone}
            onChange={handleChange}
          />
        </div>
        <div className="detailed-information">
          <CountryDropdown
            defaultOptionLabel="Choisir pays..."
            value={profileRestaurant.country}
            name={"country"}
            onChange={selectCountry}
            className={classes.selectCountry}
          />
          <RegionDropdown
            blankOptionLabel="Aucun pays sélectionné..."
            defaultOptionLabel="Maintenant, sélectionnez une région..."
            country={profileRestaurant.country}
            value={profileRestaurant.location}
            name={"location"}
            onChange={selectCity}
            className={classes.selectCountry}
          />
          <input
            type="text"
            placeholder="Adresse"
            name="address"
            onChange={handleChange}
            value={profileRestaurant.address}
          />
        </div>
        <div className="details-information">
          <input
            type="text"
            placeholder="Description"
            className="description"
            name="description"
            value={profileRestaurant.description}
            onChange={handleChange}
          />
          <Autocomplete
            multiple
            limitTags={1}
            id="multiple-limit-tags"
            options={topTags}
            getOptionLabel={(option) => option.tag}
            onChange={(event, value) => handleTagsChange(event, value)}
            name={"tags"}
            value={profileRestaurant.tags}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                placeholder="Tags"
              />
            )}
          />
        </div>
        <div className="services" style={{ marginTop: 40 }}>
          <span>Sélectionner les services existants</span>
          {servicesList}
        </div>
        <div className="detailed-information">
          <div className="input-item">
            <i
              className="fal fa-calendar-alt calendar-ion"
              onClick={() => openModal()}
            />
            <input
              type="text"
              placeholder="Horaires d’ouverture"
              value={"From  " + timeFrom + "  To  " + timeTo}
            />
          </div>
          <Autocomplete
            multiple
            limitTags={1}
            id="multiple-limit-tags"
            options={cuisines}
            getOptionLabel={(option) => option}
            onChange={(event, value) => handleCuisinesChange(event, value)}
            name={"specialty"}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Cuisine"
                placeholder="Cuisines"
                Style={{ fontSize: 14 }}
              />
            )}
            style={{ marginLeft: 10, height: 70, overflow: "scroll" }}
          />
          <input
            type="text"
            placeholder="Coût moyen en DT"
            name="averageCost"
            onChange={handleChange}
            value={profileRestaurant.averageCost}
          />
        </div>
        <div className="payment-method">
          <span>Moyen de payement</span>
          <div className="mode-of-payment">
            <span>Espèce</span>
            <label className="switch">
              <input
                type="checkbox"
                className="checkbox"
                checked={checked.CASH}
                onClick={(e) => handlePayementChange("CASH", e)}
              />
              <span className="slider round" />
            </label>
          </div>
          <div className="mode-of-payment">
            <span>Carte bancaire</span>
            <label className="switch">
              <input
                type="checkbox"
                className="checkbox"
                checked={checked.BANK_CARD}
                onClick={(e) => handlePayementChange("BANK_CARD", e)}
              />
              <span className="slider round" />
            </label>
          </div>
          <div className="mode-of-payment">
            <span>Chèque</span>
            <label className="switch">
              <input
                type="checkbox"
                className="checkbox"
                checked={checked.CHECK}
                onClick={(e) => handlePayementChange("CHECK", e)}
              />
              <span className="slider round" />
            </label>
          </div>
          <div className="mode-of-payment">
            <span>Meal Voucher</span>
            <label className="switch">
              <input
                type="checkbox"
                className="checkbox"
                checked={checked.TAKTAK_POINTS}
                onClick={(e) => handlePayementChange("TAKTAK_POINTS", e)}
              />
              <span className="slider round" />
            </label>
          </div>
          <div className="mode-of-payment">
            <span>Ticket Restaurant</span>
            <label className="switch">
              <input
                type="checkbox"
                className="checkbox"
                checked={checked.RESTAURANT_TICKET}
                onClick={(e) => handlePayementChange("RESTAURANT_TICKET", e)}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <div className="create-restaurant-bottom">
          <div>
            <input
              className="checkbox"
              type="checkbox"
              id="checkbox-1"
              name="accordTaktak"
              onChange={handleCheckChange}
            />
            <label htmlFor="checkbox-1" />
            <span>
              J’accorde à TakTak les droits de publier mes données personnelles
              sur la plateforme
            </span>
          </div>
          <button onClick={submitRestaurant}>Confirmer</button>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        page="horaireOuverture"
      />
    </div>
  }
 </div>
  );
}

export default withStyles(styles)(CreateRestaurant);
