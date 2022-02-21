import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../context/UserContext';
import Modal from "../util/UtilModal";

function AchevementProfile(props) {
    const {} = props;
    const {getProfileCompletion} = useContext(UserContext);
    const [profilData, setProfilData] = useState();
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        getProfileCompletion(setProfilData);
    }, []);

    let dataExist = 0
    let dataNotExist = 0
    if(profilData && profilData.firstName)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.lastName)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.location)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }
    
    if(profilData && profilData.city)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.email)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.birthDate)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.phoneNumber)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.avatar)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.description)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    if(profilData && profilData.favouriteDishes)
    {
        dataExist += 1 
    }else{
        dataNotExist += 1
    }

    return (
        <div className="achievement">
            <div className="achievement-avatar">
                <img src="../assets/img/avatar.png" />
            </div>
            <div className="achievement-info">
                <span className="info-title">Achèvement du profil</span>
                <div className="achievement-items">
                    {[...Array(dataExist)].map((e, i) => <span className="item filled" key={i}/>)}
                    {[...Array(dataNotExist)].map((e, i) => <span className="item" key={i}/>)}
                </div>
                <span className="steps-left-feeds">Encore {dataNotExist} étapes</span>
            </div>
            <i className="icon-small-arrow-right" onClick={() => openModal()}/>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                profilData={profilData}
                page={"profilData"}
            />
        </div>
    )
}

AchevementProfile.propTypes = { }

export default AchevementProfile