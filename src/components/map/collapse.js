import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './collapse.scss';

const Collapse = (props) => {
  const { data, distanceArray } = props;
  return (
    <div className='faq--container'>
      <div className={'collapse-wrapper'}>
        <ul className={'accordion-list'}>
          {data &&
            data.map((location, index) => (
              <li className='accordion-list__item' key={location.id}>
                <CollapseItem data={data} index={index} {...location} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const CollapseItem = (props) => {
  const { details, title, index, data } = props;
  const [opened, setOpened] = useState(false);

  const [mapLat, setMapLat] = useState(52.165691);
  const [mapLng, setMapLng] = useState(10.451526);
  const handleClickItem = () => {
    setOpened(!opened);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };
  const distance = getDistanceFromLatLonInKm(
    mapLat,
    mapLng,
    data[index].latitude,
    data[index].longitude
  );
  useEffect(() => {
    if (data.length === 1) {
      setOpened(true);
    }
  }, [data]);

  return (
    <div className={`accordion-item, ${opened && 'accordion-item--opened'}`}>
      <a>
        <div className={'accordion-item__line'} onClick={handleClickItem}>
          <h2 className={'accordion-item__title'}>
            {parse(title)}
            {` (${data[index].distance}KM)`}
          </h2>
          <span className={'accordion-item__icon'} />
        </div>
      </a>
      <div className={'accordion-item__inner'}>
        <div className={'accordion-item__content'}>
          <p className={'accordion-item__paragraph'}>{parse(details)}</p>
        </div>
      </div>
    </div>
  );
};

export default Collapse;
