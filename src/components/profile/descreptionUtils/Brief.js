import React, {useState} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Modal from '../../util/UtilModal';

function Brief(props) {
  const {selectedUser, isntme} = props;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

    return (
        <div className="brief profile-section">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="baseline"
          style={{marginBottom: 10}}
        >
          <Grid item xs={10} >
            <h3 className="brief-title profile-title">En Bref</h3>
          </Grid>
          <Grid item xs={1}>
            {/*<IconButton edge="end" color="inherit" aria-label="menu" style={{marginTop: -20}} onClick={() => openModal()} style={{ display: isntme ? "none" : "block" }}>
              <EditIcon style={{fontSize: 20, color: "#ff6900"}} />
            </IconButton>*/}
          </Grid>
        </Grid>
        <p>
          {selectedUser.description}
        </p>
        {/*<Modal
          showModal={showModal}
          setShowModal={setShowModal}
          page="brief"
          activeUser={selectedUser}
        />*/}
      </div>
    )
}

export default Brief

