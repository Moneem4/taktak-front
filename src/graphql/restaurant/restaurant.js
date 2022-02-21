import { gql } from "@apollo/client";

export const GET_RESTAURANT = gql`
  query restaurant($id: ID!) {
    restaurant(_id: $id) {
      _id
      name
      avatar
      description
      location
    }
  }
`;

export const GET_RESTAURANTS_BY_IDS = gql`
  query restaurant($ids: [ID!]) {
    restaurantsByIds(ids: $ids) {
      _id
      name
      avatar
      description
      location
      backgroundImage
      restaurantRate
      openingTime {
        days
        timeFrom
        timeTo
      }
      services
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query restaurants {
    restaurants {
      _id
      name
      avatar
      backgroundImage
      description
      location
    }
  }
`;

export const GET_RESTAURANT_FOLLOWERS = gql`
  query restaurantFollowers($restaurantId: ID!) {
    restaurantFollowers(restaurantId: $restaurantId) {
      _id
    }
  }
`;

export const GET_RESTAURANT_FOLLOWING = gql`
  query restaurantFollowing($restaurantId: ID!) {
    restaurantFollowing(restaurantId: $restaurantId) {
      _id
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
      backgroundImage
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
      menuId
      photos
      tags
      countVotes
      restaurantRate
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
      address
      name
      userId
      name
      phone
      avatar
      backgroundImage
      location
      country
      restaurantRate
      promoImage
      countVotes
      description
      tags
      specialty
      averageCost
      menuId
      menu {
        _id
        restaurantId
        categoriesId
        categories {
          _id
          name
          menuId
          articles {
            duration
            _id
            categoryId
            name
            price
            quantity
            image
            articleRate
            ingredients
            newIngredients
            updatedAt
            createdAt
          }
          articlesId
          createdAt
          updatedAt
          deletedAt
        }
        createdAt
        deletedAt
        updatedAt
      }
    }
  }
`;

export const MENU_BY_ID = gql`
  query menuById($menuId: ID!) {
    menuById(_id: $menuId) {
      _id
      categories {
        _id
        name
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      _id
      menuId
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(_id: $id)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(_id: $id, input: $input)
  }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      _id
      categoryId
      name
      ingredients
      price
      duration
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: ID!, $input: UpdateArticleInput!) {
    updateArticle(_id: $id, input: $input)
  }
`;

export const CATEGORY_BY_ID = gql`
  query categoryById($id: ID!) {
    categoryById(_id: $id) {
      _id
      menuId
      name
      articles {
        _id
        name
        ingredients
        price
        duration
        image
        articleRate
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(_id: $id)
  }
`;

export const ADD_ARTICLE_TO_PERSONALIZED_MENU = gql`
  mutation addArticleToPersonalizedMenu($restaurantId: ID!, $articleId: ID!) {
    addArticleToPersonalizedMenu(
      restaurantId: $restaurantId
      articleId: $articleId
    )
  }
`;

export const DELETE_ARTICLE_FROM_PM = gql`
  mutation deleteArticleFromPm($id: ID!) {
    deleteArticleFromPm(_id: $id)
  }
`;

export const PERSONALIZED_MENU_BY_ID = gql`
  query personalizedMenuById($id: ID!) {
    personalizedMenuById(_id: $id) {
      _id
      userId
      restaurantId
      articlesOfPmId
    }
  }
`;

export const UPDATE_ARTICLE_Of_PM = gql`
  mutation updateArticleOfPm($id: ID!, $input: UpdateArticleOfPmInput!) {
    updateArticleOfPm(_id: $id, input: $input)
  }
`;

export const DELETE_PERSONALIZED_MENU = gql`
  mutation deletePersonalizedMenu($id: ID!) {
    deletePersonalizedMenu(_id: $id)
  }
`;

export const PM_BY_USER_ID_RESTAURANT_ID = gql`
  query personalizedMenuByUserIdRestaurantId($userId: ID!, $restaurantId: ID!) {
    personalizedMenuByUserIdRestaurantId(
      userId: $userId
      restaurantId: $restaurantId
    ) {
      _id
      userId
      restaurantId
      articlesId
      articles {
        _id
        name
        categoryId
        ingredients
        price
        quantity
        image
        duration
        articleOptions{
          _id
          articleId
          optionName
          optionType
          optionAvatar
          optionPrice
        }
        createdAt
      }
      articlesOfPmId
      createdAt
    }
  }
`;

export const ARTICLES_OF_PM_BY_PERSONALIZED_MENU = gql`
  query articlesOfPmByPersonalizedMenu($personalizedMenuId: ID!) {
    articlesOfPmByPersonalizedMenu(personalizedMenuId: $personalizedMenuId) {
      _id
      name
      articleId
      ingredients
      newIngredients
      duration
      image
      quantity
      price
      rate
      articleOptions {
        _id
        optionName
        optionPrice
        optionAvatar
      }
      article {
        articleOptions {
          _id
          optionName
          optionAvatar
          optionPrice
        }
      }
    }
  }
`;

export const PM_BY_USER_ID = gql`
  query personalizedMenuByUserId($userId: ID!) {
    personalizedMenuByUserId(userId: $userId) {
      _id
      userId
      restaurantId
      articlesOfPmId
    }
  }
`;

export const UPDATE_ARTICLE_AVATAR = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const UPDATE_RESTAURANT_AVATAR = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const UPDATE_RESTAURANT_BACKGROUND_IMAGE = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const CREATE_ARTICLE_OPTION = gql`
  mutation createArticleOption($input: [CreateArticleOptionInput]!) {
    createArticleOption(input: $input) {
      _id
      articleId
      optionName
      optionType
      optionAvatar
      optionPrice
    }
  }
`;

export const ARTICLE_OPTION_BY_ARTICLE_ID = gql`
  query articleOptionByArticleId($articleId: ID!) {
    articleOptionByArticleId(articleId: $articleId) {
      _id
      articleId
      optionName
      optionType
      optionAvatar
      optionPrice
    }
  }
`; 

export const UPDATE_ARTICLE_OPTIONS = gql`
  mutation updateArticleOptions(
    $input: [UpdateArticleOptionInput]!
    $articleId: ID!
  ) {
    updateArticleOptions(input: $input, articleId: $articleId)
  }
`;

export const SEARCH_RESTAURANT_BY_KEYWORD = gql`
  query searchByKeyWord($word: String!) {
    searchByKeyWord(word: $word) {
      _id
      userId
      name
      avatar
      backgroundImage
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
      menuId
      photos
      tags
      countVotes
      restaurantRate
    }
  }
`;

export const RATINGS_BY_RESTAURANT_ID = gql`
  query ratingsByRestaurantId($restaurantId: ID!) {
    ratingsByRestaurantId(restaurantId: $restaurantId) {
      _id
      userId
      rateValue
      comment
      ratingLikes {
        _id
        userId
        ratingId
      }
      ratingComments {
        _id
        userId
        ratingId
        content
      }
      createdAt
    }
  }
`;

export const CREATE_RATING_LIKE = gql`
  mutation createRatingLike($input: CreateRatingLikeInput!) {
    createRatingLike(input: $input) {
      _id
      userId
      ratingId
    }
  }
`;

export const DELETE_RATING_LIKE = gql`
  mutation deleteRatingLike($id: ID!) {
    deleteRatingLike(_id: $id)
  }
`;

export const CREATE_RATING_COMMENT = gql`
  mutation createRatingComment($input: CreateRatingCommentInput!) {
    createRatingComment(input: $input) {
      _id
      userId
      ratingId
      content
    }
  }
`;

export const PROMOTION_RESTAURANT_BY_ID = gql`
  query promotionRestaurantById($restaurantid: ID!) {
    promotionRestaurantById(restaurantid: $restaurantid) {
      _id
      restaurant {
        _id
        name
      }
      name
      description
    }
  }
`;

export const PERSONALIZED_MENU_BY_USER_ID_RESTAURANT_ID = gql`
  query personalizedMenuByUserIdRestaurantId($userId: ID!, $restaurantId: ID!) {
    personalizedMenuByUserIdRestaurantId(
      userId: $userId
      restaurantId: $restaurantId
    ) {
      _id
      userId
      restaurantId
      articlesId
      articles {
        _id
        name
        categoryId
        ingredients
        price
        quantity
        image
        duration
        articleOptions{
          _id
          articleId
          optionName
          optionType
          optionAvatar
          optionPrice
        }
        createdAt
      }
      articlesOfPmId
      createdAt
    }
  }
`;

export const CREATE_RESERVATION = gql`
  mutation createReservation($input: CreateReservationInput!) {
    createReservation(input: $input) {
      _id
      userId
      restaurant{
        _id
        name
        phone
        avatar
        backgroundImage
        description
        location
        tags
        specialty
        payment
      }
      date
      confirmation
    }
  }
`;

export const RESERVATION_BY_RESTAURANT_ID = gql`
  query reservationByRestaurantId($restaurantId: ID!) {
    reservationByRestaurantId(restaurantId: $restaurantId) {
      _id
      userId
      restaurant {
        _id
        userId
        name
        phone
        avatar
        backgroundImage
        address
        location
        country
        restaurantRate
      }
      date
      timeFrom
      peopleNumber
      promotion {
        _id
        name
      }
      payment
      guests {
        lastName
        firstName
        avatar
      }
      usePointTaktak
      confirmation
      note
      status
      personalizedMenu {
        _id
        userId
        restaurantId
        articles {
          _id
          name
        }
        articlesId
        articlesOfPmId
      }
      createdAt
    }
  }
`;

export const RESTAURANT_LAST_VISITORS = gql`
  query restaurantLastVisitors($id: ID!) {
    restaurantLastVisitors(_id: $id) {
      lastName
      avatar
      firstName
    }
  }
`;

export const GET_COMMANDES_BY_RESTAURANTID = gql`
  query commandeByRestaurantId($restaurantId: ID!) {
    commandeByRestaurantId(restaurantId: $restaurantId) {
      _id
      userId
      articlesC {
        _id
        name
        categoryId
        categoryName
        personalizedMenuId
        articleId
        quantity
        ingredients
        newIngredients
      }
      ownerFirstname
      ownerLastName
      ownerEmail
      ownerPhoneNumber
      description
      adresse1
      adresse2
      restaurant {
        _id
        name
        avatar
        location
        specialty
      }
      restaurantId
      commandeTakenMethod
      status
      paymentMethod
      total_price
      timeCreated
      createdAt
    }
  }
`;

export const UPDATE_COMMANDE_STATUS = gql`
  mutation updateCommande($id: String, $input: UpdateCommandeInput) {
    updateCommande(_id: $id, input: $input)
  }
`;

export const CREATE_UNWASTABLE_LIST = gql`
  mutation createUnwastableMenu(
    $restaurantId: ID!
    $input: [CreateUnwastableMenuInput]
  ) {
    createUnwastableMenu(restaurantId: $restaurantId, input: $input) {
      _id
      restaurantId
      list {
        _id
        articles {
          _id
          article {
            name
            image
          }
          quantity
          price
        }
      }
    }
  }
`;

export const GET_UNWASTABLE_BY_RESTAURANTID = gql`
  query unwastableByRestaurantId($restaurantId: ID!) {
    unwastableByRestaurantId(restaurantId: $restaurantId) {
      _id
      list {
        _id
        articles {
          _id
          article {
            _id
            name
            image
            price
          }
          quantity
          price
        }
      }
    }
  }
`;

export const DELETE_DELETE_UNWASTABLE_LIST = gql`
  mutation deleteUnwastableMenu($id: ID!, $unwastableMenuId: ID!) {
    deleteUnwastableMenu(_id: $id, unwastableMenuId: $unwastableMenuId)
    {
     _id
      restaurantId
      list {
      _id
      articles {
        _id
         article {
          name
             image
         }
         quantity
          price
       }
       }
    }
  }
`;

export const UPDATE_UNWASTABLE_MENU = gql`
  mutation updateUnwastableMenu(
    $id: ID!
    $unwastableMenuId: ID!
    $input: [CreateUnwastableMenuInput]
  ) {
    updateUnwastableMenu(
      _id: $id
      unwastableMenuId: $unwastableMenuId
      input: $input
    )
  }
`;

export const CREATE_BESTIE = gql`
  mutation createBestie($restoId: ID!) {
    createBestie(restoId: $restoId) {
      _id
      userId
      restoId
      createdAt
    }
  }
`;

export const DELETE_BESTIE = gql`
  mutation deleteBestie($id: ID!) {
    deleteBestie(_id: $id)
  }
`;

export const IS_BESTIE = gql`
  query isBesty($restoId: ID!) {
    isBesty(restoId: $restoId) {
      _id,
      userId,
	    restoId
    }
  }
`;

export const IS_FOLLOWING_RESTAURANT = gql`
  query isFollowingRestaurant($restaurantId: ID! $followerId: ID!) {
    isFollowingRestaurant(restaurantId: $restaurantId, followerId: $followerId)
  }
`;

export const USER_IS_FOLLOWED_BY_RESTAURANT = gql`
  query userIsFollowedByRestaurant($userId: ID! $restaurantId: ID!) {
    userIsFollowedByRestaurant(userId: $userId, restaurantId: $restaurantId)
  }
`;

export const IS_FOLLOWING_RESTAURANT_RESTAURANT = gql`
  query isFollowingRestaurantRestaurant($restaurantId: ID! $restaurantFollowerId: ID!) {
    isFollowingRestaurantRestaurant(restaurantId: $restaurantId, restaurantFollowerId: $restaurantFollowerId)
  }
`;

export const FOLLOW_RESTAURANT = gql`
  mutation followRestaurant($input: CreateRestaurantFollowerInput!) {
    followRestaurant(input: $input) {
      _id,
	    restaurantId,
	    followerId	
    }
  }
`;

export const UNFOLLOW_RESTAURANT= gql`
  mutation unfollowRestaurant($restaurantId: ID! $followerId: ID!) {
    unfollowRestaurant(restaurantId: $restaurantId, followerId: $followerId)
  }
`;

export const BESTIES_BY_USER_ID = gql`
  query bestiesByUserId($userId: ID!) {
    bestiesByUserId(userId: $userId) {
      _id
      userId
	    restoId
	    createdAt
    }
  }
`;

export const IS_ALCOHOLIC = gql`
  query isAlcoholic($restoId: ID!) {
    isAlcoholic(restoId: $restoId)
  }
`;

export const NOT_BESTIES = gql`
  query notBesties {
    notBesties {
      _id
      userId
      name
      avatar
      backgroundImage
      address
      location
      description
      specialty
      services
      phone
    }
  }
`;

export const REVENUE_BY_PRODUCT = gql`
  query revenueByProduct($restoId: ID! $articleId: ID!) {
    revenueByProduct(restoId: $restoId, articleId: $articleId){
      revenue
    }
  }
`;

export const DAY_REVENUE = gql`
  query dayRevenue($restoId: ID!) {
    dayRevenue(restoId: $restoId){
      revenue
    }
  }
`;

export const DAY_AVERAGE = gql`
  query dayAverage($restoId: ID!) {
    dayAverage(restoId: $restoId){
      revenue
    }
  }
`;

export const REVENUE_BY_PRODUCTS_LIST = gql`
  query revenueByProductsList($restoId: ID!) {
    revenueByProductsList(restoId: $restoId){
      articleName
      articleRevenue
    }
  }
`;

export const REVENUE_PASH = gql`
  query revenuPash($restoId: ID!) {
    revenuPash(restoId: $restoId){
      _id
      userId
      status
      paymentMethod
      commandeTakenMethod
      adresse1
      timeCreated
      createdAt
      articlesC {
        quantity
        articleC {
          _id
          name
          ingredients
          image
          price
          duration
          articleOptions {
            _id
            optionName
            optionPrice
          }
        }
      }
    }
  }
`;

export const BEVERAGE_SALES_DAILY = gql`
  query beverageSalesDaily($restoId: ID!) {
    beverageSalesDaily(restoId: $restoId){
      revenue
    }
  }
`;

export const BEST_SELLERS = gql`
  query bestSellers($restoId: ID!) {
    bestSellers(restoId: $restoId){
      articleName
      articleRevenue
    }
  }
`;

export const ALL_PICTURES_BY_USERID = gql`
  query allPicturesByUserId($userId: ID!) {
    allPicturesByUserId(userId: $userId){
      _id
	    userId
	    title
	    postMediaType
	    media{
        url
        type
      }
      content
      likes {
        _id
	      userId
	      postId
	      createdAt
      }
      comments {
        _id
	      handlerId
	      postId
	      handlerType
	      content
	      createdAt
      }
    }
  }
`;

export const PICTURES_BY_USERID = gql`
  query picturesByUserId($userId: ID!) {
    picturesByUserId(userId: $userId){
      _id
	    userId
	    title
	    postMediaType
	    media {
        url
        type
      }
      content
      likes {
        _id
	      userId
	      postId
	      createdAt
      }
      comments {
        _id
	      handlerId
	      postId
	      handlerType
	      content
	      createdAt
      }
    }
  }
`;

export const TAGGED_PICTURES_BY_USERID = gql`
  query taggedPicturesByUserId($userId: ID!) {
    taggedPicturesByUserId(userId: $userId){
      _id
	    userId
	    title
	    postMediaType
	    media {
        url
        type
      }
      content
      likes {
        _id
	      userId
	      postId
	      createdAt
      }
      comments {
        _id
	      handlerId
	      postId
	      handlerType
	      content
	      createdAt
      }
    }
  }
`;

export const CREATE_PHOTO = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      _id
	    userId
	    title
	    postMediaType
	    media {
        url
        type
      }
      content
      likes {
        _id
	      userId
	      postId
	      createdAt
      }
      comments {
        _id
	      handlerId
	      postId
	      handlerType
	      content
	      createdAt
      }
    }
  }
`;

export const PRODUCTIVITY = gql`
  query productivity($restoId: ID!) {
    productivity(restoId: $restoId){
      revenue
    }
  }
`;

export const CUSTOMER_STATISFACTION_BY_RESTAURANT_ID = gql`
  query customerSatisfactionByRestaurantId($restoId: ID!) {
    customerSatisfactionByRestaurantId(restoId: $restoId){
      value
    }
  }
`;

export const RATIO_FOLLOWERS_BY_DAY = gql`
  query ratioFollowersByDay($restoId: ID!) {
    ratioFollowersByDay(restoId: $restoId){
      _id
      restaurantId
      followerId
      createdAt
    }
  }
`;

export const FOLLOW_RESTAURANT_RESTAURANT = gql`
  mutation followRestaurantRestaurant($input: CreateRestaurantRestaurantFollowerInput!) {
    followRestaurantRestaurant(input: $input) {
      _id,
	    restaurantId,
	    restaurantFollowerId	
    }
  }
`;

export const UNFOLLOW_RESTAURANT_RESTAURANT= gql`
  mutation unfollowRestaurantRestaurant($restaurantId: ID! $restaurantFollowerId: ID!) {
    unfollowRestaurantRestaurant(restaurantId: $restaurantId, restaurantFollowerId: $restaurantFollowerId)
  }
`;

export const RESTAURANT_FOLLOW_USER = gql`
  mutation restaurantFollowUser($input: CreateRestaurantFollowingInput!) {
    restaurantFollowUser(input: $input) {
      _id,
      userId,
	    restaurantId,	
    }
  }
`;

export const RESTAURANT_UNFOLLOW_USER= gql`
  mutation restaurantUnfollowUser($restaurantId: ID! $userId: ID!) {
    restaurantUnfollowUser(restaurantId: $restaurantId, userId: $userId)
  }
`;

export const RESERVATION_BY_USERID = gql`
  query reservationByUserId {
    reservationByUserId {
      _id
      userId
      restaurant {
        _id
        name
        phone
        avatar
        backgroundImage
        description
        location
        tags
        specialty
        payment
      }
      date
      timeFrom
      promotion {
        _id
        article {
          _id
          name
          categoryId
          ingredients
          price
          quantity
          newIngredients
          duration
          image
        }
        restaurant{
          _id
        }
        name
        percentage
        description
        image
      }
      peopleNumber
      guests {
        _id
        firstName
        lastName
        avatar
        location
      }
      payment
      usePointTaktak
      confirmation
      note
      status
      personalizedMenu {
        _id
	      userId
        restaurantId
        articles {
          _id
          name
          categoryId
          ingredients
          price
          quantity
          newIngredients
          duration
          image
        }
        articlesId
        articlesOfPmId
      }
      createdAt
    }
  }
`;

export const RESERVATION_BY_ID = gql`
  query reservationById($id: ID!) {
    reservationById(_id: $id) {
      _id
      userId
      restaurant {
        _id
        name
        phone
        avatar
        backgroundImage
        description
        location
        tags
        specialty
        payment
      }
      date
      timeFrom
      promotion {
        _id
        article {
          _id
          name
          categoryId
          ingredients
          price
          quantity
          newIngredients
          duration
          image
        }
        restaurant{
          _id
        }
        name
        percentage
        description
        image
      }
      peopleNumber
      guests {
        _id
        firstName
        lastName
        avatar
        location
      }
      payment
      usePointTaktak
      confirmation
      note
      status
      personalizedMenu {
        _id
	      userId
        restaurantId
        articles {
          _id
          name
          categoryId
          ingredients
          price
          quantity
          newIngredients
          duration
          image
        }
        articlesId
        articlesOfPmId
      }
      createdAt
    }
  }
`;

export const DELETE_RESERVATION = gql`
  mutation deleteReservation($id: ID!) {
    deleteReservation(_id: $id)
  }
`;

export const ARTICLE_OF_PM_BY_ID = gql`
  query articleOfPmById($id: ID!) {
    articleOfPmById(_id: $id) {
      _id
      name
      categoryId
      categoryName
      personalizedMenuId
      articleId
      article {
        articleOptions {
          _id
          optionName
          optionAvatar
          optionPrice
          optionType
        }
      }
      quantity
      ingredients
      newIngredients
      articleOptions {
        _id
        optionName
        optionPrice
        optionAvatar
      }
      price
      size
      duration
      image
      rate
      createdAt
    }
  }
`;

export const UPDATE_RESERVATION = gql`
  mutation updateReservation($id: String!, $input: UpdateReservationInput!) {
    updateReservation(_id: $id, input: $input)
  }
`;

export const COMMANDE_BY_ID = gql`
  query commandeById($id: ID!) {
    commandeById(_id: $id) {
      _id
      userId
      articlesC{
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
      unwastableArticleC{
        _id
        restaurantId
        unwastableId
        image
        ingredients
        name
        price
        quantity
        duration
      }
      articlesId
      isUnwastable
      ownerFirstname
      ownerLastName
      ownerEmail
      ownerPhoneNumber
      description
      adresse1
      restaurant {
        _id
        userId
        name
        phone
        avatar
        backgroundImage
        address
        location
        specialty
      }
      restaurantId
      adresse2
      commandeTakenMethod
      paymentMethod
      status
      total_price
      usePointTaktak
      timeCommande
      timeCreated
      createdAt
    }
  }
`;

export const DELETE_COMMANDE = gql`
  mutation deleteCommande($id: ID!) {
    deleteCommande(_id: $id)
  }
`;

export const CATEGORY_BY_ARTICLE = gql`
  query categoryByArticleId($articleId: ID!) {
    categoryByArticleId(articleId: $articleId) {
      _id
      menuId
      name
    }
  }
`;

export const ARTICLES_BY_RESTAURANT_ID = gql`
  query articlesByRestaurantId($userId: ID!) {
    articlesByRestaurantId(userId: $userId) {
      _id
      name
      ingredients
      newIngredients
      duration
      image
      quantity
      price
      articleOptionsId
      articleOptions {
        _id
        optionName
        optionPrice
        optionAvatar
      }
      residuePrice
      articleRate
      categoryId
	    countVotes
	    createdAt
    }
  }
`;

export const UNWASTABLE_ARTICLES = gql`
  query unwastableArticles {
    unwastableArticles {
      _id
      articleId
      restaurantId
      restaurant{
        _id
        name
        avatar
        backgroundImage
        description
        location
      }
      unwastableId
      article{
        _id
        name
        ingredients
        newIngredients
        duration
        image
        quantity
        price
      }
      category{
        _id
        menuId
        name  
      }
      quantity
      price
      categoryName
    }
  }
`;

export const SEARCH_UNWASTABLE_ARTICLES = gql`
  query searchUnwastableArticles($input: SearchInput) {
    searchUnwastableArticles(input: $input) {
      _id
      articleId
      restaurantId
      restaurant{
        _id
        name
        avatar
        backgroundImage
        description
        location
      }
      unwastableId
      article{
        _id
        name
        ingredients
        newIngredients
        duration
        image
        quantity
        price
      }
      category{
        _id
        menuId
        name  
      }
      quantity
      price
      categoryName
    }
  }
`;

export const CATEGORIES = gql`
  query categories {
    categories {
      _id
      name
    }
  }
`;
