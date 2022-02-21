import React,{useContext} from 'react';
import ConversationItem from './ConversationItem';
import { UiContext } from '../../context/UiContext';
import { UserContext } from '../../context/UserContext';

function ConversationList(props) {
    const {setConversationListOpen,setConversationHover} = useContext(UiContext)
    const { followersList } = useContext(UserContext);
    
    function OpenConversations(){
      setConversationListOpen((prev)=>!prev)
    }
    
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

    return (
      <div className="conversation" >
        <form  className='form-container'  onMouseEnter={() => setConversationHover(true)}
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

ConversationList.propTypes = {

}

export default ConversationList

