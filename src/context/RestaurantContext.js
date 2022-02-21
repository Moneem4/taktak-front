import React, { useState } from "react";
import {
  GET_RESTAURANTS,
  RESTAURANT,
  CREATE_RESTAURANT,
  GET_RESTO_FOLLOWERS,
  UPDATE_RESTAURANT,
  RESTAURANT_BY_USER_ID,
  MENU_BY_ID,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  CATEGORY_BY_ID,
  DELETE_ARTICLE,
  ADD_ARTICLE_TO_PERSONALIZED_MENU,
  DELETE_ARTICLE_FROM_PM,
  PERSONALIZED_MENU_BY_ID,
  UPDATE_ARTICLE_Of_PM,
  PM_BY_USER_ID_RESTAURANT_ID,
  ARTICLES_OF_PM_BY_PERSONALIZED_MENU,
  UPDATE_CATEGORY,
  PM_BY_USER_ID,
  UPDATE_ARTICLE_AVATAR,
  UPDATE_RESTAURANT_AVATAR,
  UPDATE_RESTAURANT_BACKGROUND_IMAGE,
  DELETE_PERSONALIZED_MENU,
  CREATE_ARTICLE_OPTION,
  ARTICLE_OPTION_BY_ARTICLE_ID,
  UPDATE_ARTICLE_OPTIONS,
  UPDATE_COMMANDE_STATUS,
  GET_COMMANDES_BY_RESTAURANTID,
  SEARCH_RESTAURANT_BY_KEYWORD,
  RATINGS_BY_RESTAURANT_ID,
  CREATE_RATING_LIKE,
  DELETE_RATING_LIKE,
  CREATE_RATING_COMMENT,
  PROMOTION_RESTAURANT_BY_ID,
  PERSONALIZED_MENU_BY_USER_ID_RESTAURANT_ID,
  CREATE_RESERVATION,
  RESERVATION_BY_RESTAURANT_ID,
  GET_RESTAURANTS_BY_IDS,
  RESTAURANT_LAST_VISITORS,
  CREATE_UNWASTABLE_LIST,
  GET_UNWASTABLE_BY_RESTAURANTID,
  DELETE_DELETE_UNWASTABLE_LIST,
  UPDATE_UNWASTABLE_MENU,
  IS_BESTIE,
  CREATE_BESTIE,
  DELETE_BESTIE,
  IS_FOLLOWING_RESTAURANT,
  FOLLOW_RESTAURANT,
  UNFOLLOW_RESTAURANT,
  BESTIES_BY_USER_ID,
  IS_ALCOHOLIC,
  NOT_BESTIES,
  REVENUE_BY_PRODUCT,
  DAY_REVENUE,
  DAY_AVERAGE,
  REVENUE_BY_PRODUCTS_LIST,
  REVENUE_PASH,
  BEVERAGE_SALES_DAILY,
  BEST_SELLERS,
  ALL_PICTURES_BY_USERID,
  PICTURES_BY_USERID,
  TAGGED_PICTURES_BY_USERID,
  CREATE_PHOTO,
  PRODUCTIVITY,
  CUSTOMER_STATISFACTION_BY_RESTAURANT_ID,
  RATIO_FOLLOWERS_BY_DAY,
  FOLLOW_RESTAURANT_RESTAURANT,
  UNFOLLOW_RESTAURANT_RESTAURANT,
  RESTAURANT_FOLLOW_USER,
  USER_IS_FOLLOWED_BY_RESTAURANT,
  IS_FOLLOWING_RESTAURANT_RESTAURANT,
  RESERVATION_BY_USERID,
  RESERVATION_BY_ID,
  DELETE_RESERVATION,
  ARTICLE_OF_PM_BY_ID,
  UPDATE_RESERVATION,
  COMMANDE_BY_ID,
  DELETE_COMMANDE,
  CATEGORY_BY_ARTICLE,
  ARTICLES_BY_RESTAURANT_ID,
  UNWASTABLE_ARTICLES,
  SEARCH_UNWASTABLE_ARTICLES,
  CATEGORIES
} from "../graphql/restaurant/restaurant";
import { GET_USER } from "../graphql/user/user";
import client from "../apollo/client";
import { Redirect, useHistory } from "react-router";

const RestaurantContext = React.createContext();

function RestaurantContextProvider({ children }) {
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [myRestaurantsList, setMyRestaurantsList] = useState([]);
  const [restaurantById, setRestaurantById] = useState({
    _id: "",
    userId: "",
    address: "",
    avatar: null,
    averageCost: "",
    description: "",
    location: "",
    menuId: "",
    name: "",
    openingTime: {
      timeFrom: "",
      timeTo: "",
      days: [],
    },
    payment: [],
    phone: "",
    promoImage: null,
    services: [],
    specialty: [],
    __typename: "",
  });
  const [restaurantCommandes, setRestaurantCommandes] = useState(null);
  const [restoFollowers, setRestoFollowers] = useState(null);
  const [horaireResto, setHoraireResto] = useState();
  const [categories, setCategories] = useState();
  const [articles, setArticles] = useState();
  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [myPersonalizedMenuList, setMyPersonalizedMenuList] = useState(null);
  const [personalizedMenuId, setPersonalizedMenuId] = useState();
  const [articlesOfPmId, setArticlesOfPmId] = useState();
  const [articlesOfPm, setArticlesOfPm] = useState();
  const [pmByUserIdList, setPmByUserIdList] = useState();
  const [personalizeArticle, setPersonalizeArticle] = useState(null);
  const [menuPersonaliser, setMenuPersonaliser] = useState({
    id: 1,
    name: "",
    image: "",
    size: "",
    quantity: 1,
    price: 1,
    rate: 1,
    duration: "15",
    ingredients: [],
    nouveauIngredients: [],
    //newPrice: "6",
  });
  const [profileRestaurant, setProfileRestaurant] = useState({
    profileImage: "https://picsum.photos/100/100.jpg",
    backgroundImage: "https://picsum.photos/100/100.jpg",
    name: "",
    phone: "",
    description: "",
    address: "",
    country: "",
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
  });
  const [myReservation, setMyReservation] = useState({
    restaurantId: "",
    date: new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear(),
    timeFrom: 8,
    promotionId: 0,
    peopleNumber: 1,
    guests: [],
    payment: "CASH",
    usePointTaktak: true,
    confirmation: "",
    note: "",
    menuPersonaliserId: "",
  });
  const [restaurant, setRestaurant] = useState(null);
  const [guestsList, setGuestsList] = useState([]);

  async function getRestaurants(setData) {
    await client
      .query({
        query: GET_RESTAURANTS,
      })
      .then((data) => {
        setData(data.data.restaurants);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRestaurantData(idResto, setData) {
    await client
      .query({
        query: RESTAURANT,
        variables: {
          id: idResto,
        },
      })
      .then((data) => {
        setData(data.data.restaurant);
        if (data.data.restaurant) {
          setRestaurantById((resto) => {
            return {
              ...resto,
              _id: data.data.restaurant._id,
              userId: data.data.restaurant.userId,
              address: data.data.restaurant.address,
              avatar: data.data.restaurant.avatar,
              averageCost: data.data.restaurant.averageCost,
              description: data.data.restaurant.description,
              location: data.data.restaurant.location,
              menuId: data.data.restaurant.menuId,
              name: data.data.restaurant.name,
              openingTime: {
                timeFrom: data.data.restaurant.timeFrom,
                timeTo: data.data.restaurant.timeTo,
                days: data.data.restaurant.days,
              },
              payment: data.data.restaurant.payment,
              phone: data.data.restaurant.phone,
              promoImage: data.data.restaurant.profileImage,
              services: data.data.restaurant.services,
              specialty: data.data.restaurant.specialty,
              __typename: data.data.restaurant.__typename,
              restaurantRate: data.data.restaurant.restaurantRate,
              countVotes: data.data.restaurant.countVotes,
            };
          });
        }

        return data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function createRestaurant(inputData, setId, setLoading) {
    const urlAvatar = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_RESTAURANT_AVATAR,
          variables: {
            file: inputData.avatar,
          },
        })
        .then((res) => {
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    const urlBackground = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_RESTAURANT_BACKGROUND_IMAGE,
          variables: {
            file: inputData.backgroundImage,
          },
        })
        .then((res) => {
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    const data = {
      name: inputData.name,
      phone: inputData.phone,
      description: inputData.description,
      address: inputData.address,
      location: inputData.location,
      country: inputData.country,
      tags: inputData.tags,
      services: inputData.services,
      timeFrom: inputData.openingTime.timeFrom,
      timeTo: inputData.openingTime.timeTo,
      days: inputData.openingTime.days,
      specialty: inputData.specialty,
      averageCost: inputData.averageCost,
      payment: inputData.payment,
      accordTaktak: inputData.accordTaktak,
      avatar: urlAvatar,
      backgroundImage: urlBackground,
    };

    await client
      .mutate({
        mutation: CREATE_RESTAURANT,
        variables: {
          input: data,
        },
      })
      .then(async (res) => {
        setMyRestaurantsList((prevMyRestaurantsList) => {
          return {
            ...prevMyRestaurantsList,
            data,
          };
        });

        // getRestaurantByUserId(inputData.userId);
        // history.push('/rrrr')
        setId(res.data.createRestaurant._id);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getRestoFollowers(id) {
    await client
      .query({
        query: GET_RESTO_FOLLOWERS,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        setRestoFollowers(data.data.restaurantFollowers);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function updateRestaurant(id, data, section, setRestaurant) {
    if (section === "header") {
      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: data,
          },
        })
        .then(async (res) => { 
          setRestaurant((prevMyRestaurant) => {
            return {
              ...prevMyRestaurant,
              name: data.name,
              country: data.country,
              location: data.location,
              address: data.address,
              tags: data.tags,
            };
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (section === "description") {
      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: data,
          },
        })
        .then(async (res) => {
          setRestaurant((prevMyRestaurant) => {
            return {
              ...prevMyRestaurant,
              description: data.description,
            };
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (section === "cordonnees") {
      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: data,
          },
        })
        .then(async (res) => {
          setRestaurant((prevMyRestaurant) => {
            return {
              ...prevMyRestaurant,
              services: data.services,
              openingTime: {
                timeFrom: data.timeFrom,
                timeTo: data.timeTo,
                days: data.days,
              },
              specialty: data.specialty,
              averageCost: data.averageCost,
              payment: data.payment,
            };
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (section === "avatar") {
      const url = await new Promise((resolve, reject) => {
        client
          .mutate({
            mutation: UPDATE_RESTAURANT_AVATAR,
            variables: {
              file: data,
            },
          })
          .then((res) => {
            if (res.data && res.data.createPostMedia) {
              resolve(res.data.createPostMedia);
            } else reject("http://test.com");
          });
      });

      let image = {
        avatar: url,
      };

      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: image,
          },
        })
        .then(
          setRestaurant((prev) => {
            return { ...prev, avatar: url };
          })
        );
    } else if (section === "backgroundImage") {
      const url = await new Promise((resolve, reject) => {
        client
          .mutate({
            mutation: UPDATE_RESTAURANT_AVATAR,
            variables: {
              file: data,
            },
          })
          .then((res) => {
            if (res.data && res.data.createPostMedia) {
              resolve(res.data.createPostMedia);
            } else reject("http://test.com");
          });
      });

      let image = {
        backgroundImage: url,
      };

      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: image,
          },
        })
        .then(
          setRestaurant((prev) => {
            return { ...prev, backgroundImage: url };
          })
        );
    }
  }

  async function getRestaurantByUserId(id, setData) {
    await client
      .query({
        query: RESTAURANT_BY_USER_ID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        setMyRestaurantsList(data.data.restaurantByUserId);
        setData(data.data.restaurantByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getMenuData(menuId, setData) {
    await client
      .query({
        query: MENU_BY_ID,
        variables: {
          menuId: menuId,
        },
      })
      .then((data) => {
        setData(data.data.menuById.categories);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function createCategory(inputData) {
    const dataInput = {
      menuId: inputData.menuId,
      name: inputData.name,
    };

    await client
      .mutate({
        mutation: CREATE_CATEGORY,
        variables: {
          input: dataInput,
        },
      })
      .then(async (res) => {
        console.log("rreeess", res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function deleteCategory(id, setData) {
    await client
      .mutate({
        mutation: DELETE_CATEGORY,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        setData((prevData) => {
          let items = [...prevData];
          const indexCategory = items.findIndex((el) => el._id === id);
          items.splice(indexCategory, 1);
          return items;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function updateCategory(id, inputData) {
    const data = {
      name: inputData.name,
    };
    await client
      .mutate({
        mutation: UPDATE_CATEGORY,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (res) => {
        //setCategories([...categories, newItem]);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function createArticle(categoryId, inputData, image) {
    const url = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_ARTICLE_AVATAR,
          variables: {
            file: image,
          },
        })
        .then((res) => {
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    let data = {
      categoryId: categoryId,
      name: inputData.name,
      ingredients: inputData.ingredients,
      price: parseFloat(inputData.price),
      duration: inputData.duration,
      image: url,
    };

    let optionsList = {
      options: inputData.options,
    };

    let arr = [];

    await client
      .mutate({
        mutation: CREATE_ARTICLE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        arr = optionsList.options.map(async (option) => {
          const url = await new Promise((resolve, reject) => {
            client
              .mutate({
                mutation: UPDATE_ARTICLE_AVATAR,
                variables: {
                  file: option.image,
                },
              })
              .then((res) => {
                if (res.data && res.data.createPostMedia) {
                  resolve(res.data.createPostMedia);
                } else reject("http://test.com");
              });
          });

          let dataOption = {
            articleId: data.data.createArticle._id,
            optionName: option.name,
            optionType: option.type,
            optionAvatar: url,
            optionPrice: parseFloat(option.price),
          };

          return dataOption;
        });

        if (arr && arr.length) {
          arr = await Promise.all(arr);
          await client
            .mutate({
              mutation: CREATE_ARTICLE_OPTION,
              variables: {
                input: arr,
              },
            })
            .then((data) => {
              console.log("CREATE_ARTICLE_OPTION:", data);
            })
            .catch((err) => {
              console.log(err, "CREATE_ARTICLE_OPTION error");
            });
        }
      });
  }

  async function updateArticle(idArticle, inputData, image, updatedOptions) {
    const data = {
      name: inputData.name,
      ingredients: inputData.ingredients,
      price: parseFloat(inputData.price),
      duration: inputData.duration,
      image: image,
    };

    let arr = [];

    await client
      .mutate({
        mutation: UPDATE_ARTICLE,
        variables: {
          id: idArticle,
          input: data,
        },
      })
      .then(async (data) => {
        setMenuUpdated(true);
        arr = updatedOptions.map(async (option) => {
          if (typeof option.optionAvatar === "string") {
            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: option.optionAvatar,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          } else {
            const url = await new Promise((resolve, reject) => {
              client
                .mutate({
                  mutation: UPDATE_ARTICLE_AVATAR,
                  variables: {
                    file: option.optionAvatar,
                  },
                })
                .then((res) => {
                  if (res.data && res.data.createPostMedia) {
                    resolve(res.data.createPostMedia);
                  } else reject("http://test.com");
                });
            });

            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: url,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          }
        });

        if (arr && arr.length) {
          arr = await Promise.all(arr);
          let updatedOptionsFiltred = arr.filter(
            (el) => el.actionType !== "NOUPDATE"
          );

          await client
            .mutate({
              mutation: UPDATE_ARTICLE_OPTIONS,
              variables: {
                // input: arr.filter((el) => el.actionType !== "NOUPDATE"),
                articleId: idArticle,
                input: updatedOptionsFiltred,
              },
            })
            .then((data) => {
              console.log("UPDATE_ARTICLE_OPTIONS:", data);
            })
            .catch((err) => {
              console.log(err, "UPDATE_ARTICLE_OPTIONS error");
            });
        }
      });
  }

  async function updateArticleWithImage(
    idArticle,
    inputData,
    image,
    updatedOptions
  ) {
    const url = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_ARTICLE_AVATAR,
          variables: {
            file: image,
          },
        })
        .then((res) => {
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    const data = {
      name: inputData.name,
      ingredients: inputData.ingredients,
      price: parseFloat(inputData.price),
      duration: inputData.duration,
      image: url,
    };

    let arr = [];

    await client
      .mutate({
        mutation: UPDATE_ARTICLE,
        variables: {
          id: idArticle,
          input: data,
        },
      })
      .then(async (data) => {
        setMenuUpdated(true);
        arr = updatedOptions.map(async (option) => {
          if (typeof option.optionAvatar === "string") {
            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: option.optionAvatar,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          } else {
            const url = await new Promise((resolve, reject) => {
              client
                .mutate({
                  mutation: UPDATE_ARTICLE_AVATAR,
                  variables: {
                    file: option.optionAvatar,
                  },
                })
                .then((res) => {
                  if (res.data && res.data.createPostMedia) {
                    resolve(res.data.createPostMedia);
                  } else reject("http://test.com");
                });
            });

            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: url,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          }
        });

        if (arr && arr.length) {
          arr = await Promise.all(arr);
          let updatedOptionsFiltred = arr.filter(
            (el) => el.actionType !== "NOUPDATE"
          );

          await client
            .mutate({
              mutation: UPDATE_ARTICLE_OPTIONS,
              variables: {
                // input: arr.filter((el) => el.actionType !== "NOUPDATE"),
                articleId: idArticle,
                input: updatedOptionsFiltred,
              },
            })
            .then((data) => {
              console.log("UPDATE_ARTICLE_OPTIONS:", data);
            })
            .catch((err) => {
              console.log(err, "UPDATE_ARTICLE_OPTIONS error");
            });
        }
      });
  }

  const [categoryItem, setCategoryItem] = useState();
  async function getCategoryById(id) {
    await client
      .query({
        query: CATEGORY_BY_ID,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        setCategory(data.data.categoryById);
        setArticles(data.data.categoryById.articles);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function deleteArticle(id) {
    await client
      .mutate({
        mutation: DELETE_ARTICLE,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
        setArticles((prevArticles) => {
          let items = [...prevArticles];

          const indexArticle = items.findIndex((el) => el._id === id);

          items.splice(indexArticle, 1);
          return items;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function addArticleToPersonalizeMenu(idResto, idArticle) {
    await client
      .mutate({
        mutation: ADD_ARTICLE_TO_PERSONALIZED_MENU,
        variables: {
          restaurantId: idResto,
          articleId: idArticle,
        },
      })
      .then(async (res) => {
        console.log(res);
      })

      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function deleteArticleFromPersonalizeMenu(id) {
    await client
      .mutate({
        mutation: DELETE_ARTICLE_FROM_PM,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getPersonalizedMenuById(id) {
    await client
      .query({
        query: PERSONALIZED_MENU_BY_ID,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        //setArticlesOfPmId(data.data.personalizedMenuByUserId.articlesOfPmId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function updateArticleOfPersonalizedMenu(id, data) {
    await client
      .mutate({
        mutation: UPDATE_ARTICLE_Of_PM,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getPersonalizedMenuByUserIdRestaurantId(
    userId,
    restoId,
    setData
  ) {
    await client
      .query({
        query: PM_BY_USER_ID_RESTAURANT_ID,
        variables: {
          userId: userId,
          restaurantId: restoId,
        },
      })
      .then(async (data) => {
        /*setPersonalizedMenuId(
          data.data.personalizedMenuByUserIdRestaurantId._id
        );

        await client
          .query({
            query: ARTICLES_OF_PM_BY_PERSONALIZED_MENU,
            variables: {
              personalizedMenuId:
                data.data.personalizedMenuByUserIdRestaurantId._id,
            },
          })
          .then((data) => {
            setArticlesOfPmId(data.data.articlesOfPmByPersonalizedMenu);
            setData(data.data.articlesOfPmByPersonalizedMenu);
          });*/
          setData(data.data.personalizedMenuByUserIdRestaurantId.articles);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getArticlesOfPmByPersonalizedMenu(personalizedMenuId) {
    await client
      .query({
        query: ARTICLES_OF_PM_BY_PERSONALIZED_MENU,
        variables: {
          personalizedMenuId: personalizedMenuId,
        },
      })
      .then((data) => {
        //setArticlesOfPmId(data.data.)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getPersonalizedMenuByUserId(userId, setData) {
    await client
      .query({
        query: PM_BY_USER_ID,
        variables: {
          userId: userId,
        },
      })
      .then(async (data) => {
        setData(data.data.personalizedMenuByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function deletePersonalizedMenu(id, setData) {
    await client
      .mutate({
        mutation: DELETE_PERSONALIZED_MENU,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        setData((prevData) => {
          let items = [...prevData];

          const indexMP = items.findIndex((el) => el._id === id);

          items.splice(indexMP, 1);
          return items;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getArticleOptionByArticleId(id, setData) {
    await client
      .query({
        query: ARTICLE_OPTION_BY_ARTICLE_ID,
        variables: {
          articleId: id,
        },
      })
      .then((data) => {
        setData(data.data.articleOptionByArticleId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function updateCommande(id, data) {
    await client
      .mutate({
        mutation: UPDATE_COMMANDE_STATUS,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (data) => {
        console.log("Datacommande", data.data.updateCommande);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  
  async function getCommandebyRestaurantId(id, setData) {
    await client
      .query({
        query: GET_COMMANDES_BY_RESTAURANTID,
        variables: {
          restaurantId: id,
        },
      })
      .then(async (data) => {
        setData(data.data.commandeByRestaurantId);
        setRestaurantCommandes(data.data.commandeByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRatingsByRestaurantId(id, setData) {
    await client
      .query({
        query: RATINGS_BY_RESTAURANT_ID,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        setData(data.data.ratingsByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getUser(id, setData) {
    await client
      .query({
        query: GET_USER,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        setData(data.data.user);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function searchRestaurantByKeyWord(word, setData) {
    await client
      .query({
        query: SEARCH_RESTAURANT_BY_KEYWORD,
        variables: {
          word: word,
        },
      })
      .then((data) => {
        data && setData(data.data.searchByKeyWord);
      })
      .catch((err) => {
        console.log(err, "error search restaurant");
      });
  }

  async function createRatingLike(ratingId) {
    const data = {
      ratingId: ratingId,
    };
    await client
      .mutate({
        mutation: CREATE_RATING_LIKE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("RatingLike", data.data.createRatingLike);
      });
  }

  async function deleteRatingLike(id) {
    await client
      .mutate({
        mutation: DELETE_RATING_LIKE,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
        /*if (data.data.deleteRatingLike && likes) {
					var array = [...likes];
					let tab = array.map((el) => el._id);
					var index = tab.indexOf(id);
					if (index != -1) likes.splice(index, 1);
					setData(array);
				}*/
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function createRatingComment(ratingId, content) {
    const data = {
      ratingId: ratingId,
      content: content,
    };

    await client
      .mutate({
        mutation: CREATE_RATING_COMMENT,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("RatingCommentData", data);
      })
      .catch((err) => {
        console.log(err, "error create Comment");
      });
  }

  async function getPromosList(id, setData) {
    await client
      .query({
        query: PROMOTION_RESTAURANT_BY_ID,
        variables: {
          restaurantid: id,
        },
      })
      .then((data) => {
        setData(data.data.promotionRestaurantById);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getMenuPersonaliserList(userId, restaurantId, setData) {
    await client
      .query({
        query: PERSONALIZED_MENU_BY_USER_ID_RESTAURANT_ID,
        variables: {
          userId: userId,
          restaurantId: restaurantId,
        },
      })
      .then((data) => {
        setData(data.data.personalizedMenuByUserIdRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function createReservation(inputData) {
    const dataInput = {
      restaurantId: inputData.restaurantId,
      date: inputData.date,
      timeFrom: `${inputData.timeFrom}:00`,
      promotionId: inputData.promotionId,
      peopleNumber: inputData.peopleNumber,
      guests: inputData.guests,
      payment: inputData.payment,
      usePointTaktak: inputData.usePointTaktak,
      confirmation: false,
      note: inputData.note,
      personalizedMenuId: inputData.menuPersonaliserId,
      status: "INPROGRESS",	
    };

    await client
      .mutate({
        mutation: CREATE_RESERVATION,
        variables: {
          input: dataInput,
        },
      })
      .then(async (res) => {
        console.log("rreeess", res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getReservationByRestaurantId(id, setData) {
    await client
      .query({
        query: RESERVATION_BY_RESTAURANT_ID,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        setData(data.data.reservationByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  function getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  async function restaurantsByIds(ids, setData) {
    await client
      .query({
        query: GET_RESTAURANTS_BY_IDS,
        variables: {
          ids: ids,
        },
      })
      .then((data) => {
        setData(data.data.restaurantsByIds);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function isRestaurantOpen(openingTime, setData) {
    const { timeTo, timeFrom, days } = openingTime;
    let opening = new Date(timeFrom).getTime();
    let closing = new Date(timeTo).getTime();
    const now = Date.now();
    const nowTime = new Date(now).getTime();

    const weekDays = new Array(
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    );
    const i = new Date(now).getDay();
    const nowDay = weekDays[i];

    if (days.includes(nowDay)) {
      if (nowTime > opening && nowTime < closing) {
        setData(true);
      } else setData(false);
    } else setData(false);
  }

  const [menuUpdated, setMenuUpdated] = useState(false);
  const [slide, setSlide] = useState(0);
  const [response, setResponse] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  async function restaurantLastVisitors(id, setData) {
    await client
      .query({
        query: RESTAURANT_LAST_VISITORS,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        setData(data.data.restaurantLastVisitors);
      })
      .catch((err) => {
        console.log(err, "error restaurantLastVisitors");
      });
  }

  async function createUnwastableList(restaurantId, inputData, setData) {
    await client
      .mutate({
        mutation: CREATE_UNWASTABLE_LIST,
        variables: {
          restaurantId: restaurantId,
          input: inputData,
        },
      })
      .then(async (res) => {
        setData(res.data.createUnwastableMenu);
      })
      .catch((error) => {
        console.log("CREATE_UNWASTABLE_LIST", error);
        alert(error);
      });
  }

  async function getUnwastableByRestaurantId(id, setData) {
    await client
      .query({
        query: GET_UNWASTABLE_BY_RESTAURANTID,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        setData(data.data.unwastableByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "unwastableLists error");
      });
  }

  async function deleteUnwastableList(
    id,
    unwastableMenuId,
    setLoading,
    setData
  ) {
    setLoading(true);
    await client
      .mutate({
        mutation: DELETE_DELETE_UNWASTABLE_LIST,
        variables: {
          id: id,
          unwastableMenuId: unwastableMenuId,
        },
      })
      .then(async (res) => {
        setLoading(false);
        // index >= 0 &&
        //   setPreviousLists((prev) => {
        //     let arr = [...prev];
        //     arr.splice(0, 1);
        //     return arr;
        //   });
        // setData(res.data)
      })
      .catch((error) => {
        console.log(error, "deleteUnwastableListError");
        alert(error);
      });
  }

  async function updateUnwastableList(
    UnwastableId,
    unwastableMenuId,
    input,
    setLoading
  ) {
    setLoading(true);
    await client
      .mutate({
        mutation: UPDATE_UNWASTABLE_MENU,
        variables: {
          id: UnwastableId,
          unwastableMenuId: unwastableMenuId,
          input: input,
        },
      })
      .then(async (res) => {
        console.log(res, "updateUnwastableList");
      })
      .then(
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      )
      .catch((error) => {
        console.log(error, "updateUnwastableListError");
        alert(error);
      });
  }

  async function isBesty(id, setData) {
    await client
      .query({
        query: IS_BESTIE,
        variables: {
          restoId: id,
        },
      })
      .then((data) => {
        setData(data.data.isBesty);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function createBestie(id, setData) {
    await client
      .mutate({
        mutation: CREATE_BESTIE,
        variables: {
          restoId: id,
        },
      })
      .then(async (data) => {
        setData(data.data.createBestie);
      });
  }

  async function deleteBestie(id) {
    await client
      .mutate({
        mutation: DELETE_BESTIE,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  //check if user follow restaurant
  async function isFollowingRestaurant(restoId, userId, setData) {
    await client
      .query({
        query: IS_FOLLOWING_RESTAURANT,
        variables: {
          restaurantId: restoId,
          followerId: userId
        },
      })
      .then((data) => {
        setData(data.data.isFollowingRestaurant);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  //check if user is followed by a restaurant
  async function userIsFollowedByRestaurant(restoId, userId, setData) {
    await client
      .query({
        query: USER_IS_FOLLOWED_BY_RESTAURANT,
        variables: {
          userId: userId,
          restaurantId: restoId
        },
      })
      .then((data) => {
        setData(data.data.userIsFollowedByRestaurant);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  //check if restaurant follow restaurant
  async function isFollowingRestaurantRestaurant(restoId, followerId, setData) {
    await client
      .query({
        query: IS_FOLLOWING_RESTAURANT_RESTAURANT,
        variables: {
          restaurantId: restoId,
          restaurantFollowerId: followerId
        },
      })
      .then((data) => {
        setData(data.data.isFollowingRestaurantRestaurant);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function followRestaurant(restoId, userId) {
    const inputData = {
      restaurantId: restoId,
      followerId: userId
    }
    await client
      .mutate({
        mutation: FOLLOW_RESTAURANT,
        variables: {
          input: inputData,
        },
      })
      .then(async (data) => {
        console.log("ddd:",data)
      });
  }

  async function unFollowRestaurant(restoId, userId) {
    await client
      .mutate({
        mutation: UNFOLLOW_RESTAURANT,
        variables: {
          restaurantId: restoId,
          followerId: userId
        },
      })
      .then(async (data) => {
        //setIsFollowed(false);
      });
  }

  async function getBestiesyUserId(id, setData) {
    let arr = [];

    await client
      .query({
        query: BESTIES_BY_USER_ID,
        variables: {
          userId: id,
        },
      })
      .then((dataResto) => {
        dataResto.data.bestiesByUserId.map(async (besty) => {
          await client
            .query({
              query: RESTAURANT,
              variables: {
                id: besty.restoId,
              },
            })
            .then((dataResto) => {
              let item={
                _id: dataResto.data.restaurant._id,
                backgroundImage:dataResto.data.restaurant.backgroundImage,
                avatar: dataResto.data.restaurant.avatar,
                name: dataResto.data.restaurant.name,
                location: dataResto.data.restaurant.location,
                description: dataResto.data.restaurant.description
              }
              arr.push(item);
              setData(arr);
            });
        });
      })
      .catch((err) => {
        console.log(err, "unwastableLists error");
      });
  }

  async function isAlcoholic(id, setData) {
    await client
      .query({
        query: IS_ALCOHOLIC,
        variables: {
          restoId: id,
        },
      })
      .then((data) => {
        setData(data.data.isAlcoholic);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getNotBesties(setData) {
    await client
      .query({
        query: NOT_BESTIES,
      })
      .then((data) => {
        setData(data.data.notBesties);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRevenueByProduct(restoId, articleId, setData) {
    await client
      .query({
        query: REVENUE_BY_PRODUCT,
        variables: {
          restoId: restoId,
          articleId: articleId
        },
      })
      .then((data) => {
        setData(data.data.revenueByProduct);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getDayRevenue(restoId, setData) {
    await client
      .query({
        query: DAY_REVENUE,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.dayRevenue.revenue);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getDayAverage(restoId, setData) {
    await client
      .query({
        query: DAY_AVERAGE,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.dayAverage.revenue);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRevenueByProductsList(restoId, setData) {
    await client
      .query({
        query: REVENUE_BY_PRODUCTS_LIST,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.revenueByProductsList);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRevenuPash(id, setData) {
    await client
      .query({
        query: REVENUE_PASH,
        variables: {
          restoId: id,
        },
      })
      .then(async (data) => {
        setData(data.data.revenuPash);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getBeverageSalesDaily(restoId, setData) {
    await client
      .query({
        query: BEVERAGE_SALES_DAILY,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.beverageSalesDaily.revenue);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getBestSellers(restoId, setData) {
    await client
      .query({
        query: BEST_SELLERS,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.bestSellers);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getAllPicturesByUserId(userId, setData) {
    await client
      .query({
        query: ALL_PICTURES_BY_USERID,
        variables: {
          userId: userId
        },
      })
      .then((data) => {
        setData(data.data.allPicturesByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getPicturesByUserId(userId, setData) {
    await client
      .query({
        query: PICTURES_BY_USERID,
        variables: {
          userId: userId
        },
      })
      .then((data) => {
        setData(data.data.picturesByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getTaggedPicturesByUserId(userId, setData) {
    await client
      .query({
        query: TAGGED_PICTURES_BY_USERID,
        variables: {
          userId: userId
        },
      })
      .then((data) => {
        setData(data.data.taggedPicturesByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    setAnchorEl(!anchorEl);
  };

  const [postPhoto, setPostPhoto] = useState({
    title: "Image",
    content: "",
    postType: "MEDIA",
    postMediaType: "IMAGE",
    media: [],
  });

  async function createPostPhoto(input, allPictures, setData) {
    let arr = [];
    arr = input.media.map(async (image) => {
      const url = await new Promise((resolve, reject) => {
        client
          .mutate({
            mutation: UPDATE_ARTICLE_AVATAR,
            variables: {
              file: image,
            },
          })
          .then((res) => {
            if (res.data && res.data.createPostMedia) {
              resolve(res.data.createPostMedia);
            } else reject("http://test.com");
          });
      });

      return url;
    });

    let dataPost = {
      title: input.title,
      content: input.content,
      postType: "MEDIA",
      postMediaType: "IMAGE",
      media: arr,
    }
    
    await client
      .mutate({
        mutation: CREATE_PHOTO,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        console.log("dataaaa:", data.data.createPost)
        //setData([...allPictures ,data.data.createPost]);
      });
  }

  async function getProductivity(restoId, setData) {
    await client
      .query({
        query: PRODUCTIVITY,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.productivity.revenue);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getCustomerSatisfaction(restoId, setData) {
    await client
      .query({
        query: CUSTOMER_STATISFACTION_BY_RESTAURANT_ID,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.customerSatisfactionByRestaurantId.value);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRatioFollowersByDay(restoId, setData) {
    await client
      .query({
        query: RATIO_FOLLOWERS_BY_DAY,
        variables: {
          restoId: restoId
        },
      })
      .then((data) => {
        setData(data.data.ratioFollowersByDay);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function followRestaurantRestaurant(restoId, followerId) {
    const inputData = {
      restaurantId: restoId,
      restaurantFollowerId: followerId
    }
    await client
      .mutate({
        mutation: FOLLOW_RESTAURANT_RESTAURANT,
        variables: {
          input: inputData,
        },
      })
      .then(async (data) => {
        console.log("fffff:", data.data.followRestaurantRestaurant)
        //setData(data.data.followRestaurantRestaurant);
      });
  }

  async function unfollowRestaurantRestaurant(restoId, followerId) {
    await client
      .mutate({
        mutation: UNFOLLOW_RESTAURANT_RESTAURANT,
        variables: {
          restaurantId: restoId,
          restaurantFollowerId: followerId
        },
      })
      .then(async (data) => {
        console.log("ddddd:", data.data.unfollowRestaurantRestaurant)
      });
  }

  async function restaurantFollowUser(restoId, userId) {
    const inputData = {
      restaurantId: restoId,
      userId: userId
    }
    await client
      .mutate({
        mutation: RESTAURANT_FOLLOW_USER,
        variables: {
          input: inputData,
        },
      })
      .then(async (data) => {
        console.log("fffff:", data.data.restaurantFollowUser)
        //setData(data.data.restaurantFollowUser);
      });
  }

  async function restaurantUnfollowUser(restoId, userId) {
    await client
      .mutate({
        mutation: UNFOLLOW_RESTAURANT_RESTAURANT,
        variables: {
          restaurantId: restoId,
          userId: userId
        },
      })
      .then(async (data) => {
        console.log("ddddd:", data.data.restaurantUnfollowUser)
      });
  }
  
  const [selectedProfile, setSelectedProfile] = useState(null);

  async function getReservationByUserId(setData) {
    await client
      .query({
        query: RESERVATION_BY_USERID,
      })
      .then(async (data) => {
        setData(data.data.reservationByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getReservationById(id, setData) {
    await client
      .query({
        query: RESERVATION_BY_ID,
        variables: {
          id: id
        },
      })
      .then(async (data) => {
        setData(data.data.reservationById);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function deleteReservation(id) {
    await client
      .mutate({
        mutation: DELETE_RESERVATION,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getArticleOfPmById(id, setData) {
    await client
      .query({
        query: ARTICLE_OF_PM_BY_ID,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        setData(data.data.articleOfPmById);
      })
      .catch((err) => {
        console.log(err, "articleOfPmById error");
      });
  }

  async function updateReservation(id, data) {
    await client
      .mutate({
        mutation: UPDATE_RESERVATION,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (data) => {
        console.log("Datacommande", data.data.updateReservation);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getCommandeById(id, setData) {
    await client
      .query({
        query: COMMANDE_BY_ID,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        setData(data.data.commandeById);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function deleteCommande(id, setData) {
    await client
      .mutate({
        mutation: DELETE_COMMANDE,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
        setData((prevData) => {
          let items = [...prevData];

          const indexCategory = items.findIndex((el) => el._id === id);

          items.splice(indexCategory, 1);
          return items;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getCategoryByArticle(articleId) {
    let category
    await client
      .query({
        query: CATEGORY_BY_ARTICLE,
        variables: {
          articleId: articleId,
        },
      })
      .then((data) => {
        //setCategory(data.data.categoryByArticleId);
        category = data.data.categoryByArticleId;
      })
      .catch((err) => {
        console.log(err, "error");
      });
      return category
  }

  async function getArticlesByRestaurantId(userId, setData) {
    await client
      .query({
        query: ARTICLES_BY_RESTAURANT_ID,
        variables: {
          userId: userId,
        },
      })
      .then((data) => {
        setData(data.data.articlesByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getUnwastableArticles(setData) {
    await client
      .query({
        query: UNWASTABLE_ARTICLES,
      })
      .then((data) => {
        setData(data.data.unwastableArticles);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getSearchUnwastableArticles(inputData, setData) {
    await client
      .query({
        query: SEARCH_UNWASTABLE_ARTICLES,
        variables: {
          input: inputData,
        },
      })
      .then((data) => {
        setData(data.data.searchUnwastableArticles);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getCategories(setData) {
    await client
      .query({
        query: CATEGORIES,
      })
      .then((data) => {
        setData(data.data.categories);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  return (
    <RestaurantContext.Provider
      value={{
        getRestaurants,
        restaurantCommandes,
        setRestaurantCommandes,
        getCommandebyRestaurantId,
        profileRestaurant,
        setProfileRestaurant,
        myRestaurant,
        setMyRestaurant,
        getRestaurantData,
        myRestaurantsList,
        setMyRestaurantsList,
        createRestaurant,
        restoFollowers,
        setRestoFollowers,
        getRestoFollowers,
        updateRestaurant,
        getRestaurantByUserId,
        horaireResto,
        setHoraireResto,
        categories,
        setCategories,
        getMenuData,
        createCategory,
        deleteCategory,
        articles,
        setArticles,
        selectedCategory,
        setSelectedCategory,
        createArticle,
        updateArticle,
        updateArticleWithImage,
        category,
        setCategory,
        getCategoryById,
        deleteArticle,
        restaurantById,
        setRestaurantById,
        addArticleToPersonalizeMenu,
        deleteArticleFromPersonalizeMenu,
        myPersonalizedMenuList,
        setMyPersonalizedMenuList,
        getPersonalizedMenuById,
        updateArticleOfPersonalizedMenu,
        getPersonalizedMenuByUserIdRestaurantId,
        personalizedMenuId,
        setPersonalizedMenuId,
        articlesOfPmId,
        setArticlesOfPmId,
        getArticlesOfPmByPersonalizedMenu,
        articlesOfPm,
        setArticlesOfPm,
        personalizeArticle,
        setPersonalizeArticle,
        menuPersonaliser,
        setMenuPersonaliser,
        updateCategory,
        getPersonalizedMenuByUserId,
        pmByUserIdList,
        setPmByUserIdList,
        deletePersonalizedMenu,
        getArticleOptionByArticleId,
        getIndex,
        menuUpdated,
        setMenuUpdated,
        categoryItem,
        updateCommande,
        setCategoryItem,
        getRatingsByRestaurantId,
        getUser,
        searchRestaurantByKeyWord,
        createRatingLike,
        deleteRatingLike,
        createRatingComment,
        myReservation,
        setMyReservation,
        getPromosList,
        getMenuPersonaliserList,
        createReservation,
        getReservationByRestaurantId,
        slide,
        setSlide,
        response,
        setResponse,
        restaurantsByIds,
        isRestaurantOpen,
        restaurantLastVisitors,
        createUnwastableList,
        getUnwastableByRestaurantId,
        deleteUnwastableList,
        updateUnwastableList,
        isBesty,
        createBestie,
        deleteBestie,
        isFollowingRestaurant,
        followRestaurant,
        unFollowRestaurant,
        getBestiesyUserId,
        isAlcoholic,
        getNotBesties,
        getRevenueByProduct,
        getDayRevenue,
        getDayAverage,
        getRevenueByProductsList,
        getRevenuPash,
        getBeverageSalesDaily,
        getBestSellers,
        getAllPicturesByUserId,
        getPicturesByUserId,
        getTaggedPicturesByUserId,
        createPostPhoto,
        open, 
        setOpen,
        anchorEl, 
        setAnchorEl,
        handleOpen,
        postPhoto, 
        setPostPhoto,
        getProductivity,
        getCustomerSatisfaction,
        getRatioFollowersByDay,
        followRestaurantRestaurant,
        unfollowRestaurantRestaurant,
        restaurantFollowUser,
        restaurantUnfollowUser,
        userIsFollowedByRestaurant,
        isFollowingRestaurantRestaurant,
        selectedProfile, 
        setSelectedProfile,
        restaurant, 
        setRestaurant,
        guestsList, 
        setGuestsList,
        getReservationByUserId,
        getReservationById,
        deleteReservation,
        getArticleOfPmById,
        updateReservation,
        getCommandeById,
        deleteCommande,
        getCategoryByArticle,
        getArticlesByRestaurantId,
        getUnwastableArticles,
        getSearchUnwastableArticles,
        getCategories,
        
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export { RestaurantContextProvider, RestaurantContext };
