import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import client from "../apollo/client";
import {
	POST_COMMENTS_BY_POST_ID,
	CREATE_POST_COMMENT,
	DELETE_POST_COMMENT,
	UPDATE_POST_COMMENT,
	CREATE_POST_LIKE,
	POST_LIKES,
	DELETE_POST_LIKE,
	GET_POST_BY_ID,
	CREATE_RATING,
	GET_RATINGS_BY_USERID,
	UPDATE_RATING,
	CREATE_ARTICLE_BLOG_IMG,
	CREATE_BLOG_ARTICLE,
	CREATE_CONTENT_BLOG,
	ARTICLES_BLOG_BY_USER_ID,
	ARTICLE_BLOG_BY_ID,
	USER,
	ARTICLES_BLOG_BY_CATEGORY,
	PUBLISHED_ARTICLES,
	ARTICLE_BLOG_LIKES,
	CREATE_ARTICLE_BLOG_LIKE,
	DELETE_ARTICLE_BLOG_LIKE,
	ARTICLE_BLOG_COMMENTS,
	CREATE_ARTICLE_BLOG_COMMENT,
	DELETE_ARTICLE_BLOG,
	UPDATE_ARTICLE_BLOG,
	UPDATE_CONTENT_BLOG,
	DELETE_POST,
	CREATE_POST_MEDIA,
	CREATE_POST,
	CREATE_STORY,
	CREATE_STORY_ITEM,
	GET_STORIES,
	STORY_EXIST,
	GET_STORY_BY_ID,
	GET_STORY_BY_USERID,
	UPDATE_STORY_ITEM_VIEWERS,
	GET_ACTIVE_STORY_BY_ID,
	STORY_ITEM_BY_USER_ID,
	ARTICLE_IS_LIKED,
	NOTIFICATIONS_BY_USER_ID,
	GET_PROMO_POST
} from "../graphql/post/post";
import { GET_USER } from "../graphql/user/user";
import { GET_RESTAURANT, RESTAURANT } from "../graphql/restaurant/restaurant";

const PostContext = React.createContext();

function PostContextProvider({ children }) {
	const [notifications, setNotifications] = useState([]);
	const [notificationsSideBar, setNotificationsSideBar] = useState([]);

	async function getComments(id, setData) {
		let arr;
		await client
			.query({
				query: POST_COMMENTS_BY_POST_ID,
				variables: {
					postId: id,
				},
			})
			.then(async (data) => {
				if(data.data.postComments){
					arr = await data.data.postComments
					.map(async (comment) => {
						let item = {};
					
					if	(!comment.isRestaurant) 
					{
						return await client
							.query({
								query: GET_USER,
								variables: {
									id: comment.handlerId,
								},
							})
							.then(async (user) => {
								let userDetails
								 userDetails = {
									_id: user.data.user._id,
									firstName: user.data.user.firstName,
									lastName: user .data.user.lastName,
									avatar: user.data.user.avatar,
								} 
								item = { ...comment, user: userDetails };
								return item;
						}) 
					} else if (comment.isRestaurant) 
					{
						return await client
						.query({
							query: GET_RESTAURANT,
							variables: {
								id: comment.connectedRestaurentId,
							},
						})
						.then(async (data) => {
							const RestaurantDetails = {
								_id: data.data.restaurant._id,
								name: data.data.restaurant.name,
								description: data.data.restaurant.description,
								location: data.data.restaurant.location,
								avatar: data.data.restaurant.avatar,
							};
							item = { ...comment, user: RestaurantDetails };
							return item;
						}) }	
					})
		
				}}
			)
			.catch((err) => {
				console.log(err, "error load ");
			});
		arr = await Promise.all(arr);
	
		setData(arr)
		return arr;
	}

	async function createComment(handlerType, handlerId , postId, content, isRestaurant, connectedRestaurentId, setData) {
		const data = {
			handlerType : handlerType,
			handlerId: handlerId,
			postId: postId,
			content: content,
			isRestaurant: isRestaurant,
			connectedRestaurentId: connectedRestaurentId
		};
		await client
			.mutate({
				mutation: CREATE_POST_COMMENT,
				variables: {
					input: data,
				},
			})
			.then(async (data) => {
				// setData(data.data.createPostComment);
			})
			.catch((err) => {
				console.log(err, "error create Comment");
			});
	}

	async function updateComment(commentId, content, setData) {
		const data = {
			content,
		};
		await client
			.mutate({
				mutation: UPDATE_POST_COMMENT,
				variables: {
					_id: commentId,
					input: data,
				},
			})
			.then(async (data) => {
				setData((comments) => {
					return {
						...comments,
						content: data.data.updatePostComment.content,
					};
				});
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}

	async function deleteComment(id, setData, comments , setCommentsLength) {
		await client
			.mutate({
				mutation: DELETE_POST_COMMENT,
				variables: {
					_id: id,
				},
			})
			.then(async (data) => {
				if (data.data.deletePostComment && comments) {
					var array = [...comments];
					let tab = array.map((el) => el._id);
					var index = tab.indexOf(id);
					if (index != -1) array.splice(index, 1);
					setData(array);
					setCommentsLength(array.length)
				}
			})
	}

	async function createPostLike(userId, postId, isRestaurant, connectedRestaurentId) {
		const data = {
			userId: userId,
			postId: postId,
			isRestaurant: isRestaurant,
			connectedRestaurentId: connectedRestaurentId
		};
		await client
			.mutate({
				mutation: CREATE_POST_LIKE,
				variables: {
					input: data,
				},
			})
			.then(async (data) => {
				console.log("PostLike", data.data.createPostLike);
			});
	}

	async function getPostLikes(postId, setData) {
		const data = {
			postId: postId,
		};
		await client
			.query({
				query: POST_LIKES,
				variables: {
					postId: data,
				},
			})

			.then(async (data) => {
				setData(data.data.postLikes);
				return data;
			});
	}

	async function deletePostLike(id, setData, likes) {
		await client
			.mutate({
				mutation: DELETE_POST_LIKE,
				variables: {
					_id: id,
				},
			})
			.then(async (data) => {
				if (data.data.deletePostLike && likes) {
					var array = [...likes];
					let tab = array.map((el) => el._id);
					var index = tab.indexOf(id);
					if (index != -1) likes.splice(index, 1);
					setData(array);
				}
			})
			.catch((err) => {
				console.log(err, "error delete Comment");
			});
	}

	async function getPostById(id, setData) {
		await client
			.query({
				query: GET_POST_BY_ID,
				variables: {
					_id: id,
				},
			})

			.then(async (data) => {
				setData(data.data.postById);
				return data;
			});
	}

	const [feed, setFeed] = useState(null);
	async function getPostByIdFromFeed(id) {
		if (feed) return feed.find((el) => el._id == id);
	}

	async function createRating(evaluatedId, ratingType,rateValue, comment,setLoading,setShowModal) {
		const data = {
			evaluatedId: evaluatedId,
			ratingType: ratingType,
			rateValue : rateValue,
			comment : comment
		};
		setLoading(true)
		await client
			.mutate({
				mutation: CREATE_RATING,
				variables: {
					input: data,
				},
			})
			.then(async (data) => {
				setLoading(false)
				setShowModal(false)
			});
	}

	async function getRatingsByUserId(id, setData) {
		await client
			.query({
				query: GET_RATINGS_BY_USERID,
				variables: {
					userId: id,
				},
			})
			.then(async (data) => {
				setData(data.data.ratingsByUserId);
			
			});
	}

	async function updateRating(ratingId,rateValue, comment,setLoading,setShowModal) {
		const data = {
			rateValue : rateValue,
			comment : comment
		};
		await client
			.mutate({
				mutation: UPDATE_RATING,
				variables: {
					_id : ratingId,
					input: data,
				},
			})
			.then(async (data) => {
				setLoading(false)
				setShowModal(false)
			});
	}

	async function createArticleBlog(inputData, status, userId, isRestaurant) {
		console.log("ddddddddd:",inputData)
		const backgroundUrl = await new Promise((resolve, reject) => {
			client
			  .mutate({
				mutation: CREATE_ARTICLE_BLOG_IMG,
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

		let data = {
			userId: userId,
			title: inputData.title,
			backgroundImage: backgroundUrl,
			category: inputData.category,
			status: status,
			isRestaurant: isRestaurant
		};

		let contentBlocList = {
			content: inputData.content,
		};
	
		let arr = [];
	
		await client
		  .mutate({
			mutation: CREATE_BLOG_ARTICLE,
			variables: {
			  input: data,
			},
		  })
		  .then(async (data) => {
			arr = contentBlocList.content.map(async (bloc) => {
				let item;
				if(bloc.type === "TEXT"){
					item={
						articleBlogId: data.data.createBlogArticle._id,
						type:"TEXT",
						description: bloc.description
					}
				}else if (bloc.type === "IMAGE"){
					const imgUrl = await new Promise((resolve, reject) => {
						client
						.mutate({
							mutation: CREATE_ARTICLE_BLOG_IMG,
							variables: {
							file: bloc.url,
							},
						})
						.then((res) => {
							if (res.data && res.data.createPostMedia) {
							resolve(res.data.createPostMedia);
							} else reject("http://test.com");
						});
					});
					item={
						articleBlogId: data.data.createBlogArticle._id,
						type:"IMAGE",
						description: imgUrl
					}
				}else if(bloc.type === "VIDEO"){
					const videoUrl = await new Promise((resolve, reject) => {
						client
						.mutate({
							mutation: CREATE_ARTICLE_BLOG_IMG,
							variables: {
							file: bloc.file,
							},
						})
						.then((res) => {
							if (res.data && res.data.createPostMedia) {
							resolve(res.data.createPostMedia);
							} else reject("http://test.com");
						});
					});
					item={
						articleBlogId: data.data.createBlogArticle._id,
						type:"VIDEO",
						description: videoUrl
					}
				}
				
			  	return item;
			});
			
			if (arr && arr.length) {
			  arr = await Promise.all(arr);
			  await client
				.mutate({
				  mutation: CREATE_CONTENT_BLOG,
				  variables: {
					input: arr,
				  },
				})
				.then((data) => {
				  console.log("CREATE_ARTICLE_CONTENT:", data);
				})
				.catch((err) => {
				  console.log(err, "CREATE_ARTICLE_CONTENT error");
				});
			}
		  });
	}

	async function getArticlesBlogByUserId(userId, setData) {
		await client
		  .query({
			query: ARTICLES_BLOG_BY_USER_ID,
			variables: {
				userId: userId,
			},
		  })
		  .then((data) => {
			setData(data.data.articlesBlogByUserId);
		  })
		  .catch((err) => {
			console.log(err, "error");
		  });
	}

	async function getArticleBlogData(idArticle, setData) {
		await client
		  .query({
			query: ARTICLE_BLOG_BY_ID,
			variables: {
			  id: idArticle,
			},
		  })
		  .then((data) => {
			setData(data.data.articleBlogById);
	
			return data;
		  })
		  .catch((err) => {
			console.log(err, "error");
		});
	}

	async function getUserData(idUser, setData) {
		await client
		  .query({
			query: USER,
			variables: {
			  id: idUser,
			},
		  })
		  .then((data) => {
			setData(data.data.user);
	
			return data;
		  })
		  .catch((err) => {
			console.log(err, "error");
		  });
	}

	const [filter, setFilter] = useState("RECETTES");
	async function getArticlesBlogByCategory(category, setData) {
		await client
		  .query({
			query: ARTICLES_BLOG_BY_CATEGORY,
			variables: {
				category: category,
			},
		  })
		  .then((data) => {
			  setData(data.data.articlesBlogByCategory);
		  })
		  .catch((err) => {
			console.log(err, "error");
		  });
	}

	async function getPublishedArticles(category, setData) {
		await client
		  .query({
			query: PUBLISHED_ARTICLES,
			variables: {
				category: category,
			},
		  })
		  .then((data) => {
			  setData(data.data.publishedArticles);
		  })
		  .catch((err) => {
			console.log(err, "error");
		  });
	}

	async function getArticleBlogLikes(articleBlogId, setData) {
		await client
			.query({
				query: ARTICLE_BLOG_LIKES,
				variables: {
					articleId: articleBlogId,
				},
			})

			.then(async (data) => {
				setData(data.data.articleBlogLikes);
				return data;
			});
	}

	async function createArticleBlogLike(userId, articleBlogId) {
		const data = {
			userId: userId,
			articleBlogId: articleBlogId,
		};
		await client
			.mutate({
				mutation: CREATE_ARTICLE_BLOG_LIKE,
				variables: {
					input: data,
				},
			})
			.then(async (data) => {
				console.log("articleLike", data.data.createArticleBlogLike);
			});
	}

	async function articleIsLiked(articleId, userId, setData) {
		await client
		  .query({
			query: ARTICLE_IS_LIKED,
			variables: {
				articleId: articleId,
				userId: userId
			},
		  })
		  .then((data) => {
			setData(data.data.articleIsLiked);
		  })
		  .catch((err) => {
			console.log(err, "error");
		  });
	  }

	async function deleteArticleBlogLike(id) {
		await client
			.mutate({
				mutation: DELETE_ARTICLE_BLOG_LIKE,
				variables: {
					_id: id,
				},
			})
			.then(async (data) => {
				console.log("data", data);
			})
			.catch((err) => {
				console.log(err, "error delete like");
			});
	}

	async function getArticleBlogComments(id, setData) {
		let arr;
		await client
			.query({
				query: ARTICLE_BLOG_COMMENTS,
				variables: {
					articleId: id,
				},
			})
			.then(async (data) => {
				if(data.data.articleBlogComments){
				
				arr = await data.data.articleBlogComments
					.map(async (comment) => {
						let item = {};
					if	(comment.isRestaurant) 	{
						return await client
						.query({
							query: GET_RESTAURANT,
							variables: {
								id: comment.userId,
							},
						})
						.then(async (data) => {
							const RestaurantDetails = {
								_id: data.data.restaurant._id,
								name: data.data.restaurant.name,
								description: data.data.restaurant.description,
								location: data.data.restaurant.location,
								avatar: data.data.restaurant.avatar,
							};
							item = { ...comment, user: RestaurantDetails };
							return item;
						}) 
					} else {
						return await client
							.query({
								query: GET_USER,
								variables: {
									id: comment.userId,
								},
							})
							.then(async (user) => {
								let userDetails
								 userDetails = {
									_id: user.data.user._id,
									firstName: user.data.user.firstName,
									lastName: user.data.user.lastName,
									avatar: user.data.user.avatar,
								} 
								item = { ...comment, user: userDetails };
								return item;
							}) 
					}	
				})
			}}
			)
			.catch((err) => {
				console.log(err, "error load ");
			});
		arr = await Promise.all(arr);
	
		setData(arr)
		return arr;
	}

	async function createArticleBlogComment(handlerType , articleBlogId, content, userId, isRestaurant) {
		const data = {
			handlerType : handlerType,
			articleBlogId: articleBlogId,
			content: content,
			userId: userId,
			isRestaurant: isRestaurant
		};
		await client
			.mutate({
				mutation: CREATE_ARTICLE_BLOG_COMMENT,
				variables: {
					input: data,
				},
			})
			.then(async (data) => {
				console.log("ArticleCommentData", data);
				// setData(data.data.createPostComment);
			})
			.catch((err) => {
				console.log(err, "error create Comment");
			});
	}

	async function deleteArticleBlog(id, setData) {
		await client
			.mutate({
				mutation: DELETE_ARTICLE_BLOG,
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
				console.log(err, "error delete blog");
			});
	}

	async function updateArticleBlog(id, inputData, status) {
		let backgroundUrl;
		if(typeof inputData.backgroundImage === "string"){
			backgroundUrl = inputData.backgroundImage;
		} else {
			backgroundUrl = await new Promise((resolve, reject) => {
				client
				.mutate({
					mutation: CREATE_ARTICLE_BLOG_IMG,
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
		}

		let data = {
			title: inputData.title,
			backgroundImage: backgroundUrl,
			category: inputData.category,
			status: status,
		};

		console.log("data:", data);

		let contentBlocList = {
			contentBlog: inputData.contentBlog,
		};

		let arr = [];

		await client
		  .mutate({
			mutation: UPDATE_ARTICLE_BLOG,
			variables: {
			  _id: id,
			  input: data,
			},
		  })
		  .then(async (data) => {
			arr = contentBlocList.contentBlog.map(async (bloc) => {
				let item;
				if(bloc.type === "TEXT"){
					item={
						articleBlogId: id,
						type:"TEXT",
						description: bloc.description
					}
				}else if (bloc.type === "IMAGE"){
					let imgUrl;
					if(typeof bloc.description === "string"){
						imgUrl= bloc.description;
					}else{
						imgUrl = await new Promise((resolve, reject) => {
							client
							.mutate({
								mutation: CREATE_ARTICLE_BLOG_IMG,
								variables: {
								file: bloc.description,
								},
							})
							.then((res) => {
								if (res.data && res.data.createPostMedia) {
								resolve(res.data.createPostMedia);
								} else reject("http://test.com");
							});
						});
					}
					item={
						contentBlogId: bloc._id,
						articleBlogId: id,
						type:"IMAGE",
						description: imgUrl
					}
				}else if(bloc.type === "VIDEO"){
					let videoUrl;
					if(typeof bloc.description === "string"){
						videoUrl= bloc.description;
					}else{
						videoUrl = await new Promise((resolve, reject) => {
							client
							.mutate({
								mutation: CREATE_ARTICLE_BLOG_IMG,
								variables: {
								file: bloc.description,
								},
							})
							.then((res) => {
								if (res.data && res.data.createPostMedia) {
								resolve(res.data.createPostMedia);
								} else reject("http://test.com");
							});
						});
					}
					item={
						contentBlogId: bloc._id,
						articleBlogId: id,
						type:"VIDEO",
						description: videoUrl
					}
				}
				
				return item;
			});

			console.log("arrr:",arr);

			if (arr && arr.length) {
				arr = await Promise.all(arr);
				await client
				  .mutate({
					mutation: UPDATE_CONTENT_BLOG,
					variables: {
					  input: arr,
					},
				  })
				  .then((data) => {
					console.log("UPDATE_ARTICLE_CONTENT:", data);
				  })
				  .catch((err) => {
					console.log(err, "CREATE_ARTICLE_CONTENT error");
				  });
			  }
		  }).catch((err) => {
			console.log(err, "error delete blog");
		  });
	}

	async function deletePost(id, setData) {
		await client
			.mutate({
				mutation: DELETE_POST,
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

	// async function getStories(setListStories) {
	// 	await client
	// 	  .query({
	// 		query: GET_STORIES,
	// 	  })
	// 	  .then(async (data) => {
	// 		  const storiesList = []
	// 		await  data.data.stories.map(async (story) => {
	// 			  const mediaList = []
	// 			  await client
	// 				.query({
	// 				  query: GET_ACTIVE_STORY_BY_ID,
	// 				  variables: {
	// 					storyId: story._id,
	// 				  },
	// 				})
	// 				.then((res) => {
	// 					mediaList.push(res.data.activeStoryItemByStoryId)
	// 					const storyItem = {
	// 						_id: story._id,
	// 						createdAt: story.createdAt,
	// 						mediaStoryId: story.mediaStoryId,
	// 						mediaStories: res.data.activeStoryItemByStoryId,
	// 						owner: story.owner,
	// 						userId: story.userId
	// 					}
	// 					storiesList.push(storyItem)
	// 				});
	// 		  })
	// 		setListStories(storiesList)
	// 	  })
	// 	  .catch((err) => {
	// 		console.log(err, "error");
	// 	  });
	// }
	
	async function getStories(setListStories) {
		await client
		  .query({
			query: GET_STORIES,
		  })
		  .then( (data) => {
			  
			setListStories(data.data.stories)
		  })
		  .catch((err) => {
			console.log(err, "error");
		  });
	}

	async function getStoryByUserId(userId, setStoryExist) {
		await client
		  .query({
			query: GET_STORY_BY_USERID,
			variables: {
				userId: userId,
			},
		  })
		  .then( (data) => {
			setStoryExist(data.data.storyByUserId)
		  })
		  .catch((err) => {
			console.log(err, "error");
		  });
	}

	async function getActiveStories(stories,setActiveStories){
        	const storiesList = []
			await  stories.map(async (story) => {
				  await client
					.query({
					  query: GET_ACTIVE_STORY_BY_ID,
					  variables: {
						storyId: story._id,
					  },
					})
					.then((res) => {
						if(res.data.activeStoryItemByStoryId.length > 0){
							const storyItem = {
								_id: story._id,
								createdAt: story.createdAt,
								mediaStoryId: story.mediaStoryId,
								mediaStories: res.data.activeStoryItemByStoryId,
								owner: story.owner,
								userId: story.userId
							}
							storiesList.push(storyItem)
						}
					});
			  })
			setActiveStories(storiesList)
	}

	async function createStory(userId, isRestaurant, inputData) {

		const inputStory = {
			userId: userId,
			isRestaurant: isRestaurant
		}

		await client
		  .mutate({
			mutation: CREATE_STORY,
			variables: {
				input: inputStory,
            },
		  })
		  .then(async (data) => {
			const url = await new Promise((resolve, reject) => {
				client
				  .mutate({
					mutation: CREATE_POST_MEDIA,
					variables: {
					  file: inputData.url,
					},
				  })
				  .then((res) => {
					if (res.data && res.data.createPostMedia) {
					  resolve(res.data.createPostMedia);
					} else reject("http://test.com");
				  });
			  });
			
			const dataPost = {
				storyId: data.data.createStory._id,
				url: url,
				type: inputData.type,
				content: inputData.text,
			};
			
			await client
			.mutate({
			  mutation: CREATE_STORY_ITEM,
			  variables: {
				input: dataPost,
			  },
			})
			.then((data) => {
			  console.log("CREATE_STORY:", data);
			})
			.catch((err) => {
			  console.log(err, "CREATE_ARTICLE_CONTENT error");
			});
		})

	}

	async function updateStory(storyId, inputData) {
		const url = await new Promise((resolve, reject) => {
			client
		        .mutate({
					mutation: CREATE_POST_MEDIA,
					variables: {
					  file: inputData.url,
					},
				})
				.then((res) => {
					if (res.data && res.data.createPostMedia) {
					  resolve(res.data.createPostMedia);
					} else reject("http://test.com");
				});
			});
			
			const dataPost = {
				storyId: storyId,
				url: url,
				type: inputData.type,
				content: inputData.text,
			};
			
			await client
			.mutate({
			  mutation: CREATE_STORY_ITEM,
			  variables: {
				input: dataPost,
			  },
			})
			.then((data) => {
			  console.log("CREATE_STORY:", data);
			})
			.catch((err) => {
			  console.log(err, "CREATE_ARTICLE_CONTENT error");
			});
	}

	async function updateStoryViewers(storyId) {
		await client
			.mutate({
				mutation: UPDATE_STORY_ITEM_VIEWERS,
				variables: {
					storyId : storyId,
				},
			})
			.then(async (data) => {
				console.log("res:", data.data.updateStoryItemViewers)
			});
	}

	async function getStoryItemsByUserId(userId, setData) {
		await client
			.query({
				query: STORY_ITEM_BY_USER_ID,
				variables: {
					userId: userId,
				},
			})
			.then(async (data) => {
				setData(data.data.storyItemByUserId);
			})
			.catch((err) => {
				console.log(err, "error load ");
			});
	}

	const [showNotifIcon, setShowNotifIcon] = useState(true);
	async function getUserNotifications(setData) {
		await client
			.query({
				query: NOTIFICATIONS_BY_USER_ID,
			})
			.then(async (data) => {
				let arr = []

				data.data.notificationsByUser.map(async (notif) => {
					let item;
					if(notif.typeItem === "QUESTION"){
						const post = await client
							.query({
								query: GET_POST_BY_ID,
								variables: {
									_id: notif.itemId,
								},
							})
							.then(async (data) => {
								const user = await client
									.query({
										query: GET_USER,
										variables: {
										id: data.data.postById.userId,
										},
									})
									.then(async (data) => {
										return data.data.user;
									});
								let pp1 = {
									post: data.data.postById,
									user: user
								}
								return pp1 ;
							});

						item={
							newPost: post,
							type: notif.typeItem,
						}
					}
					arr.push(item)
					return item;
				});
				console.log("iiii:",arr)

				setData(arr);
			});
	}

	async function getPromoPosts() {
		let arr;
		await client
		  .query({
			query: GET_PROMO_POST,
		  })
		  .then(async (data) => { 
			arr = await data.data.getPromoPosts.map(async (post) => {
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

	return (
		<PostContext.Provider
			value={{
				getComments,
				createComment,
				deleteComment,
				updateComment,
				createPostLike,
				getPostLikes,
				feed,
				setFeed,
				getPostByIdFromFeed,
				deletePostLike,
				getPostById,
				createRating,
				getRatingsByUserId,
				updateRating,
				createArticleBlog,
				getArticleBlogData,
				getArticlesBlogByUserId,
				getArticlesBlogByCategory,
				getPublishedArticles,
				filter, 
				setFilter,
				getUserData,
				getArticleBlogLikes,
				getArticleBlogComments,
				createArticleBlogLike,
				deleteArticleBlogLike,
				createArticleBlogComment,
				deleteArticleBlog,
				updateArticleBlog,
				deletePost,
				getStories,
				createStory,
				updateStoryViewers,
				getStoryItemsByUserId,
				getActiveStories,
				articleIsLiked,
				getStoryByUserId,
				updateStory,
				notifications, 
				setNotifications,
				getUserNotifications,
				showNotifIcon, 
				setShowNotifIcon,
				notificationsSideBar, 
				setNotificationsSideBar,
				getPromoPosts,

			}}
		>
			{children}
		</PostContext.Provider>
	);
}

export { PostContextProvider, PostContext };
