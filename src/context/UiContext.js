import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  POST_SIGNUP,
  POST_SIGNIN,
  LOAD_ME,
  FORGOT_PASSWORD,
  VERIFY_EMAIL,
  RESET_PASSWORD,
} from "../graphql/auth/mutations";

import client from "../apollo/client";
import { GET_USER } from "../graphql/user/user";

const UiContext = React.createContext();

function UiContextProvider({ children }) {
  const [openModalPost, setOpenModalPost] = useState(false);

  const [contentInPostModal, setContentInPostModal] = useState([
    /*"https://picsum.photos/200/300",
    "https://picsum.photos/100/300",
    "../assets/img/image1.png",*/
  ]);
  const [indexOfClickedElement, setIndexOfClickedElement] = useState(0);

  const handleOpenPostModal = (e, relatedPosts, src) => {
    //var arr2 = content.map( e  => e.item);

    setOpenModalPost(true);
    setContentInPostModal(relatedPosts);

    //let a = arr2.indexOf(e.target.src);

    // var index = getIndex(getUrlFromPath(), posts, 'idPost');

    //setIndexOfClickedElement(a);
  };
  const handleClosePostModal = () => {
    setOpenModalPost(false);
    console.log("modal close", { openModalPost });
  };

  const [signUpPageNumber, setSignUpPageNumber] = useState(1);

  const [conversationListOpen, setConversationListOpen] = useState(false);
  const [conversationsLoaded, setConversationsLoaded] = useState([
    { isOpen: false, user: { name: "", profileImage: "" }, conversationId: "" },
    { isOpen: false, user: { name: "", profileImage: "" }, conversationId: "" },
    { isOpen: false, user: { name: "", profileImage: "" }, conversationId: "" },
  ]);
  
  function loadConversations(id) {
    if (
      conversationsLoaded[0].isOpen === false &&
      conversationsLoaded[1].isOpen === false &&
      conversationsLoaded[2].isOpen === false
    ) {
      setConversationsLoaded((prev) => [
        { isOpen: true, user: { name: "", profileImage: "" }, conversationId: id },
        prev[1],
        prev[2],
      ]);
      console.log("all false");
    } else if (
      conversationsLoaded[0].isOpen === true &&
      conversationsLoaded[1].isOpen === true &&
      conversationsLoaded[2].isOpen === true
    ) {
      setConversationsLoaded((prev) => [
        { isOpen: true, user: { name: "", profileImage: "" }, conversationId: id },
        prev[1],
        prev[2],
      ]);
    } else if (
      conversationsLoaded[0].isOpen === true &&
      conversationsLoaded[1].isOpen === false
    ) {
      setConversationsLoaded((prev) => [
        prev[0],
        { isOpen: true, user: { name: "", profileImage: "" }, conversationId: id },
        prev[2],
      ]);
    } else if (
      conversationsLoaded[0].isOpen === true &&
      conversationsLoaded[1].isOpen === true &&
      conversationsLoaded[2].isOpen === false
    ) {
      setConversationsLoaded((prev) => [
        prev[0],
        prev[1],
        { isOpen: true, user: { name: "", profileImage: "" }, conversationId: id },
      ]);
    }
  }

  function closeChatBox(index, e) {
    const tab = conversationsLoaded;
    tab[index] = { isOpen: false, user: { name: "", profileImage: "" } };
    setConversationsLoaded([tab[0], tab[1], tab[2]]);
  }

  const [conversationHover, setConversationHover] = useState(false);

  const [posts, setPosts] = useState([
    {
      idPost: "1",
      //picture: "../assets/img/Rectangle 3171.png",
      picture: "../assets/img/image3.jpg",
      userName: "Salma Mustafa",
      address: "Marsa, Tunis",
      title: "Lorem ipsum dolor sit amet, consect etur adipiscing elit1.",
      description:
        "Mauris placerat mi ac eros mollis, sit amet porta leo scelerisque. Fusce sagittis pulvinar lorem, vitae tempus dolor aliquet vel. Duis tempus metus nec velit sodales, quis accumsan velit sodales. Nunc sodales bibendum mattis. Mauris porttitor cursus dui ut ultricies.",
      date: "12 janvier 2020",
      participants: [
        {
          id: 1,
          firstName: "Sarah",
          lastName: "Walker",
          profileImageUrl: "../assets/img/Ellipse 379.png",
        },
        {
          id: 2,
          firstName: "Mike",
          lastName: "Bernard",
          profileImageUrl: "../assets/img/Ellipse 382.png",
        },
        {
          id: 3,
          firstName: "Moez",
          lastName: "Ben Salah",
          profileImageUrl: "./assets/img/svg/Ellipse 380.png",
        },
      ],
      likes: 33,
      comments: 32,
    },
    {
      idPost: "2",
      picture: "../assets/img/Rectangle 3171.png",
      userName: "Ahmed Salah",
      address: "Marsa, Tunis",
      title: "Lorem ipsum dolor sit amet, consect etur adipiscing elit2.",
      description:
        "Mauris placerat mi ac eros mollis, sit amet porta leo scelerisque. Fusce sagittis pulvinar lorem, vitae tempus dolor aliquet vel. Duis tempus metus nec velit sodales, quis accumsan velit sodales. Nunc sodales bibendum mattis. Mauris porttitor cursus dui ut ultricies.",
      date: "14 janvier 2020",
      participants: [
        {
          id: 1,
          firstName: "Sarah",
          lastName: "Walker",
          profileImageUrl: "../assets/img/Ellipse 379.png",
        },
        {
          id: 2,
          firstName: "Mike",
          lastName: "Bernard",
          profileImageUrl: "../assets/img/Ellipse 382.png",
        },
        {
          id: 3,
          firstName: "Moez",
          lastName: "Ben Salah",
          profileImageUrl: "./assets/img/svg/Ellipse 380.png",
        },
      ],
      likes: 33,
      comments: 32,
    },
  ]);

  function getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  const [menu, setMenu] = useState(0);

  const [myReservation, setMyReservation] = useState({
    id: 3,
    nbrPersonne: 0,
    date: new Date(),
    heure: "8:00",
    promo: 0,
    menu: {},
    payment: "",
    note: "",
    confirmer: false,
  });

  const notifications = [
    {
      id: 1,
      nameNotif: "test",
      userName: "Mongi",
      profileImage: "../assets/img/avatar.png",
      date: "2 heures",
      type: "poste",
      posteImage: "../assets/img/image1.png",
      postDescription:
        "Proin sit amet ipsum eget ante venenatis posuere. Maecenas diam risus, accumsan at facilisis sit amet, eleifend et arcu. Nam viverra pharetra conm dui",
      postLikes: "198",
      postComments: "4",
      participants: [
        {
          id: 1,
          name: "Souhayb Mestiri",
          profilePicture: "../assets/img/Ellipse 381.png",
        },
        {
          id: 2,
          name: "Joe Doe",
          profilePicture: "../assets/img/Ellipse 381.png",
        },
        {
          id: 3,
          name: "Alex Sharp",
          profilePicture: "../assets/img/Ellipse 382.png",
        },
        {
          id: 4,
          name: "Sarah Walker",
          profilePicture: "../assets/img/Ellipse 383.png",
        },
      ],
    },
    {
      id: 2,
      userName: "Souhayb Mestiri",
      profileImage: "../assets/img/avatar.png",
      date: "2 heures",
      type: "invitation",
    },
    {
      id: 3,
      userName: "Souhayb Mestiri",
      date: "2 heures",
      type: "maj",
      description: "Politique de Confidentialité",
    },
    {
      id: 4,
      restoName: "Kindel Resto",
      restoImage: "../assets/img/avatar.png",
      date: "2 heures",
      type: "commentaire",
      commentaire:
        "Proin sit amet ipsum eget ante venenatis posuere. Maecenas diam risus, accumsan at facilisis sit amet, eleifend et arcu. Nam viverra pharetra conm dui",
    },
    {
      id: 5,
      userName: "TakTak",
      date: "2 heures",
      type: "inviter",
      description: "100 WinTak",
    },
    {
      id: 6,
      userName: "TakTak",
      date: "2 heures",
      type: "recherche",
      description: "3",
      users: [
        {
          id: 1,
          name: "Joe Doe",
          profilePicture: "../assets/img/Ellipse 381.png",
        },
        {
          id: 2,
          name: "Alex Sharp",
          profilePicture: "../assets/img/Ellipse 382.png",
        },
        {
          id: 3,
          name: "Sarah Walker",
          profilePicture: "../assets/img/Ellipse 383.png",
        },
      ],
    },
    {
      id: 7,
      userName: "Sarah Walker",
      type: "shouaiteAnnif",
    },
    {
      id: 8,
      nameNotif: "Réservation en attente",
      restoName: "Le 12éme Sky Lounge",
      restoImage: "../assets/img/8470a85bd9b5757cf4c46d9462be7259.png",
      restoBackgroundImage:
        "../assets/img/f1eb155265680d0f5add891d7d104932.png",
      type: "reservation",
      date: "2 heures",
      time: "Lundi 12 mars 2010 / 19:00 - 21:00",
      participants: [
        {
          id: 1,
          name: "Joe Doe",
          profilePicture: "../assets/img/avatar.png",
        },
        {
          id: 2,
          name: "Alex Sharp",
          profilePicture: "../assets/img/avatar.png",
        },
        {
          id: 3,
          name: "Sarah Walker",
          profilePicture: "../assets/img/avatar.png",
        },
        {
          id: 4,
          name: "Ali Ali",
          profilePicture: "../assets/img/avatar.png",
        },
        {
          id: 5,
          name: "Souhayb Mestiri",
          profilePicture: "../assets/img/avatar.png",
        },
      ],
      payement: "Espèce",
      promo: "Aucune",
      note: "Pas à l'entrée SVP & diminuer volume TV",
    },
    {
      id: 9,
      userName: "Mongi",
      date: "2 heures",
      type: "anniversaire",
      comments: [
        {
          id: 1,
          user: "Mayar",
          userImage: "../assets/img/Ellipse 381.png",
          restoName: "Kindel Resto",
        },
        {
          id: 1,
          user: "Mayar",
          userImage: "../assets/img/Ellipse 381.png",
          restoName: "Kindel Resto",
        },
        {
          id: 1,
          user: "Mayar",
          userImage: "../assets/img/Ellipse 381.png",
          restoName: "Kindel Resto",
        },
      ],
    },
    {
      id: 10,
      user: "Mongi",
      type: "commande",
      commandes: [
        {
          id: 1,
          ref: "CM0923-11",
        },
        {
          id: 2,
          ref: "CM0923-12",
        },
      ],
    },
    {
      id: 11,
      user: "Mongi",
      date: "2 heures",
      type: "mangerAvec",
      propositions: [
        {
          id: 1,
          user: "Mayar",
          userImage: "../assets/img/Ellipse 381.png",
          restoName: "Kindel Resto",
        },
        {
          id: 1,
          user: "Mayar",
          userImage: "../assets/img/Ellipse 382.png",
          restoName: "Kindel Resto",
        },
        {
          id: 1,
          user: "Mayar",
          userImage: "../assets/img/Ellipse 383.png",
          restoName: "Kindel Resto",
        },
      ],
    },
  ];

  const [newNotifications, setNewNotifications] = useState([
    {
      id: 1,
      nameNotif: "Réservation en attente",
      restoImage: "../../assets/img/f3c1176f49594356a376e1bdff01a605.png",
      restoName: "Péroké 4 Friends",
      type: "reservation",
      adresse: "Tunis",
      cuisine: "Cuisine traditionelle",
      rate: 4,
    },
    {
      id: 2,
      nameNotif: "Manger avec inconnu",
      userProfileImage: "../../assets/img/Ellipse 378.png",
      user: "Mayar Ayouni",
      restoName: "Kindle Resto",
      type: "mangerAvec",
    },
  ]);

  const restaurants = [
    {
      id: "1",

      name: "La Badira",
      backgroundImage: "assets/img/image2.jpg",
      //picture: "../assets/img/icon-restaurant.png",
      picture: "../assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png",
      rate: 3,

      adresse: "Tunis",
      cuisine: "Cuisine traditionelle",
      promo: "40",
      visiteurs: [
        {
          id: "1",
          name: "Ahmed",
          profileImage: "assets/img/Ellipse 378.png",
        },
        {
          id: "2",
          name: "Alex Sharp",
          profileImage: "assets/img/Ellipse 379.png",
        },
        {
          id: "3",
          name: "Sarah Walker",
          profileImage: "assets/img/Ellipse 383.png",
        },
        {
          id: "4",
          name: "Mongi",
          profileImage: "assets/img/Ellipse 384.png",
        },
        {
          id: "5",
          name: "Sami",
          profileImage: "assets/img/Ellipse 384.png",
        },
        {
          id: "6",
          name: "Joe Doe",
          profileImage: "assets/img/Ellipse 380.png",
        },
        {
          id: "7",
          name: "Sami",
          profileImage: "assets/img/Ellipse 384.png",
        },
      ],
      foodlistsSurPlace: [
        {
          id: 1,
          personName: "Karim Swillah",
          profileImage: "assets/img/Ellipse 31.png",
          placesDisponibles: 1,
        },
        {
          id: 2,
          personName: "Karim Swillah",
          profileImage: "assets/img/Ellipse 31.png",
          placesDisponibles: 2,
        },
        {
          id: 3,
          personName: "Karim Swillah",
          profileImage: "assets/img/Ellipse 31.png",
          placesDisponibles: 3,
        },
        {
          id: 4,
          personName: "Karim Swillah",
          profileImage: "assets/img/Ellipse 31.png",
          placesDisponibles: 2,
        },
        {
          id: 5,
          personName: "Karim Swillah",
          profileImage: "assets/img/Ellipse 31.png",
          placesDisponibles: 5,
        },
        {
          id: 6,
          personName: "Karim Swillah",
          profileImage: "assets/img/Ellipse 31.png",
          placesDisponibles: 6,
        },
      ],
      foodlists: [
        {
          id: 1,
          personName: "salma Ayadi",
          profileImage: "assets/img/Ellipse 31.png",
          adresse: "Bardo, Tunis",
        },
        {
          id: 2,
          personName: "salma Ayadi",
          profileImage: "assets/img/Ellipse 31.png",
          adresse: "Bardo, Tunis",
        },
        {
          id: 3,
          personName: "salma Ayadi",
          profileImage: "assets/img/Ellipse 31.png",
          adresse: "Bardo, Tunis",
        },
        {
          id: 4,
          personName: "salma Ayadi",
          profileImage: "assets/img/Ellipse 31.png",
          adresse: "Bardo, Tunis",
        },
        {
          id: 5,
          personName: "salma Ayadi",
          profileImage: "assets/img/Ellipse 31.png",
          adresse: "Bardo, Tunis",
        },
        {
          id: 6,
          personName: "salma Ayadi",
          profileImage: "assets/img/Ellipse 31.png",
          adresse: "Bardo, Tunis",
        },
      ],
    },
    {
      id: "2",

      name: "Belle Restaurant",

      backgroundImage: "assets/img/image2.jpg",
      //picture: "../assets/img/icon-restaurant.png",
      picture: "../assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png",
      rate: 4,
      adresse: "Tunis",
      cuisine: "Tunis, Cuisine traditionelle",
      promo: "50%",
      visiteurs: [
        {
          id: "1",
          name: "Ahmed",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "2",
          name: "Alex Sharp",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "3",
          name: "Sarah Walker",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "4",
          name: "Mongi",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "5",
          name: "Sami",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "6",
          name: "Joe Doe",
          profileImage: "assets/img/avatar.png",
        },
      ],
    },
    {
      id: "3",
      name: "Magic Kindle 03",
      backgroundImage: "assets/img/image2.jpg",
      //picture: "../assets/img/icon-restaurant.png",
      picture: "../assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png",
      rate: 5,
      adresse: "Tunis",
      cuisine: "Cuisine traditionelle",
      promo: "30%",
      visiteurs: [
        {
          id: "1",
          name: "Ahmed",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "2",
          name: "Alex Sharp",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "3",
          name: "Sarah Walker",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "4",
          name: "Mongi",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "5",
          name: "Sami",
          profileImage: "assets/img/avatar.png",
        },
        {
          id: "6",
          name: "Joe Doe",
          profileImage: "assets/img/avatar.png",
        },
      ],
    },
  ];

  const venus = [
    {
      id: 1,
      name: "Alex 1",
      profileImage: "../assets/img/rafika-bella.png",
      resto: "Mado Café & Resto",
    },
    {
      id: 2,
      name: "Alex 2",
      profileImage: "../assets/img/rafika-bella.png",
      resto: "Mado Café & Resto",
    },
    {
      id: 3,
      name: "Alex 3",
      profileImage: "../assets/img/rafika-bella.png",
      resto: "Mado Café & Resto",
    },
    {
      id: 4,
      name: "Alex 4",
      profileImage: "../assets/img/rafika-bella.png",
      resto: "Mado Café & Resto",
    },
  ];

  const foodiste = {
    profileImage: "../../assets/img/rafika-bella.png",
    userName: "Karima Swilah",
    adresse: "Marsa, Tunis",
    stories: 36,
    articles: 4,
    posts: 16,
    restos: 28,
  };

  const [showAlert, setShowAlert] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /// Load User

  //logout

  const [myRestaurants, setMyRestaurants] = useState([
    {
      _id: "effac050-a36e-11eb-a69a-d5cf057741bf",
      name: "Kindle Reflection Resto",
      profileImage: "https://picsum.photos/100/100.jpg",
      address: "Jawhra, Sousse",
      phone: "+216 73 367 283",
      rate: "4.2",
      promoImage: "../assets/img/promo.png",
      enBref:
        "Proin sit amet ipsum eget ante venenatis posuere. Maecenas diam risus, accumsan at facilisis sit amet, eleifend et arcu. Nam viverra pharetra condimentum. Vestibulum dui metus, fringilla sed facilisis ut, congue ut tortor.",
      horaireOuverture: "Lundi 12 Mars 2010 / 19:00 – 21:00",
      cuisine: "Tunisienne, Italienne, Indienne",
      coutMoyenne: "30",
      payement: "Espèce",
      votes: [
        {
          id: 1,
          user: "Alex",
        },
        {
          id: 2,
          user: "Alex",
        },
      ],
      tags: "#friends #food",
      services: [
        {
          id: 1,
          service: "Alcool",
        },
        {
          id: 2,
          service: "Wifi",
        },
        {
          id: 3,
          service: "Match",
        },
        {
          id: 4,
          service: "Parking",
        },
        {
          id: 5,
          service: "Air de jeu",
        },
        {
          id: 6,
          service: "Siège bébé",
        },
        {
          id: 7,
          service: "Groupe",
        },
      ],
      followers: [
        {
          id: 1,
          name: "Alex1",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
        {
          id: 2,
          name: "Alex2",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
        {
          id: 3,
          name: "Alex3",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
        {
          id: 4,
          name: "Alex4",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
        {
          id: 5,
          name: "Alex5",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
        {
          id: 6,
          name: "Alex6",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
        {
          id: 7,
          name: "Alex7",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
        {
          id: 8,
          name: "Alex8",
          imageProfile: "../assets/img/avatar.png",
          address: "Marsa, Tunis",
        },
      ],
      postes: [
        {
          idPost: 1,
          imagePost: "../assets/img/image2.jpg",
          userName: "Moh Yamin Resto",
          userProfileImage: "../assets/img/icon-restaurant.png",
          address: "Tunis",
          cuisine: "Cuisine Chinoise",
          datePost: "12 janvier 2020",
          description:
            "Proin sit amet ipsum eget ante venenatis posuere. Maecenas diam risus, accumsan at facilisis sit amet, eleifend et arcu. Nam viverra pharetra condimentum. Vestibulum dui metus, fringilla sed facilisis ut, congue ut tortor.",
        },
        {
          idPost: 2,
          imagePost: "../assets/img/image2.jpg",
          userName: "Moh Yamin Resto",
          userProfileImage: "../assets/img/icon-restaurant.png",
          address: "Tunis",
          cuisine: "Cuisine Chinoise",
          datePost: "12 janvier 2020",
          description:
            "Proin sit amet ipsum eget ante venenatis posuere. Maecenas diam risus, accumsan at facilisis sit amet, eleifend et arcu. Nam viverra pharetra condimentum. Vestibulum dui metus, fringilla sed facilisis ut, congue ut tortor.",
        },
      ],
      photos: [
        {
          id: 1,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 2,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 3,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 4,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 5,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 6,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 7,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 8,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 9,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
        {
          id: 10,
          content: "../../assets/img/image2.jpg",
          likes: 198,
          comments: [
            {
              id: 1,
              comment: "Test",
            },
            {
              id: 2,
              comment: "Test",
            },
            {
              id: 3,
              comment: "Test",
            },
            {
              id: 4,
              comment: "Test",
            },
          ],
        },
      ],
      menu: [
        {
          id: 1,
          category: "Pizza",
          articles: [
            {
              id: 1,
              name: "Pizza Tornado 1",
              articleImage:
                "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
              //""../assets/img/pizza-small.png",
              ingredients:
                "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.",
              price: 11.4,
              newPrice: "6.5",
              duree: "15",
              rate: 4,
            },
            {
              id: 2,
              name: "Pizza Tornado 2",
              articleImage:
                "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
              ingredients:
                "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.",
              price: 11.4,
              newPrice: "6.5",
              duree: "15",
              rate: 4,
            },
            {
              id: 3,
              name: "Pizza Tornado 3",
              articleImage: "../assets/img/pizza-small.png",
              ingredients:
                "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.",
              price: 11.4,
              newPrice: "6.5",
              duree: "15",
              rate: 4,
            },
            {
              id: 4,
              name: "Pizza Tornado 4",
              articleImage: "../assets/img/pizza-small.png",
              ingredients:
                "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.",
              price: 11.4,
              newPrice: "6.5",
              duree: "15",

              rate: 4,
            },
          ],
        },
        {
          id: 2,
          category: "Salade",
          articles: [
            {
              id: 1,
              name: "Salade 1",
              articleImage: "../assets/img/pizza-small.png",
              ingredients:
                "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.",
              price: "10.4",
              newPrice: "6.5",
              duree: "10",
            },
          ],
        },
        {
          id: 3,
          category: "Pates",
          articles: [],
        },
        {
          id: 4,
          category: "Sandwich",
          articles: [],
        },
        {
          id: 5,
          category: "Burguers",
          articles: [],
        },
        {
          id: 6,
          category: "Boissons",
          articles: [],
        },
      ],
      menuPersonnalise: [
        {
          id: 1,
          name: "Pizza Tornado",
          imageArticle: "../../assets/img/pizza-process.png",
          dateMAJ: "12 Mai 2021",
          rate: 5,
          prix: "11.3",
          quantite: 3,
          ingredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
            {
              id: 5,
              name: "Mauris placerat",
            },
          ],
          newIngredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
          ],
        },
        {
          id: 2,
          name: "Pasta Fruits de mer",
          imageArticle: "../../assets/img/b66558151e2633d23dbc274726fcdcac.png",
          dateMAJ: "12 Mai 2021",
          rate: 5,
          prix: "11.3",
          quantite: 3,
          ingredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
            {
              id: 5,
              name: "Mauris placerat",
            },
          ],
          newIngredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
          ],
        },
        {
          id: 3,
          name: "Pizza Tornado",
          imageArticle: "../../assets/img/pizza-process.png",
          dateMAJ: "12 Mai 2021",
          rate: 5,
          prix: "11.3",
          quantite: 3,
          ingredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
            {
              id: 5,
              name: "Mauris placerat",
            },
          ],
          newIngredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
          ],
        },
        {
          id: 4,
          name: "Pasta Fruits de mer",
          imageArticle: "../../assets/img/b66558151e2633d23dbc274726fcdcac.png",
          dateMAJ: "12 Mai 2021",
          rate: 5,
          prix: "11.3",
          quantite: 3,
          ingredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
            {
              id: 5,
              name: "Mauris placerat",
            },
          ],
          newIngredients: [
            {
              id: 1,
              name: "Mauris placerat",
            },
            {
              id: 2,
              name: "Mauris placerat",
            },
            {
              id: 3,
              name: "Mauris placerat",
            },
            {
              id: 4,
              name: "Mauris placerat",
            },
          ],
        },
      ],
      avis: [
        {
          id: 1,
          user: "Alex",
          profileImg: "../../assets/img/avatar.png",
          address: "Mado Café & Resto",
          date: "12 janvier 2020",
          time: "18:30",
          rate: 3.5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum sit amet metus ut faucibus. Ut tempus lobortis elit, nec consequat mauris tincidunt vitae. Cras sodales, mi non gravida venenatis, ante tortor aliquam ante, in ornare magna tortor dapibus mauris. Vivamus ut lacus commodo lorem aliquam iaculis. Fusce sit amet pretium enim.",
          likes: 32,
          comments: [
            {
              id: 1,
              userName: "Alex",
              userImg: "../../assets/img/avatar.png",
              comment:
                "Proin sit amet ipsum eget ante venenatis posuere. Maecenas diam risus, accumsan at facilisis sit amet, eleifend et arcu. Nam viverra pharetra condimentum. Vestibulum dui metus, fringilla sed facilisis ut, congue ut tortor.",
            },
            {
              id: 2,
              userName: "Scholes",
              userImg: "../../assets/img/avatar.png",
              comment:
                "Proin sit amet ipsum eget ante venenatis posuere. Maecenas diam risus, accumsan at facilisis sit amet, eleifend et arcu. Nam viverra pharetra condimentum. Vestibulum dui metus, fringilla sed facilisis ut, congue ut tortor.",
            },
          ],
        },
        {
          id: 2,
          user: "Alex",
          profileImg: "../../assets/img/avatar.png",
          address: "Mado Café & Resto",
          date: "12 janvier 2020",
          time: "18:30",
          rate: 3.5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum sit amet metus ut faucibus. Ut tempus lobortis elit, nec consequat mauris tincidunt vitae. Cras sodales, mi non gravida venenatis, ante tortor aliquam ante, in ornare magna tortor dapibus mauris. Vivamus ut lacus commodo lorem aliquam iaculis. Fusce sit amet pretium enim.",
          likes: 33,
          comments: [],
        },
      ],
      reservations: [
        {
          id: 1,
          nbrPersonne: 5,
          date: "Lundi 12 Mars 2010",
          heure: "19:00",
          //timeTo: "21:00",
          promo: 10,
          menu: {},
          payment: "Espèce",
          note: " Pas à l’entrée SVP & diminuez volume TV :)",
          confirmer: false,
        },
        {
          id: 2,
          nbrPersonne: 5,
          date: "Lundi 12 Mars 2010",
          heure: "19:00",
          //timeTo: "21:00",
          promo: 30,
          menu: {},
          payment: "Espèce",
          note: " Pas à l’entrée SVP & diminuez volume TV :)",
          confirmer: true,
        },
      ],
      promos: [
        {
          id: 1,
          name: "promo1",
          content: "../assets/img/6faba7a30c26fb8ad06a842784a80722.png",
          valeur: 30,
        },
        {
          id: 2,
          name: "promo2",
          content: "../assets/img/6e7b74dc0f53f8fff799e1b32d704554.png",
          valeur: 15,
        },
        {
          id: 3,
          name: "promo3",
          content: "../../assets/img/image3.jpg",
          valeur: 10,
        },
      ],
      isOnline: true,
    },
  ]);

  const [listChoixArticles, setListChoixArticles] = useState([]);

  const [myCommande, setMyCommande] = useState([]);

  const [category, setCategory] = useState("Pizza");

  const [conversations, setConversations] = useState([
    {
      id: "1",
      userName: "Nissaf Ouertani",
      profileImage: "../assets/img/svg/User.png",
      adresse: "Jawhra, Sousse",
      time: "15",
      onLine: true,
      writing: false,
      messages: [
        {
          id: 1,
          type: "sent",
          message: "Hi! wenek?",
          date: "24 minutes",
        },
        {
          id: 2,
          type: "sent",
          message:
            "Pellentesque efficitur varius lobortis. Curabitur posuere magna",
          date: "24 minutes",
        },
        {
          id: 3,
          type: "received",
          message: "Ut ac nulla sit amet lectus malesuada congue.",
          date: "22 minutes",
        },
        {
          id: 4,
          type: "sent",
          message: "Hi! wenek?",
          date: "20 minutes",
        },
        {
          id: 5,
          type: "sent",
          message:
            "Pellentesque efficitur varius lobortis. Curabitur posuere magna",
          date: "19 minutes",
        },
        {
          id: 6,
          type: "received",
          message: "Ut ac nulla sit amet lectus malesuada congue.",
          date: "15 minutes",
        },
      ],
      fichiersPartages: [
        {
          id: 1,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3271.png",
        },
        {
          id: 2,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3272.png",
        },
        {
          id: 3,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3273.png",
        },
        {
          id: 4,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3274.png",
        },
        {
          id: 5,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3275.png",
        },
        {
          id: 6,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3276.png",
        },
      ],
    },
    {
      id: "2",
      userName: "Feriel Mahmoud",
      profileImage: "../assets/img/svg/User.png",
      adresse: "Jawhra, Sousse",
      time: "15",
      onLine: true,
      writing: true,
      messages: [
        {
          id: 1,
          type: "sent",
          message: "Hi! wenek?",
          date: "10 minutes",
        },
      ],
      fichiersPartages: [
        {
          id: 1,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3271.png",
        },
        {
          id: 2,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3272.png",
        },
        {
          id: 3,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3273.png",
        },
      ],
    },
    {
      id: "3",
      userName: "Feriel Mahmoud",
      profileImage: "../assets/img/svg/User.png",
      adresse: "Jawhra, Sousse",
      time: "15",
      onLine: true,
      writing: false,
      messages: [
        {
          id: 1,
          type: "sent",
          message: "Hi! wenek?",
          date: "10 minutes",
        },
      ],
      fichiersPartages: [
        {
          id: 1,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3271.png",
        },
        {
          id: 2,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3272.png",
        },
        {
          id: 3,
          type: "photo",
          content: "../assets/img/svg/Rectangle 3273.png",
        },
      ],
    },
  ]);

  const [sidebar, setSidebar] = useState("");
  const [showConversation, setShowConversation] = useState(0);

  const [myMenu, setMyMenu] = useState([
    {
      id: 1,
      category: "Pizza",
      articles: [
        {
          id: 1,
          name: "Pizza Tornado 1",
          articleImage:
            "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
          ingredients: [
            {
              id: 1,
              item: "Laitue",
            },
            {
              id: 2,
              item: "Blancs de poulet",
            },
            {
              id: 3,
              item: "Tranches pain de mie",
            },
            {
              id: 4,
              item: "Huile d’olive",
            },
            {
              id: 5,
              item: "Sauce César",
            },
          ],
          price: 11.4,
          newPrice: "6.5",
          duree: "15",
          rate: 4,
        },
        {
          id: 2,
          name: "Pizza Tornado 2",
          articleImage:
            "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
          ingredients: [
            {
              id: 1,
              item: "Laitue",
            },
            {
              id: 2,
              item: "Blancs de poulet",
            },
            {
              id: 3,
              item: "Tranches pain de mie",
            },
            {
              id: 4,
              item: "Huile d’olive",
            },
            {
              id: 5,
              item: "Sauce César",
            },
          ],
          price: 11.4,
          newPrice: "6.5",
          duree: "15",
          rate: 4,
        },
      ],
      addToMenu: false,
    },
    {
      id: 2,
      category: "Salade",
      articles: [],
      addToMenu: false,
    },
    {
      id: 3,
      category: "Pates",
      articles: [],
      addToMenu: false,
    },
    {
      id: 4,
      category: "Sandwich",
      articles: [],
      addToMenu: false,
    },
    {
      id: 5,
      category: "Burguers",
      articles: [],
      addToMenu: false,
    },
    {
      id: 6,
      category: "Boissons",
      articles: [],
      addToMenu: false,
    },
  ]);

  const [menuPersonaliser, setMenuPersonaliser] = useState({
    idArticle: 1,
    nameArticle: "Pizza Tornado 1",
    articleImage: "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
    size: "S",
    quantite: 1,
    prix: 11.4,
    rate: 4,
    duree: "15",
    ingredients: [],
    nouveauIngredients: [],
    addToMenu: true,
    newPrice: "6.5",
  });

  const [sommePayer, setSommePayer] = useState();

  const [points, setPoints] = useState({
    user: "Mongi",
    dateExpirer: "13 Mai 2021",
    somme: 1670,
    argent: 17.2,
    plans: [
      {
        id: 1,
        pourcentage: "15",
        duree: "un mois",
        description:
          "Ut ac nulla sit amet lectus malesuada congue. Pellentesque efficitur varius lobortis.",
        type: "simple",
      },
      {
        id: 2,
        pourcentage: "15",
        duree: "un mois",
        description:
          "Ut ac nulla sit amet lectus malesuada congue. Pellentesque efficitur varius lobortis.",
        type: "simple",
      },
      {
        id: 3,
        pourcentage: "02",
        duree: "un mois",
        plat: "Plats Royale",
        description:
          "Ut ac nulla sit amet lectus malesuada congue. Pellentesque efficitur varius lobortis.",
        type: "avecImage",
      },
      {
        id: 2,
        pourcentage: "15",
        duree: "un mois",
        description:
          "Ut ac nulla sit amet lectus malesuada congue. Pellentesque efficitur varius lobortis.",
        type: "simple",
      },
    ],
    pointsTaktak: [
      {
        id: 1,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-comment-alt",
      },
      {
        id: 2,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-share-alt",
      },
      {
        id: 3,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-user-plus",
      },
      {
        id: 4,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-helicopter",
      },
      {
        id: 5,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-pen",
      },
      {
        id: 6,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-users",
      },
      {
        id: 7,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-calendar-edit",
      },
      {
        id: 8,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-star",
      },
      {
        id: 9,
        description: "Premier commentaire",
        points: 3,
        icon: "icon-restaurant",
      },
      {
        id: 10,
        description: "Premier commentaire",
        points: 3,
        icon: "far fa-circle",
      },
      {
        id: 11,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-mobile-android",
      },
      {
        id: 12,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-id-card-alt",
      },
      {
        id: 13,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-share-alt",
      },
      {
        id: 14,
        description: "Premier commentaire",
        points: 3,
        icon: "fal fa-wrench",
      },
    ],
  });

  const [commandes, setCommandes] = useState([
    {
      id: "1",
      ref: "CM0923-11",
      restoName: "Chicken wings",
      profileImage: "assets/img/svg/chicken.png",
      adresse: "Tunis",
      cuisine: "Cuisine traditionelle",
      date: "Lundi 12 Mars 2010",
      heure: "19:00 – 21:00",
      type: "Sur place",
      modePayement: "E-Dinar",
      etape: 3,
      articles: [
        {
          id: 1,
          item: "Pizza Tornado 01",
          photoArticle:
            "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
          size: "Medium",
          ingredients:
            "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César, Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.",
          quantite: 3,
          duree: 15,
          sumPrice: 33.5,
        },
        {
          id: 2,
          item: "Pizza Tornado 02",
          photoArticle:
            "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
          size: "Medium",
          ingredients:
            "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César, Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.",
          quantite: 1,
          duree: 15,
          sumPrice: 22.5,
        },
        {
          id: 3,
          item: "Pizza Tornado 03",
          photoArticle:
            "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
          size: "Medium",
          ingredients:
            "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César, Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.",
          quantite: 1,
          duree: 15,
          sumPrice: 11.5,
        },
      ],
    },
    {
      id: "2",
      ref: "CM0923-12",
      restoName: "Chicken wings",
      profileImage: "assets/img/svg/chicken.png",
      adresse: "Tunis",
      cuisine: "Cuisine traditionelle",
      date: "Lundi 12 Mars 2021",
      heure: "19:00 – 21:00",
      type: "Take away",
      modePayement: "Espèce",
      etape: 1,
      articles: [
        {
          id: 1,
          item: "Pizza Tornado 01",
          photoArticle:
            "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
          size: "Medium",
          ingredients:
            "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César, Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.",
          quantite: 3,
          duree: 15,
          sumPrice: 33.5,
        },
        {
          id: 2,
          item: "Pizza Tornado 02",
          photoArticle:
            "../assets/img/svg/74320c23bb79743963fcb643eb876e25.png",
          size: "Medium",
          ingredients:
            "Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César, Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.",
          quantite: 1,
          duree: 15,
          sumPrice: 22.5,
        },
      ],
    },
  ]);

  const [mediaPlayerRunning, setMediaPlayerRunning] = useState(false);
  const [timelineVideoRunning, setTimelineVideoRunning] = useState(false);

  const [paymentPannel, setPaymentPannel] = useState({
    votreCommande: "encours",
    infosAdditionnelles: "",
    heureCommande: "",
    modePayement: "",
  });

  const [facture, setFacture] = useState({
    codePromotionnel: "",
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    note: "",
    winTak: true,
    moyenPaiement: "",
  });

  const [photos, setPhotos] = useState([
    {
      id: 1,
      item: "https://picsum.photos/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
        {
          id: 2,
          firstName: "mongi",
          comment: "test2",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 2,
      item: "https://picsum.photos/500/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
        {
          id: 2,
          firstName: "mongi",
          comment: "test2",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 3,
      item: "https://picsum.photos/100/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 4,
      item: "https://picsum.photos/500/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [],
    },
    {
      id: 5,
      item: "https://picsum.photos/222/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
        {
          id: 2,
          firstName: "mongi",
          comment: "test2",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 6,
      item: "https://picsum.photos/400/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
        {
          id: 2,
          firstName: "mongi",
          comment: "test2",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 7,
      item: "https://picsum.photos/333/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [],
    },
    {
      id: 8,
      item: "https://picsum.photos/444/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 9,
      item: "https://picsum.photos/555/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 10,
      item: "https://picsum.photos/900/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
        {
          id: 2,
          firstName: "mongi",
          comment: "test2",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
    {
      id: 11,
      item: "https://picsum.photos/800/500",
      likes: 232,
      postHandler: "amir bouker",
      comments: 23,
      createdAt: "2323232323",
      type: "photo",
      comments: [
        {
          id: 1,
          firstName: "mongi",
          comment: "test1",
          profileImage: "https://picsum.photos/500",
        },
        {
          id: 2,
          firstName: "mongi",
          comment: "test2",
          profileImage: "https://picsum.photos/500",
        },
      ],
    },
  ]);

  const [forcePush,setForcePush] = useState(false)
  return (
    <UiContext.Provider
      value={{
        setConversationHover,
        conversationHover,
        openModalPost,
        setOpenModalPost,
        contentInPostModal,
        setContentInPostModal,
        indexOfClickedElement,
        setIndexOfClickedElement,
        handleOpenPostModal,
        handleClosePostModal,
        signUpPageNumber,
        setSignUpPageNumber,
        conversationListOpen,
        setConversationListOpen,
        conversationsLoaded,
        setConversationsLoaded,
        loadConversations,
        closeChatBox,
        myRestaurants,
        setMyRestaurants,
        restaurants,
        menu,
        setMenu,
        getIndex,
        posts,
        setPosts,
        notifications,
        myCommande,
        setMyCommande,
        category,
        setCategory,
        newNotifications,
        setNewNotifications,
        activeStep,
        setActiveStep,
        handleNext,
        handleBack,
        myReservation,
        setMyReservation,
        venus,
        foodiste,
        conversations,
        setConversations,
        sidebar,
        setSidebar,
        showConversation,
        setShowConversation,
        listChoixArticles,
        setListChoixArticles,
        menuPersonaliser,
        setMenuPersonaliser,
        myMenu,
        setMyMenu,
        sommePayer,
        setSommePayer,
        points,
        setPoints,
        commandes,
        setCommandes,
        mediaPlayerRunning,
        setMediaPlayerRunning,
        timelineVideoRunning,
        setTimelineVideoRunning,
        paymentPannel,
        setPaymentPannel,
        facture,
        setFacture,
        photos,
        setPhotos,
        forcePush,
        setForcePush
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export { UiContextProvider, UiContext };
