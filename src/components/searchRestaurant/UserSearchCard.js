import React from 'react';
import ReactStars from 'react-rating-stars-component';
import Slider from 'infinite-react-carousel';

function UserSearchCard(props) {
  const {result} = props;
  const foodistlists = [
    {
        name: "Mustafa Jeddou",
        location: "Marsa, Tunis",
        avatar: "../assets/img/Ellipse 31.png"
    },
    {
        name: "Rafika Bella",
        location: "Monastir",
        avatar: "../assets/img/Ellipse 379.png"
    },
    {
        name: "Mayar Zini",
        location: "Marsa",
        avatar: "../assets/img/Ellipse 378.png"
    },
    {
        name: "Khadia",
        location: "Sousse",
        avatar: "../assets/img/Ellipse 383.png"
    }
];

  const settings =  {
    slidesPerRow: 3,
    centerMode: true,
    dots: false
  };

  const items = foodistlists.map((el) => (
    <div className="users-sugg">
        <img className="userCard-img" src={el.avatar} />
        <span className="userCard-name">{el.name}</span>
    </div>
  ));

    return (
        <Slider { ...settings }>
            {items}
        </Slider>
    )
}

export default UserSearchCard
