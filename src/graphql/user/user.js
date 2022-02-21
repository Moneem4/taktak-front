import { gql } from "@apollo/client";

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($id: ID!, $file: Upload!) {
    updateAvatar(_id: $id, file: $file)
  }
`;

export const GET_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      local {
        email
      }
      firstName
      lastName
      avatar
      description
      birthDate
      birthDateDisplay
      location
      city
      phoneNumber
      languages
      tags
      stories {
        _id
      }
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      _id

      firstName
      lastName

      city
      avatar
    }
  }
`;

export const GET_USER_Followers = gql`
  query userFollowers {
    userFollowers {
      _id
      firstName
      avatar
      location
      city
    }
  }
`;

export const GET_USER_FOLLOWERS_BY_USERID = gql`
  query followerByUserId($userId: ID!) {
    followerByUserId(userId: $userId) {
      _id
      firstName
      avatar
      location
      city
    }
  }
`;

export const GET_USER_FOLLOWING_BY_USERID = gql`
  query followingByUserId($userId: ID!) {
    followingByUserId(userId: $userId) {
      _id
      firstName
      avatar
      location
      city
    }
  }
`;

export const GET_USER_FOLLOWING = gql`
  query userFollowing {
    userFollowing {
      _id
      firstName
      avatar
      location
      city
    }
  }
`;

export const RESTAURANT_FOLLOWED_BY_USERID = gql`
  query restaurantsFollowedByUserId($userId: ID!) {
    restaurantsFollowedByUserId(userId: $userId) {
      _id
      name
      description
      avatar
      backgroundImage

      restaurantRate
      location
    }
  }
`;

export const RESTAURANT_BY_RESTAURANT_ID = gql`
  query  restaurant($id: ID!) {
    restaurant(_id: $id) {
      _id
      userId
      name
      avatar
      address
      location
      promoImage
      description
      openingTime {
        timeFrom
        timeTo
        days
      }
      specialty
      averageCost
      payment
      services
      phone

    }
  }
`;

export const RESTAURANT = gql`
  query restaurant($id: ID!) {
    restaurant(_id: $id) {
      _id
      userId
      name
      avatar
      address
      location
      promoImage
      description
      openingTime {
        timeFrom
        timeTo
        days
      }
      specialty
      averageCost
      payment
      services
      phone
    }
  }
`;

export const CREATE_RESTAURANT = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      _id
      createdAt
    }
  }
`;

export const FOLLOW_USER_USER = gql`
  mutation followUser($actionId: ID!) {
    followUser(actionId: $actionId) {
      _id
      followerId
      userId
    }
  }
`;

export const FOLLOW_USER_RESTAURANT = gql`
  mutation followRestaurant($input: CreateRestaurantFollowerInput!) {
    followRestaurant(input: $input) {
      _id
      followerId
      restaurantId
    }
  }
`;

export const GET_CHECKINS_BY_USERID = gql`
  query checkInsByUserId($userId: ID!) {
    checkInsByUserId(userId: $userId) {
      _id
      location
      userId
      restaurantId
    }
  }
`;

export const UNFOLLOW_RESTAURANT = gql`
  mutation unfollowRestaurant($actionId: ID!) {
    unfollowUser(actionId: $actionId)
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser($actionId: ID!) {
    unfollowUser(actionId: $actionId)
  }
`;

export const GET_RESTO_FOLLOWERS = gql`
  query restaurantFollowers($restaurantId: ID!) {
    restaurantFollowers(restaurantId: $restaurantId) {
      _id
      firstName
      lastName
      avatar
      location
      __typename
    }
  }
`;

export const UPDATE_RESTAURANT = gql`
  mutation updateRestaurant($id: ID!, $input: UpdateRestaurantInput!) {
    updateRestaurant(_id: $id, input: $input)
  }
`;

export const RESTAURANT_BY_USER_ID = gql`
  query restaurantByUserId($userId: ID!) {
    restaurantByUserId(userId: $userId) {
      _id
      userId
      name
      avatar
      __typename
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id:ID!, $input: UpdateUserInput! ) {
    updateUser(_id: $id, input: $input)
  }
`;

export const IS_FOLLOWING = gql`
  query isFollowing($actionId: ID!) {
    isFollowing(actionId: $actionId)
  }
`;

export const CREATE_COMMANDE = gql`
  mutation createCommande($input: CreateCommandeInput!) {
    createCommande(input: $input) {
      _id
      status
    }
  }
`;

export const GET_COMMANDES_BY_USERID = gql`
  query commandeByUserId ($userId: ID!){
    commandeByUserId(userId: $userId) {
      _id
      userId
      status
      paymentMethod
      commandeTakenMethod
      adresse1
      total_price
      createdAt
      unwastableArticleC {
        _id
        name
        ingredients
        duration
        image
        quantity
        price
      }
      articlesC {
        _id
        name
        categoryId
        categoryName
        personalizedMenuId
        articleId
        article{
          _id
          name
          categoryId
        }
        quantity
        ingredients
        newIngredients
        articleOptions{
          _id
          articleId
          optionName
          optionType
          optionAvatar
          optionPrice
        }
        price
        size
        residuePrice
        duration
        image
        rate
      }
      restaurant {
        _id
        name
        avatar
        location
        specialty
      } 
    }
  }
`;

export const TAKTAK_POINTS_BY_USER = gql`
  query taktakPointsByUser {
    taktakPointsByUser {
      _id,
      userId,
	    countPoints
    }
  }
`;

export const UPDATE_TAKTAK_POINTS_BY_USER = gql`
  mutation updateTaktakPointsByUser($userId: ID! $countPoints: Int!) {
    updateTaktakPointsByUser(userId: $userId, countPoints: $countPoints)
  }
`;

export const GET_UNWASTABLES = gql`
  query unwastables {
    unwastables{
      _id
      restaurantId
      restaurant{_id,name}
      list {
        _id
        articles {
          _id
          article {
            _id
            name
            image
            ingredients
            duration
            categoryId
          }
          quantity
          price
        }
      }
    }
  }
`;

export const CREATE_UNWASTABLE_COMMANDE = gql`
  mutation createUnwastableCommande($input: CreateUnwastableCommandeInput!) {
    createUnwastableCommande(input: $input) {
      _id
      status
    }
  }
`;

export const NOTIF_NEW_POST = gql`
  subscription NewPost {
    newPost{
      _id
	    userId
	    title
    }
  }
`;

export const GET_PROFILE_COMPLETION = gql`
  query profileCompletion {
    profileCompletion {
      firstName
      lastName
      location
      city
      email
      birthDate
      phoneNumber
      avatar
      description
      favouriteDishes
    }
  }
`;

export const IMPROVE_PROFILE = gql`
  query improveProfil {
    improveProfil {
      follow10Restaurants
      follow10Users
      posterStory 
      posterArticle
      recommendRestaurant 
      downloadApp
      addReview 
      createPostMedia
      eatWithStranger
      makeDonation
    }
  }
`;
