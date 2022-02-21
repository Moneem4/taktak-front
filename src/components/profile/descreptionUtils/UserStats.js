import React ,{useContext,useEffect,useState}from "react";
import { UserContext } from "../../../context/UserContext";
import avatar1 from '../avatar1.png';

function UserStats(props) {
  const {selectedUser , isntme} = props
  const {  followers,following,rFollowing,userFollowing,userFollowers, getUserRestaurantFollowed } = useContext(UserContext);

  const [userRestaurantFollowing, setUserRestaurantFollowing] = useState(null);
  const [followingNumber, setFollowingNumber] = useState(null)
  const [followersNumber, setFollowersNumber] = useState(null)
  const [restaurantFollowingNumber, setRestaurantFollowingNumber] = useState(null)
  const [localFollowers, setLocalFollowers] = useState(null)
  const [localFollowing, setLocalFollowing] = useState(null)

  useEffect(() => { 
  isntme ? userFollowing && setFollowingNumber(userFollowing.length) : following && setFollowingNumber(following.length)
  isntme ? userFollowers&& setFollowersNumber(userFollowers.length) : followers && setFollowersNumber(followers.length)
  // isntme ? userFollowing && setLocalFollowing(()=>[...userFollowing]) : following && setFollowingNumber(()=>[...following])
  // isntme ? userFollowers&& setLocalFollowers([...userFollowers]) : followers && setFollowersNumber([...followers])
  
  //isntme ? userRestaurantFollowing && setRestaurantFollowingNumber(userRestaurantFollowing.length) : rFollowing && setRestaurantFollowingNumber(rFollowing.length)
  
  getUserRestaurantFollowed( selectedUser.userId, setUserRestaurantFollowing).then((followers) => {
    isntme ? rFollowing && setRestaurantFollowingNumber(rFollowing.length) : setRestaurantFollowingNumber(followers.length)
  });

}, [props])

  return (
    <div className="user-stats">
      <span className="line" />
      <div className="user-stat">
        <div className="user-stat-top">
          
          <div>{followingNumber &&  followingNumber}</div>
          <span>Amis suivis</span>
        </div>
        <div className="user-stat-bottom">
        
        {!isntme ? (following && following[0]  && following[0].avatar ?  <img  src={`https://${following[0].avatar}`} /> :following && following[0]  && <img  src={avatar1} />) : (userFollowing && userFollowing[0] && userFollowing[0].avatar ? <img  src={`https://${userFollowing[0].avatar}`} /> :userFollowing && userFollowing[0] && <img  src={avatar1} />) }
        {!isntme ? (following && following[1]  && following[1].avatar ?  <img  src={`https://${following[1].avatar}`} /> :following && following[1]  && <img  src={avatar1} />) : (userFollowing && userFollowing[1] && userFollowing[1].avatar ? <img  src={`https://${userFollowing[1].avatar}`} /> :userFollowing && userFollowing[1] && <img  src={avatar1} />) }
        {!isntme ? (following && following[2]  && following[2].avatar ?  <img  src={`https://${following[2].avatar}`} /> :following && following[2]  && <img  src={avatar1} />) : (userFollowing && userFollowing[2] && userFollowing[2].avatar ? <img  src={`https://${userFollowing[2].avatar}`} /> :userFollowing && userFollowing[2] && <img  src={avatar1} />) }
        {!isntme ? (following && following[3]  && following[3].avatar ?  <img  src={`https://${following[3].avatar}`} /> :following && following[3]  && <img  src={avatar1} />) : (userFollowing && userFollowing[3] && userFollowing[3].avatar ? <img  src={`https://${userFollowing[3].avatar}`} /> :userFollowing && userFollowing[3] && <img  src={avatar1} />) }
   
        </div>
      </div>
      <div className="user-stat">
        <div className="user-stat-top">
          <div>{followersNumber && followersNumber}</div>
          <span>Profiles te suivent</span>
        </div>
        <div className="user-stat-bottom">
        {!isntme ? (followers && followers[0]  && followers[0].avatar ?  <img  src={`https://${followers[0].avatar}`} /> :followers && followers[0]  && <img  src={avatar1} />) : (userFollowers && userFollowers[0] && followers[0].avatar ? <img  src={`https://${userFollowers[0].avatar}`} /> : userFollowers && userFollowers[0] && <img  src={avatar1} />) }
        {!isntme ? (followers && followers[1]  && followers[1].avatar ?  <img  src={`https://${followers[1].avatar}`} /> :followers && followers[1]  && <img  src={avatar1} />) : (userFollowers && userFollowers[1] && followers[1].avatar ? <img  src={`https://${userFollowers[1].avatar}`} /> : userFollowers && userFollowers[1] && <img  src={avatar1} />) }
        {!isntme ? (followers && followers[2]  && followers[2].avatar ?  <img  src={`https://${followers[2].avatar}`} /> :followers && followers[2]  && <img  src={avatar1} />) : (userFollowers && userFollowers[2] && followers[2].avatar ? <img  src={`https://${userFollowers[2].avatar}`} /> : userFollowers && userFollowers[2] && <img  src={avatar1} />) }
        {!isntme ? (followers && followers[3]  && followers[3].avatar ?  <img  src={`https://${followers[3].avatar}`} /> :followers && followers[3]  && <img  src={avatar1} />) : (userFollowers && userFollowers[3] && followers[3].avatar ? <img  src={`https://${userFollowers[3].avatar}`} /> : userFollowers && userFollowers[3] && <img  src={avatar1} />) }
   
        </div>
      </div>
      <div className="user-stat">
        <div className="user-stat-top">
          <div>{restaurantFollowingNumber ? restaurantFollowingNumber : 0}</div>
          <span>Restaurants suivis</span>
        </div>
        <div className="user-stat-bottom">

        {isntme ? (rFollowing && rFollowing[0]  && rFollowing[0].avatar ?  <img  src={`https://${rFollowing[0].avatar}`} /> :rFollowing && rFollowing[0]  && <img  src={avatar1} />) : (userRestaurantFollowing && userRestaurantFollowing[0] && userRestaurantFollowing[0].avatar ? <img  src={`https://${userRestaurantFollowing[0].avatar}`} /> :userRestaurantFollowing && userRestaurantFollowing[0]&& <img  src={avatar1} />) }
        {isntme ? (rFollowing && rFollowing[1]  && rFollowing[1].avatar ?  <img  src={`https://${rFollowing[1].avatar}`} /> :rFollowing && rFollowing[1]  && <img  src={avatar1} />) : (userRestaurantFollowing && userRestaurantFollowing[1] && userRestaurantFollowing[1].avatar ? <img  src={`https://${userRestaurantFollowing[1].avatar}`} /> :userRestaurantFollowing && userRestaurantFollowing[1] && <img  src={avatar1} />) }
        {isntme ? (rFollowing && rFollowing[2]  && rFollowing[2].avatar ?  <img  src={`https://${rFollowing[2].avatar}`} /> :rFollowing && rFollowing[2]  && <img  src={avatar1} />) : (userRestaurantFollowing && userRestaurantFollowing[2] && userRestaurantFollowing[2].avatar ? <img  src={`https://${userRestaurantFollowing[2].avatar}`} /> :userRestaurantFollowing && userRestaurantFollowing[2]&&  <img  src={avatar1} />) }
        {isntme ? (rFollowing && rFollowing[3]  && rFollowing[3].avatar ?  <img  src={`https://${rFollowing[3].avatar}`} /> :rFollowing && rFollowing[3]  && <img  src={avatar1} />) : (userRestaurantFollowing && userRestaurantFollowing[3] && userRestaurantFollowing[3].avatar ? <img  src={`https://${userRestaurantFollowing[3].avatar}`} /> :userRestaurantFollowing && userRestaurantFollowing[3] && <img  src={avatar1} />) }

        </div>
      </div>
    </div>
  );
}

UserStats.propTypes = {};

export default UserStats;
