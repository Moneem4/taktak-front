import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      _id
      media {
        type
        url
      }
      content
      title
      promoValue
    }
  }
`;

export const CREATE_POST_MEDIA = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const GET_FEED = gql`
  query postsFeed {
    postsFeed {
      _id
      createdAt
      userId
      isRestaurant
      title
      accessType
      taggedRestaurant
      taggedUsers
      content
      duration
      dateFrom
	    dateTo
      postType
      promoValue
      articlesId
      media{
        url
        type
      }
      postMediaType
      likes {
        _id
        userId
        createdAt
      }
      comments {
        _id
        handlerId
        postId
        handlerType
        content
        createdAt
        updatedAt
      }
      relatedPosts {
        _id
        userId
        createdAt
        media {
          url
          type
        }
        likes {
          _id
          userId
        }
        comments {
          _id
          createdAt
          handlerType
          handlerId
        }
        postMediaType
      }
    }
  }
`;

export const UPDATE_ACCESS_POST = gql`
  mutation updateAccessPost($id: ID! $accessType: AccessType) {
    updateAccessPost(_id: $id, accessType: $accessType)
  }
`;

export const POST_COMMENTS_BY_POST_ID = gql`
  query postComments($postId: ID!) {
    postComments(postId: $postId) {
      _id
      postId
      content
      handlerType
      handlerId
      isRestaurant
      connectedRestaurentId
      createdAt
    }
  }
`;

export const CREATE_POST_COMMENT = gql`
  mutation createPostComment($input: CreatePostCommentInput!) {
    createPostComment(input: $input) {
      _id
    }
  }
`;

export const DELETE_POST_COMMENT = gql`
  mutation deletePostComment($_id: ID!) {
    deletePostComment(_id: $_id)
  }
`;

export const UPDATE_POST_COMMENT = gql`
  mutation updatePostComment($_id: ID!, $input: UpdatePostInput) {
    updatePostComment(_id: $_id, input: $input) {
      _id
      content
      userId
    }
  }
`;

export const CREATE_POST_LIKE = gql`
  mutation createPostLike($input: CreatePostLikeInput!) {
    createPostLike(input: $input) {
      _id
      userId
      createdAt
      postId
    }
  }
`;

export const POST_LIKES = gql`
  query postLikes($postId: ID!) {
    postLikes(postId: $postId) {
      _id
      postId
      userId
      createdAt
    }
  }
`;

export const DELETE_POST_LIKE = gql`
  mutation deletePostLike($_id: ID!) {
    deletePostLike(_id: $_id)
  }
`;

export const GET_POST_BY_ID = gql`
  query postById($_id: ID!) {
    postById(_id: $_id) {
      _id
      userId
      isRestaurant
      title
      content
      taggedRestaurant
      taggedUsers
      postMediaType
      articlesId
      dateFrom
	    dateTo
      duration
      media {
        type
        url
      }
      likes {
        _id
        userId
        createdAt
      }
      comments {
        _id
        handlerId
        postId
        handlerType
        content
        createdAt
        updatedAt
        isRestaurant
      }
      createdAt
    }
  }
`;

export const CREATE_RATING = gql`
  mutation createRating($input: CreateRatingInput!) {
    createRating(input: $input)
     {
        _id
     }
    } 
`;

export const GET_RATINGS_BY_USERID = gql`
 query ratingsByUserId($userId: ID!) {
    ratingsByUserId(userId: $userId){
      _id
     ratingType
     evaluatedId
    rateValue
     comment 
    }
  }
`;

export const UPDATE_RATING = gql`
  mutation updateRating($_id: String, $input: UpdateRatingInput) {
    updateRating(_id: $_id, input: $input)
    
    } 
`;

export const CREATE_ARTICLE_BLOG_IMG = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const CREATE_BLOG_ARTICLE = gql`
  mutation createBlogArticle($input: CreateArticleBlogInput!) {
    createBlogArticle(input: $input) {
      _id
	    userId
	    title
	    backgroundImage
	    category
	    contentsBlogId
	    contentBlog {
        _id
	      articleBlogId
	      type
	      description
      }
      status
	    createdAt
    }
  }
`;

export const CREATE_CONTENT_BLOG = gql`
  mutation createContentBlog($input: [CreateContentBlogInput]!) {
    createContentBlog(input: $input) {
      _id
	    articleBlogId
	    type
	    description
	    createdAt
    }
  }
`;

export const ARTICLES_BLOG_BY_USER_ID = gql`
  query articlesBlogByUserId($userId: ID!) {
    articlesBlogByUserId(userId: $userId) {
      _id
      userId
      title
      backgroundImage
      category
      contentsBlogId
      contentBlog {
        _id
        articleBlogId
        type
        description
      }
      status
      createdAt
    }
  }
`;

export const ARTICLE_BLOG_BY_ID = gql`
  query articleBlogById($id: ID!) {
    articleBlogById(_id: $id) {
      _id
      userId
      title
      backgroundImage
      category
      contentsBlogId
      contentBlog {
        _id
        type
        description
      }
      status
      isRestaurant
    }
  }
`;

export const ARTICLES_BLOG_BY_CATEGORY = gql`
  query articlesBlogByCategory($category: ArticleCategory!) {
    articlesBlogByCategory(category: $category) {
      _id
      userId
      title
      backgroundImage
      category
      contentsBlogId
      contentBlog {
        _id
        articleBlogId
        type
        description
      }
      status
    }
  }
`;

export const PUBLISHED_ARTICLES = gql`
  query publishedArticles($category: ArticleCategory!) {
    publishedArticles(category: $category) {
      _id
      userId
      title
      backgroundImage
      category
      contentsBlogId
      contentBlog {
        _id
        articleBlogId
        type
        description
      }
      status
      isRestaurant
    }
  }
`;

export const USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      avatar
      location
      createdAt
    }
  }
`;

export const ARTICLE_BLOG_LIKES = gql`
  query articleBlogLikes($articleId: ID!) {
    articleBlogLikes(articleId: $articleId) {
      _id
      articleBlogId
      userId
      createdAt
    }
  }
`;

export const CREATE_ARTICLE_BLOG_LIKE = gql`
  mutation createArticleBlogLike($input: CreateArticleBlogLikeInput!) {
    createArticleBlogLike(input: $input) {
      _id
      userId
      articleBlogId
      createdAt
    }
  }
`;

export const DELETE_ARTICLE_BLOG_LIKE = gql`
  mutation deleteArticleBlogLike($_id: ID!) {
    deleteArticleBlogLike(_id: $_id)
  }
`;

export const ARTICLE_BLOG_COMMENTS = gql`
  query articleBlogComments($articleId: ID!) {
    articleBlogComments(articleId: $articleId) {
      _id
      articleBlogId
      content
      userId
      handlerType
      isRestaurant
      createdAt
    }
  }
`;

export const CREATE_ARTICLE_BLOG_COMMENT = gql`
  mutation createArticleBlogComment($input: CreateArticleBlogCommentInput!) {
    createArticleBlogComment(input: $input) {
      _id
    }
  }
`;

export const DELETE_ARTICLE_BLOG = gql`
  mutation deleteBlogArticle($_id: ID!) {
    deleteBlogArticle(_id: $_id)
  }
`;

export const UPDATE_ARTICLE_BLOG = gql`
  mutation updateBlogArticle($_id: ID!, $input: UpdateArticleBlogInput!) {
    updateBlogArticle(_id: $_id, input: $input)
  } 
`;

export const UPDATE_CONTENT_BLOG = gql`
  mutation updateContentBlog($articleBlogId: ID!, $input: [UpdateContentBlogInput]) {
    updateContentBlog(articleBlogId: $articleBlogId, input: $input)
  } 
`;

export const DELETE_POST = gql`
  mutation deletePost($_id: ID!) {
    deletePost(_id: $_id)
  }
`;

export const GET_STORIES = gql`
  query stories {
    stories {
      _id
	    userId
      isRestaurant
      owner {
        _id
        name
        avatar
      }
	    mediaStoryId
	    createdAt
    }
  }
`;

export const GET_STORY_BY_ID = gql`
  query stroyItemById($id: ID!) {
    stroyItemById(_id: $id) {
      _id
	    userId
      storyId
      isRestaurant
      url
      type
      content
	    viewers{
        _id
        name
        avatar
      }
	    createdAt
    }
  }
`;

export const CREATE_STORY = gql`
  mutation createStory($input: CreateStoryInput!) {
    createStory(input: $input) {
      _id
	    userId
      isRestaurant
      mediaStoryId
      mediaStory {
        _id
        userId
        isRestaurant
        storyId
        url
        type
        content
      }
      createdAt
    }
  }
`;

export const CREATE_STORY_ITEM = gql`
  mutation createStoryItem($input: CreateStoryItemInput!) {
    createStoryItem(input: $input) {
      _id
	    userId
	    storyId
      isRestaurant
      url
      type
      content
	    
	    createdAt
    }
  }
`;

export const GET_STORY_BY_USERID = gql`
  query storyByUserId($userId: ID!) {
    storyByUserId(userId: $userId) {
      _id
	    userId
      isRestaurant
	    owner{
        _id
        name
        avatar
      }
      mediaStoryId
	    createdAt
    }
  }
`;

export const UPDATE_STORY_ITEM_VIEWERS = gql`
  mutation updateStoryItemViewers($storyId: ID!) {
    updateStoryItemViewers(storyId: $storyId)
  } 
`;

export const GET_ACTIVE_STORY_BY_ID = gql`
  query activeStoryItemByStoryId($storyId: ID!) {
    activeStoryItemByStoryId(storyId: $storyId) {
      _id
	    userId
      storyId
      isRestaurant
      url
      type
      content
	    viewers{
        userId
        firstName
        lastName
        avatar
      }
	    createdAt
    }
  }
`;

export const STORY_ITEM_BY_USER_ID = gql`
  query storyItemByUserId($userId: ID!) {
    storyItemByUserId(userId: $userId) {
      _id
	    userId
      storyId
      isRestaurant
      url
      type
      content
	    viewers{
        userId
        firstName
        lastName
        avatar
      }
	    createdAt
    }
  }
`;

export const ARTICLE_IS_LIKED = gql`
  query articleIsLiked($articleId: ID! $userId: ID!) {
    articleIsLiked(articleId: $articleId, userId: $userId)
  }
`;

export const NOTIFICATIONS_BY_USER_ID = gql`
  query notificationsByUser {
    notificationsByUser {
      _id
	    userId
      typeItem
      itemId
      createdAt
    }
  }
`;

export const NOTIF_NEW_POST = gql`
      subscription newPost {
        newPost{
          post{
            _id
            userId
            title
            content
            likes{
              _id
              userId
              postId
            }
            comments{
              _id
              handlerId
              content
            }
            createdAt
          }
          user{
            _id
            firstName
            lastName
            avatar
            location
          }
        }
    }
`;

export const GET_PROMO_POST = gql`
  query getPromoPosts {
    getPromoPosts {
      _id
      createdAt
      userId
      isRestaurant
      title
      accessType
      taggedRestaurant
      taggedUsers
      content
      postType
      media{
        url
        type
      }
      postMediaType
      likes {
        _id
        userId
        createdAt
      }
      comments {
        _id
        handlerId
        postId
        handlerType
        content
        createdAt
        updatedAt
      }
      relatedPosts {
        _id
        userId
        createdAt
        media {
          url
          type
        }
        likes {
          _id
          userId
        }
        comments {
          _id
          createdAt
          handlerType
          handlerId
        }
        postMediaType
        duration
        dateFrom
	      dateTo
        articlesId
      }
    }
  }
`;
