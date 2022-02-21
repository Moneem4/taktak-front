import React,{useContext, useState, useEffect} from 'react';
import ConversationItem from './ConversationItem';
import { UiContext } from '../../context/UiContext';
import { UserContext } from '../../context/UserContext';

function ConversationList(props) {
    const {setConversationListOpen,setConversationHover} = useContext(UiContext)
    const {activeUser, getUserRestaurantFollowed, followersUserList, setFollowersUserList,
      followersRestoList, setFollowersRestoList, setFollowersList, getFollowingByUserId}= useContext(UserContext);
    
    function OpenConversations(){
      setConversationListOpen((prev)=>!prev)
    }
    
  useEffect(() => {
    getFollowingByUserId(activeUser.userId, setFollowersUserList);
    getUserRestaurantFollowed(activeUser.userId, setFollowersRestoList);
  }, []);

  let arrResto = [];
  arrResto = followersRestoList.map((el)=>{
    const item={
      user: el,
      type: "RESTAURANT"
    }
    return item
  });

  let arrUser = [];
  arrUser = followersUserList.map((el)=>{
      const item={
        user: el,
        type: "USER"
      }
      return item
    });

    let followersList = arrUser.concat(arrResto);

    const conversations =[
        {user:{name :"francesco boti" , profileImage:"https://picsum.photos/501"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"Amir bouker" , profileImage:"https://picsum.photos/502"} ,isRestaurant:true, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben user" , profileImage:"https://picsum.photos/503"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/504"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/505"} ,isRestaurant:true, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/506"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/507"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/508"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/509"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/510"} ,isRestaurant:true, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/511"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/512"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/513"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"user ben use" , profileImage:"https://picsum.photos/514"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"francesco boti" , profileImage:"https://picsum.photos/515"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
        {user:{name :"francesco boti" , profileImage:"https://picsum.photos/518"} ,isRestaurant:false, isConnected : true , lastTimeChecked : "15min" },
   
    ]
   
   let tab = followersList.map((el)=>( <ConversationItem follower = {el}/>))

   function OpenConversationsList(){
    setConversationHover(true);
    setFollowersList(followersList);
  }
  
    return (
      <div className="conversation-hover" >
        <form  className='form-container'  onMouseEnter={OpenConversationsList}
          onMouseLeave={() => setConversationHover(false)}>
          <div button onClick={OpenConversations} className="list-online-header">
            <div className="list-online-left-side">
              <i className="fas fa-inbox" />
              <span>Ma boite de réception</span>
            </div>
            <div  className="list-online-right-side">
              <span >Cacher</span>
              <img
                src="../assets/img/svg/cacher.png"
                alt=""
                onClick="closeForm()"
              />
            </div>
          </div>
          <div className="list-users-online">
            {tab}
          </div>
        </form>
      </div>
    )
}

export default ConversationList
