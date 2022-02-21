import React from "react";
import QRCode from "react-weblineindia-qrcode-generator";

function RestaurantQRCode(props) {
  const { classes, restaurant } = props;
  
  return (
    <div className="tabs-panel is-active" id="panel4">
        
        <div className="qrCode" style={{ width: "42%", marginBottom: 10 }}>
            <QRCode
                level="Q"
                style={{ width: 50 }}
                value={JSON.stringify({
                    name: restaurant.name,
                    menu: `/profileRestaurant/` + restaurant._id + `/menu`
                })}
            />
        </div>
    </div>
  );
}

export default RestaurantQRCode;
