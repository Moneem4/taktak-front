import React,{useState} from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Grid from "@material-ui/core/Grid";
import Modal from '../../util/UtilModal';
import client from '../../../apollo/client';
import {UPDATE_USER} from "../../../graphql/auth/mutations";
import { useContext } from 'react';
import { UiContext } from '../../../context/UiContext';
import { UserContext } from '../../../context/UserContext';

function Personal(props) {
  const {selectedUser, isntme} = props;
  const {setActiveUser} = useContext(UserContext);
  const [showBirthDate, setShowBirthDate] = useState(selectedUser.birthDateDisplay);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
      setShowModal(true);
  };

  async function handleShow () {

    setShowBirthDate(!showBirthDate);

    const data = {
      birthDateDisplay: !showBirthDate,
    };
    
    await client
      .mutate({
        mutation: UPDATE_USER,
        variables: {
            id: selectedUser.userId,
            input: data,
        },
      })
      .then(async (res) => {
        console.log(res)
        setActiveUser((user) => {
            return {
              ...user,
              birthDateDisplay: !showBirthDate,
            };
        })
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })
    }
    
    return (
        <div className="personal-information profile-section">
        <h3 className="personal-information-title profile-title">
          Informations personnelles
        </h3>
        <div className="personal-information-body">
          <div className="info-item">
            <span className="info-label">Date de naissance</span>
            <Grid container direction="row">
              <Grid item xs={2}></Grid>
              <Grid item xs={9}>
                <span className="info-value" style={{ display: showBirthDate ? "none" : "block" }}>{selectedUser.birthDate}</span>
              </Grid>
              <Grid item xs={1} style={{ display: isntme ? "none" : "block" }}>
                <span className="property" onClick={handleShow}>{showBirthDate? < VisibilityIcon fontSize="large" style={{ color: "#ff6900" }}/> : < VisibilityOffIcon fontSize="large" style={{ color: "#ff6900" }} />}</span>
              </Grid>
            </Grid>
          </div>
          <div className="info-item">
            <span className="info-label">Pays</span>
            <span className="info-value">{selectedUser.location}</span>
            <span className="property" onClick={() => openModal()} style={{ display: isntme ? "none" : "block" }}>Changer</span>
          </div>
          <div className="info-item">
            <span className="info-label">Gouvernorat</span>
            <span className="info-value">{selectedUser.city}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Langues</span>
            {selectedUser.languages ? (
            <span className="info-value">{selectedUser.languages.map(el => (`${el}/`))}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="info-item">
            <span className="info-label">E-mail</span>
            <span className="info-value">{selectedUser.local.email}</span>

          </div>
          <div className="info-item">
            <span className="info-label">Phone</span>
            <span className="info-value">{selectedUser.phoneNumber}</span>
          </div>
        </div>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          page="updatePersonalInfos"
          user={props.selectedUser}
        />
      </div>

    )
}

Personal.propTypes = {

}

export default Personal

