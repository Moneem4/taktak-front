import React from 'react';

function VenusItemCard(props) {
    const {item} = props;

    return (
        <div className="profil-visitor" >
            <div className="visitor">
                <div className="visitor-avatar">
                    <img src={item.profileImage} />
                </div>
                <div className="visitor-info">
                    <span className="user-username">{item.name}</span>
                    <div className="user-about">
                        <i
                          className="fal fa-map-marker-alt"
                          aria-hidden="true"
                        />
                        <span> {item.resto} </span>
                    </div>
                </div>
            </div>
            {/* <div className="follow-button" style={{width : "4rem",float:"top"}}>
                <i className="icon-add-friend" />
            </div> */}
            <div style={{
              cursor: 'pointer',
              background: "#ffa500",
              color: "white",
              padding: "0 1rem",
              height: "4rem",
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'}} >
            <i className="icon-add-friend" />
            </div>
           
        </div>
    )
}

VenusItemCard.propTypes = { }

export default VenusItemCard