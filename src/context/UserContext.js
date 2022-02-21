import React, { useState } from "react";
import {
  GET_USER_Followers,
  GET_USER,
  GET_USERS,
  GET_USER_FOLLOWING,
  RESTAURANT_FOLLOWED_BY_USERID,
  FOLLOW_USER_USER,
  FOLLOW_USER_RESTAURANT,
  UNFOLLOW_USER,
  UNFOLLOW_RESTAURANT,
  GET_CHECKINS_BY_USERID,
  GET_USER_FOLLOWERS_BY_USERID,
  GET_USER_FOLLOWING_BY_USERID,
  IS_FOLLOWING,
  GET_COMMANDES_BY_USERID,
  CREATE_COMMANDE,
  TAKTAK_POINTS_BY_USER,
  UPDATE_TAKTAK_POINTS_BY_USER,
  GET_UNWASTABLES,
  CREATE_UNWASTABLE_COMMANDE,
  NOTIF_NEW_POST,
  UPDATE_AVATAR,
  GET_PROFILE_COMPLETION,
  IMPROVE_PROFILE,
} from "../graphql/user/user";
import {
  GET_RESTAURANT,
  GET_RESTAURANTS,
  GET_RESTAURANT_FOLLOWERS,
  GET_RESTAURANT_FOLLOWING,
  RESTAURANT
} from "../graphql/restaurant/restaurant";
import { LOAD_ME, UPDATE_USER } from "../graphql/auth/mutations";
import client from "../apollo/client";
import {
  CREATE_POST,
  CREATE_POST_MEDIA,
  GET_FEED,
  UPDATE_ACCESS_POST
} from "../graphql/post/post";
import { 
  CONVERSATION_BY_USER_ID,
  SEND_MESSAGE,
  DELETE_CONVERSATION,
  THERE_IS_CONVERSATION,
  CONVERSATION_BY_ID,
} from "../graphql/chat/chat";
import { useQuery, gql, useSubscription } from "@apollo/client";

const UserContext = React.createContext();

function UserContextProvider({ children }) {
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [userFollowing, setUserFollowing] = useState(null);
  const [rFollowing, setrFollowing] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(null);
  const [authenticationSuccess, setAuthenticationSuccess] = useState(null);
  const [posts, setPosts] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [users, setUsers] = useState(null);
  const [unwastable, setUnwastable] = useState();
  const [usersCache, setUsersCache] = useState({});
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "",
    password: "",
    verifiedPassword: "",
    token: "",
  });
  const [errors, setErrors] = useState({
    signUpError: null,
    loginError: null,
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    passwordError: null,
    verifiedPassword: null,
    tokenError: null,
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remeberMe: false,
    keepMe: false,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [commande, setCommande] = useState({
    ownerFirstname: "",
    ownerLastName: "",
    articlesId: [],
    ownerPhoneNumber: "",
    ownerEmail: "",
    userId: "",
    adresse1: "",
    adresse2: "",
    description: "",
    commandeTakenMethod: "",
    paymentMethod: "",
    restaurantId: "",
    total_price: 0,
    articleOptions: [[]],
    timeCommande: 8, 
    winTak: false,
  });
  const [commandeUnwastable, setCommandeUnwastable] = useState({
    ownerFirstname: "",
    ownerLastName: "",
    articlesId: [],
    ownerPhoneNumber: "",
    ownerEmail: "",
    userId: "",
    adresse1: "",
    adresse2: "",
    description: "",
    paymentMethod: "",
    restaurantId: "",
    total_price: 0,
    quantity: [],
    unwastableMenuIds: [],
  });
  const [myCommandes, setMyCommandes] = useState(null);
  const [commandeResidu, setCommandeResidu] = useState({
    ownerFirstname: "",
    ownerLastName: "",
    articlesId: [],
    articles:[],
    ownerPhoneNumber: "",
    ownerEmail: "",
    userId: "",
    adresse1: "",
    adresse2: "",
    description: "",
    commandeTakenMethod: "",
    paymentMethod: "",
    restaurantId: "",
    total_price: 0,
    timeCommande: 8, 
    winTak: false,
    associationId: "",
  });
  
  const [activeUser, setActiveUser] = useState({
    userId: "",
    avatar: "",
    local: { email: "", password: "" },
    firstName: "activeUser",
    lastName: "activeUser",
    countPoints: 0,
    gender: "",
    tags: [],
    uFollowersCount: "",
    rFollowersCount: "",
    uFollowsCount: "",
    description: "",
    birthDate: "",
    birthDateDisplay: true,
    phoneNumber: "",
    city: "",
    languages: "",
    photos: "",
    stories: "",
    followers: "",
    following: "",
    isRestaurant: false,
    connectedRestaurentId: "",
    // resetPasswordToken: String
    // resetPasswordExpires: Float
    fullName: "",
    // isVerified: Boolean!
    // isOnline: Boolean!
    // isLocked: Boolean!
    // reason: String!
    // isActive: Boolean!
    // stripeId: String
    // type: UserType!
    // ccLast4: String
    // createdAt: String
    // updatedAt: String
    // deletedAt: String,
    __typename: "User",
  });

  const [loadCommande, setLoadCommande] = useState(false);

  const [followersUserList, setFollowersUserList] = useState([]);
  const [followersRestoList, setFollowersRestoList] = useState([]);
  const [followersList, setFollowersList] = useState([]);

  function toggleAuthentication() {
    setIsAuthenticated(!isAuthenticated);
  }

  async function getFollowers() {
    await client
      .query({
        query: GET_USER_Followers,
      })
      .then((data) => {
        data && setFollowers(data.data.userFollowers);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getUsers() {
    await client
      .query({
        query: GET_USERS,
      })
      .then(async (data) => {
        (await data) && setUsers(data.data.users);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function FollowRestaurant(id, restoId) {
    const data = {
      restaurantId: id,
      followerId: restoId,
    };
    await client
      .mutate({
        mutation: FOLLOW_USER_RESTAURANT,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        await client
          .query({
            query: GET_RESTAURANT,
            variables: {
              id: data.data.followRestaurant.restaurantId,
            },
          })
          .then(async (data) => {
            const RestaurantDetails = {
              _id: data.data.restaurant._id,
              name: data.data.restaurant.firstName,
              description: data.data.restaurant.description,
              location: data.data.restaurant.location,
              avatar: data.data.restaurant.avatar,
            };

            // following && setFollowing((prevState) => [...prevState, userDetails]);

            rFollowing &&
              setrFollowing((prevState) => [...prevState, RestaurantDetails]);
            console.log("New Restaurant Follower", rFollowing);
          });
      });
  }

  async function getFollowersByUserId(id, setData) {
    await client
      .query({
        query: GET_USER_FOLLOWERS_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        setData(data.data.followerByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getFollowing(id, isntme) {
    await client
      .query({
        query: GET_USER_FOLLOWING,
      })
      .then((data) => {
        data && setFollowing(data.data.userFollowing);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getFollowingByUserId(id, setData) {
    await client
      .query({
        query: GET_USER_FOLLOWING_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        setData(data.data.followingByUserId);
        data && setUserFollowing(data.data.followingByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getUserRestaurantFollowed(id, setData) {
    let followers;
    await client
      .query({
        query: RESTAURANT_FOLLOWED_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        followers = data.data.restaurantsFollowedByUserId;
        setData(data.data.restaurantsFollowedByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
      
      return followers
  }

  async function getRestaurantFollowers(id) {
    await client
      .query({
        query: GET_RESTAURANT_FOLLOWERS,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("Restaurantd followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRestaurantFollowing(id) {
    await client
      .query({
        query: GET_RESTAURANT_FOLLOWING,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("Restaurant followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function Followuser(id) {
    await client
      .mutate({
        mutation: FOLLOW_USER_USER,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        /*setFollowers(data.data.userFollowers)*/
        await client
          .query({
            query: GET_USER,
            variables: {
              id: data.data.followUser.userId,
            },
          })
          .then((data) => {
            const userDetails = {
              _id: data.data.user._id,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              avatar: data.data.user.avatar,
            };

            following &&
              setFollowing((prevState) => [...prevState, userDetails]);
          })
          .catch((err) => {
            console.log(err, "error load me on follow action");
          });
      });
  }

  async function unfollowUser(id) {
    await client
      .mutate({
        mutation: UNFOLLOW_USER,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        if (data.data.unfollowUser && following) {
          var array = [...following];
          let tab = array.map((el) => el._id);
          var index = tab.indexOf(tab[0]);
          if (index !== -1)
            //  following.splice(index,1)
            setFollowing((prev) => {
              return [...prev].splice(index, 1);
            });
        }
      });
  }

  async function getRestaurants() {
    await client
      .query({
        query: GET_RESTAURANTS,
      })

      .then(async (data) => {
        setRestaurants(data.data.restaurants);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getPosts(setData) {
    let arr;
    await client
      .query({
        query: GET_FEED,
      })
      .then(async (data) => {
        setData(data.data.postsFeed); 
        arr = await data.data.postsFeed.map(async (post) => {
          let item = {};
          if(post.isRestaurant){
            return await client
              .query({
                query: RESTAURANT,
                variables: {
                  id: post.userId,
                },
              })
              .then(async (user) => {
                const UserDetails = {
                  _id: user.data.restaurant._id,
                  firstName: user.data.restaurant.name,
                  avatar: user.data.restaurant.avatar,
                  location: user.data.restaurant.location,
                };
                item = { ...post, user: UserDetails };
                return item;
              })
              .catch((err) => {
                console.log(err, "err");
              });
          }else{
            return await client
            .query({
              query: GET_USER,
              variables: {
                id: post.userId,
              },
            })
            .then(async (user) => {
              const UserDetails = {
                _id: user.data.user._id,
                firstName: user.data.user.firstName,
                avatar: user.data.user.avatar,
                location: user.data.user.location,
              };
              item = { ...post, user: UserDetails };
              return item;
            })
            .catch((err) => {
              console.log(err, "err");
            });
          }
        });
        arr = await Promise.all(arr);
      });

    return arr;
  }

  async function updateAccessPost(id, accessType) {
    await client
      .mutate({
        mutation: UPDATE_ACCESS_POST,
        variables: {
          id: id,
          accessType: accessType
        },
      })
      .then(async (res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function unFollowRestaurant(id) {
    await client
      .mutate({
        mutation: UNFOLLOW_RESTAURANT,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        //Remove Restaurant Following
      });
  }

  async function loaduser() {
    const accessToken = localStorage.getItem("accessToken");
    await client
      .query({
        query: LOAD_ME,
        context: {
          headers: {
            "access-token": accessToken,
          },
        },
      })
      .then((data) => {
        setIsAuthenticated(true);
        setActiveUser((user) => {
          return {
            ...user,
            avatar: data.data.me.avatar,
            userId: data.data.me._id,
            local: data.data.me.local,
            firstName: data.data.me.firstName,
            lastName: data.data.me.lastName,
            gender: data.data.me.gender,
            tags: data.data.me.tags,
            taktakPointId: data.data.me.taktakPointId,
            uFollowersCount: data.data.me.uFollowersCount,
            rFollowersCount: data.data.me.rFollowersCount,
            uFollowsCount: data.data.me.uFollowsCount,
            description: data.data.me.description,
            birthDate: data.data.me.birthDate,
            phoneNumber: data.data.me.phoneNumber,
            location: data.data.me.location,
            city: data.data.me.city,
            languages: data.data.me.languages,
            photos: data.data.me.photos,
            stories: data.data.me.stories,
            followers: data.data.me.followers,
            following: data.data.me.following,
            // resetPasswordToken: String
            // resetPasswordExpires: Float
            fullName: data.data.me.fullName,
            // isVerified: Boolean!
            // isOnline: Boolean!
            // isLocked: Boolean!
            // reason: String!
            // isActive: Boolean!
            // stripeId: String
            // type: UserType!
            // ccLast4: String
            // createdAt: String
            // updatedAt: String
            // deletedAt: String
          };
        });
        getFollowing(data.data.me._id);
        getTaktakPointsByUser();
        let id = data.data.me._id;
        return id;
      })

      .then(async (id) => {
        getFollowers(id);
        return id;
      })
      .then(async (id) => {
        getUserRestaurantFollowed(id);
        return id;
      })
      .then(async (id) => {
        return id;
      })
      .catch((err) => {
        alert(err);
        setIsAuthenticated(false);
      });
  }

  async function updateAvatar (userId, file) {

    await client
      .mutate({
        mutation: UPDATE_AVATAR,
        variables: {
          id: userId,
          file: file,
        },
      })
      .then(async (data) => {
        console.log("dataaa:", data);
      });
  }

  async function createPostText(postForm, activeUser) {
    let dataPost 
    if(activeUser.isRestaurant){
      dataPost = {
        taggedUsers: postForm.taggedUser,
        taggedRestaurant: postForm.taggedRestaurant,
        title: postForm.title,
        postType: postForm.postType,
        content: postForm.content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.connectedRestaurentId,
        accessType: postForm.accessType,
      }
    }else{
      dataPost = {
        taggedUsers: postForm.taggedUser,
        taggedRestaurant: postForm.taggedRestaurant,
        title: postForm.title,
        postType: postForm.postType,
        content: postForm.content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.userId,
        accessType: postForm.accessType,
      }
    }
    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        (await data) && setPosts(data.data.createPost);
      });
  }

  async function createPostPromoFlash(postForm, type, activeUser) {
    let dataPost 
    if(activeUser.isRestaurant){
      dataPost = {
        taggedUsers: postForm.taggedUsers,
        taggedRestaurant: postForm.taggedRestaurant,
        title: postForm.title,
        postType: type,
        content: postForm.content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.connectedRestaurentId,
        accessType: postForm.accessType,
        articlesId: postForm.articlesId,
        duration: postForm.duration,
        promoValue: parseInt(postForm.promoValue),
        dateFrom: postForm.dateFrom.getDate() + "/" + (postForm.dateFrom.getMonth() + 1) + "/" + postForm.dateFrom.getFullYear(),
        dateTo: postForm.dateTo.getDate() + "/" + (postForm.dateTo.getMonth() + 1) + "/" + postForm.dateTo.getFullYear(),
      }
    }else{
      dataPost = {
        taggedUsers: postForm.taggedUsers,
        taggedRestaurant: postForm.taggedRestaurant,
        title: postForm.title,
        postType: type,
        content: postForm.content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.userId,
        accessType: postForm.accessType,
        articlesId: postForm.articlesId,
        duration: postForm.duration,
        promoValue: parseInt(postForm.promoValue),
        dateFrom: postForm.dateFrom.getDate() + "/" + (postForm.dateFrom.getMonth() + 1) + "/" + postForm.dateFrom.getFullYear(),
        dateTo: postForm.dateTo.getDate() + "/" + (postForm.dateTo.getMonth() + 1) + "/" + postForm.dateTo.getFullYear(),
      }
    }
    
    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        (await data) && setPosts(data.data.createPost);
      });
  }

  async function createPostQuestion(inputData, accessType, activeUser) {
    let dataPost
    if(activeUser.isRestaurant){
      dataPost = {
        title: inputData.title,
        postType: "QUESTION",
        content: inputData.content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.connectedRestaurentId,
        accessType: accessType,
      }
    }else{
      dataPost = {
        title: inputData.title,
        postType: "QUESTION",
        content: inputData.content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.userId,
        accessType: accessType,
      }
    }
    
    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        (await data) && setPosts(data.data.createPost);
      });
  }

  async function createPostImage(
    taggedRestaurant,
    title,
    content,
    postType,
    taggedUsers,
    accessType,
    media,
    activeUser
  ) {
    const url = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_POST_MEDIA,
          variables: {
            file: media[0],
          },
        })
        .then((res) => {
          console.log("dataRes", res.data);
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    let dataPost
    const mediaItem = {
      url: url,
      type: "IMAGE"
    }
    if(activeUser.isRestaurant){
      dataPost = {
        media: mediaItem,
        taggedUsers: taggedUsers,
        taggedRestaurant: taggedRestaurant,
        title: title,
        postType: postType,
        content: content,
        accessType: accessType,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.connectedRestaurentId
      }
    }else{
      dataPost = {
        media: mediaItem,
        taggedUsers: taggedUsers,
        taggedRestaurant: taggedRestaurant,
        title: title,
        postType: postType,
        content: content,
        accessType: accessType,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.userId
      }
    }
    
    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        console.log("POstDATAtext", data);
        (await data) && setPosts(data.data.createPost);
      });
  }

  async function createPost(
    taggedRestaurant,
    title,
    content,
    postType,
    taggedUsers,
    media,
    accessType,
    activeUser
  ) {

    let dataPost
    if(activeUser.isRestaurant){
      dataPost = {
        media: media,
        taggedUsers: taggedUsers,
        taggedRestaurant: taggedRestaurant,
        title: title,
        postType: postType,
        content: content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.connectedRestaurentId,
        accessType: accessType,
      }
    }else{
      dataPost = {
        media: media,
        taggedUsers: taggedUsers,
        taggedRestaurant: taggedRestaurant,
        title: title,
        postType: postType,
        content: content,
        isRestaurant: activeUser.isRestaurant,
        userId: activeUser.userId,
        accessType: accessType,
      };
    }

    dataPost.media = await Promise.all(
      dataPost.media
        .map(async (media) => {
          const url = await new Promise((resolve, reject) => {
            client
              .mutate({
                mutation: CREATE_POST_MEDIA,
                variables: {
                  file: media,
                },
              })
              .then((res) => {
                if (res.data && res.data.createPostMedia) {
                  resolve(res.data.createPostMedia);
                } else reject("http://test.com");
              });
          });
          const mediaItem={
            url: url,
            type: "IMAGE"
          }
          return mediaItem;
        })
        .filter((res) => res != null)
    );

    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        (await data) && setPosts(data.data.createPost);
      });
  }

  const [userById, setUserById] = useState({
    userId: "1",
    avatar: "https://picsum.photos/200/300",
    local: { email: "", password: "" },
    firstName: "none",
    lastName: "none",
    gender: "",
    tags: "",
    uFollowersCount: "",
    rFollowersCount: "",
    uFollowsCount: "",
    description: "",
    birthDate: "",
    phoneNumber: "",
    city: "",
    languages: "",
    photos: "",
    stories: [],
    followers: "",
    following: "",
    // resetPasswordToken: String
    // resetPasswordExpires: Float
    fullName: "",
    // isVerified: Boolean!
    // isOnline: Boolean!
    // isLocked: Boolean!
    // reason: String!
    // isActive: Boolean!
    // stripeId: String
    // type: UserType!
    // ccLast4: String
    // createdAt: String
    // updatedAt: String
    // deletedAt: String
  });

  async function loadUserById(userId, setTheUser) {
    await client
      .query({
        query: GET_USER,
        variables: {
          id: userId,
        },
      })
      .then(async (data) => {
        if (data.data.user) {
          await setTheUser((user) => {
            return {
              ...user,
              userId: data.data.user._id,
              avatar: data.data.user.avatar,
              local: data.data.user.local,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              gender: data.data.user.gender,
              tags: data.data.user.tags,
              uFollowersCount: data.data.user.uFollowersCount,
              rFollowersCount: data.data.user.rFollowersCount,
              uFollowsCount: data.data.user.uFollowsCount,
              description: data.data.user.description,
              birthDate: data.data.user.birthDate,
              phoneNumber: data.data.user.phoneNumber,
              city: data.data.user.city,
              location: data.data.user.location,
              languages: data.data.user.languages,
              photos: data.data.user.photos,
              stories: data.data.user.stories,
              followers: data.data.user.followers,
              following: data.data.user.following,
              // resetPasswordToken: String
              // resetPasswordExpires: Float
              fullName: data.data.user.fullName,
              // isVerified: Boolean!
              // isOnline: Boolean!
              // isLocked: Boolean!
              // reason: String!
              // isActive: Boolean!
              // stripeId: String
              // type: UserType!
              // ccLast4: String
              // createdAt: String
              // updatedAt: String
              // deletedAt: String
            };
          });
          // console.log("idd", data.data.user._id, userId);
          getFollowingByUserId(userId);
          return userId;
        }
      })

      .then(async (userId) => {
        getFollowersByUserId(userId);
        return userId;
      })
      .then(async (userId) => {
        getUserRestaurantFollowed(userId);
        return userId;
      })
      .then(async (userId) => {
        return userId;
      })
      .catch((err) => {
        alert(err);
      });
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoginForm({
      email: "",
      password: "",
      remeberMe: false,
      keepMe: false,
    });
    toggleAuthentication();
    client.resetStore();
  }

  async function getCheckinsByUserId(id, setCheckins) {
    await client
      .query({
        query: GET_CHECKINS_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        console.log(data.data.checkInsByUserId);
        setCheckins(data.data.checkInsByUserId);
      })
      .catch((err) => {
        console.log(err, "checkins error");
      });
  }

  async function updateProfile(id, data) {
    await client
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (res) => {
        console.log(res);
        setActiveUser((user) => {
          return {
            ...user,
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            birthDate: data.birthDate,
            location: data.location,
            city: data.city,
            languages: data.languages,
            email: data.email,
            phoneNumber: data.phoneNumber,
            tags: data.tags,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function isFollowing(id, setData) {
    await client
      .query({
        query: IS_FOLLOWING,
        variables: {
          actionId: id,
        },
      })
      .then((data) => {
        setData(data.data.isFollowing);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function QueryGetUserById(userId) {
    await client
      .query({
        query: GET_USER,
        variables: {
          id: userId,
        },
      })
      .then(async (data) => {
        console.log("QueryGetUserById", data);
        // if (data.data.user) {

        //   return data.data.user;
        // }
      });
  }

  async function getUserById(userId) {
    let user;
    if (usersCache[userId]) {
      user = usersCache[userId];
    } else {
      QueryGetUserById({ variables: { userId } }).then((res) => {
        let allUsers = { ...usersCache, [userId]: res.data.user };
        setUsersCache(allUsers);
        user = res.data.user;
      });
    }
    return user;
  }

  async function createCommande(inputData) {

    const data = {
      ownerFirstname: inputData.ownerFirstname,
      articlesId: inputData.articlesId,
      ownerPhoneNumber: inputData.ownerPhoneNumber,
      ownerEmail: inputData.ownerEmail,
      ownerLastName: inputData.ownerLastName,
      userId: inputData.userId,
      adresse1: inputData.adresse1,
      adresse2: inputData.adresse2,
      description: inputData.description,
      commandeTakenMethod: inputData.commandeTakenMethod,
      paymentMethod: inputData.paymentMethod,
      restaurantId: inputData.restaurantId,
      total_price: inputData.total_price,
      timeCommande: inputData.timeCommande,
      usePointTaktak: inputData.usePointTaktak,
      isUnwastable: false
    };
    
    await client
      .mutate({
        mutation: CREATE_COMMANDE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("createCommande", data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getCommande(id, setData) {
    await client
      .query({
        query: GET_COMMANDES_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then(async (data) => {
        setData(data.data.commandeByUserId);
        setMyCommandes(data.data.commandeByUserId);
      });
  }

  async function getTaktakPointsByUser() {
    await client
      .query({ 
        query: TAKTAK_POINTS_BY_USER,
      })
      .then((data) => {
        if(data.data.taktakPointsByUser.countPoints){
          setActiveUser((user) => {
            return {
              ...user,
              countPoints: data.data.taktakPointsByUser.countPoints
            };
          });
        }else{
          setActiveUser((user) => {
            return {
              ...user,
              countPoints: 0
            };
          });
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function updateTaktakPoints(id, points) {
    await client
      .mutate({
        mutation: UPDATE_TAKTAK_POINTS_BY_USER,
        variables: {
          userId: id,
          countPoints: points,
        },
      })
      .then(async (data) => {
        console.log("taktak points", data.data.updateTaktakPointsByUser);
        setActiveUser((user) => {
          return {
            ...user,
            countPoints: points
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUnwastables(setData) {
    await client
      .query({
        query: GET_UNWASTABLES,
      })
      .then(async (data) => {
        setData(data.data.unwastables);
        setUnwastable(data.data.unwastables);
      });
  }

  async function createUnwastableCommande(inputData) {
    const data = {
      userId: inputData.userId,
	    restaurantId: inputData.restaurantId,
      ownerFirstname: inputData.ownerFirstname,
      ownerLastName: inputData.ownerLastName,
      ownerEmail: inputData.ownerEmail,
      ownerPhoneNumber: inputData.ownerPhoneNumber,
      description: inputData.description,
      adresse1: inputData.adresse1,
      adresse2: inputData.adresse2,
      commandeTakenMethod: inputData.commandeTakenMethod,
      paymentMethod:inputData.paymentMethod,
      status: inputData.status,
      usePointTaktak: inputData.winTak,
      timeCommande: inputData.timeCommande,
      articlesId: inputData.articlesId, 
      unwastableArticleC: inputData.articlesC,
      total_price: inputData.total_price,
      isUnwastable: true
    }

    await client
      .mutate({
        mutation: CREATE_UNWASTABLE_COMMANDE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("createCommande", data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getNotifNewPost() {
    console.log("step2")
      await client
      .subscribe( NOTIF_NEW_POST)
      .then(async (data) => {
        console.log("notiiiiiifff:", data)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  async function getConversationByUserId(userId, setData) {
    await client
      .query({
        query: CONVERSATION_BY_USER_ID,
        variables: {
          userId: userId,
        },
      })
      .then((data) => {
        setData(data.data.conversationsByUserId);
      })
      .catch((err) => {
        console.log(err, "conversations error");
      });
  }

  async function createMessage(inputData) {
    const data = {
      text: inputData.text,
      conversationId: inputData.conversationId,
      createdBy: inputData.createdBy,
      isRestaurant: inputData.isRestaurant
    };
    
    await client
      .mutate({
        mutation: SEND_MESSAGE,
        variables: {
          input: data,
        },
      })
      .then((data) => {
        setMessages([...messages, data.data.sendMessage])
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const [messagesList, setMessagesList] = useState([]);
  const [messagesList2, setMessagesList2] = useState([]);
  const [messagesList3, setMessagesList3] = useState([]);
  async function sendMessage(inputData, index) {
    const data = {
      text: inputData.text,
      conversationId: inputData.conversationId,
      createdBy: inputData.createdBy,
      isRestaurant: inputData.isRestaurant
    };
    
    await client
      .mutate({
        mutation: SEND_MESSAGE,
        variables: {
          input: data,
        },
      })
      .then((data) => {
        if(index === 0){
          setMessagesList([...messagesList, data.data.sendMessage])
        }else if(index === 1){
          setMessagesList2([...messagesList2, data.data.sendMessage])
        }else if(index === 2){
          setMessagesList3([...messagesList3, data.data.sendMessage])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteConversation(id, setData) {
		await client
			.mutate({
				mutation: DELETE_CONVERSATION,
				variables: {
					_id: id,
				},
			})
			.then(async (data) => {
				setData((prevData) => {
					let items = [...prevData];
					const indexItem = items.findIndex((el) => el._id === id);
					items.splice(indexItem, 1);
					return items;
				});
			})
			.catch((err) => {
				console.log(err, "error delete post");
			});
	}

  const [conversation, setConversation] = useState(null);
  async function getConversation(input) {
    let conversationData;
    await client
      .query({
        query: THERE_IS_CONVERSATION,
        variables: {
          input: input,
        },
      })
      .then((data) => {
        conversationData = data.data.thereIsConversation;
        setConversation(data.data.thereIsConversation);
      })
      .catch((err) => {
        console.log(err, "conversations error");
      });

      return conversationData;
  }

  async function getConversationById(id, setData) {
    let conversationData;
    await client
      .query({
        query: CONVERSATION_BY_ID,
        variables: {
          _id: id,
        },
      })
      .then((data) => {
        conversationData = data.data.conversationById;
        setData(data.data.conversationById);
      })
      .catch((err) => {
        console.log(err, "conversations error");
      });

      return conversationData;
  }

  async function getProfileCompletion(setData) {
    await client
      .query({
        query: GET_PROFILE_COMPLETION,
        variables: {},
      })
      .then((data) => {
        setData(data.data.profileCompletion);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function improveProfile(setData) {
    await client
      .query({
        query: IMPROVE_PROFILE,
        variables: {},
      })
      .then((data) => {
        setData(data.data.improveProfil);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  return (
    <UserContext.Provider
      value={{
        getUnwastables,
        setUnwastable,
        unwastable,
        createCommande,
        getCommande,
        myCommandes,
        setMyCommandes,
        commande,
        setCommande,
        followers,
        following,
        userFollowers,
        userFollowing,
        setUserFollowing,
        setUserFollowers,
        setFollowers,
        setFollowing,
        getFollowers,
        getFollowing,
        getFollowingByUserId,
        getFollowersByUserId,
        getRestaurantFollowers,
        getUserRestaurantFollowed,
        rFollowing,
        setrFollowing,
        createPost,
        Followuser,
        getRestaurantFollowing,
        FollowRestaurant,
        unfollowUser,
        unFollowRestaurant,
        loaduser,
        userById,
        setUserById,
        activeUser,
        setActiveUser,
        logout,
        loadUserById,
        errors,
        setErrors,
        setAuthenticationSuccess,
        authenticationError,
        setAuthenticationError,
        signUpForm,
        setSignUpForm,
        loginForm,
        setLoginForm,
        authenticationSuccess,
        toggleAuthentication,
        isAuthenticated,
        setIsAuthenticated,
        getPosts,
        posts,
        getRestaurants,
        restaurants,
        setRestaurants,
        getUsers,
        users,
        setUsers,
        createPostText,
        createPostImage,
        getCheckinsByUserId,
        selectedUser,
        setSelectedUser,
        updateProfile,
        isFollowing,
        getUserById,
        createCommande,
        getCommande,
        commande,
        setCommande,
        getTaktakPointsByUser,
        updateTaktakPoints,
        loadCommande,
        setLoadCommande,
        createUnwastableCommande,
        commandeUnwastable,
        setCommandeUnwastable,
        createPostQuestion,
        updateAccessPost,
        getNotifNewPost,
        updateAvatar,
        conversations, 
        setConversations,
        getConversationByUserId,
        createMessage,
        messages, 
        setMessages,
        deleteConversation,
        followersUserList, 
        setFollowersUserList,
        followersRestoList, 
        setFollowersRestoList,
        followersList, 
        setFollowersList,
        getConversation,
        conversation,
        getConversationById,
        sendMessage,
        messagesList, 
        setMessagesList,
        messagesList2, 
        setMessagesList2,
        messagesList3, 
        setMessagesList3,
        getProfileCompletion,
        improveProfile,
        commandeResidu, 
        setCommandeResidu,
        createPostPromoFlash,

      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
