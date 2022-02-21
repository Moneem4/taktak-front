import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  title: {
    fontSize: 18,
  },
  appBar: {
    borderBottom: "0.1px groove #CAD0D4",
    height: 50
  },
});

function ProfilData(props) {
  const classes = useStyles();
  const { setShowModal, profilData } = props;

  const handleClose = () => {
    setShowModal(!props.showModal);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container direction="row" className={classes.appBar}>
        <Grid item xs={9} style={{marginTop: "3%", marginLeft: "5%"}}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Achèvement du profil
          </Typography>
        </Grid>
        <Grid item xs={1} style={{marginTop: "1%"}}>
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
      <CardContent>
        <div className="list-to-dos">
            {profilData.lastName ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">
                        Nom
                    </span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">
                        Nom
                    </span>
                </div>
            }
            {profilData.firstName ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Prénom</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Prénom</span>
                </div>
            }
            {profilData.city ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Ville</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Ville</span>
                </div>
            }
            {profilData.location ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Gouvernorat</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Gouvernorat</span>
                </div>
            }
            {profilData.email ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Email</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Email</span>
                </div>
            }
            {profilData.birthDate ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Date de naissance</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Date de naissance</span>
                </div>
            }
            {profilData.phoneNumber ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Phone number</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Phone number</span>
                </div>
            }
            {profilData.avatar ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Ajouter une photo de profile</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Ajouter une photo de profile</span>
                </div>
            }
            {profilData.description ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Ajouter une description</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Ajouter une description</span>
                </div>
            }
            {profilData.favouriteDishes ?
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{color: "#ff6900", marginRight: 10}}/>
                    <span className="to-do">Plats preferes</span>
                </div>
            :
                <div className="to-do-item" style={{height: 25}}>
                    <i className="fal fa-check-circle" style={{marginRight: 10}}/>
                    <span className="to-do">Plats preferes</span>
                </div>
            }
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfilData;
