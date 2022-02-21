import React, {useState, useContext, useEffect} from "react";
import { PostContext } from "../../context/PostContext";
import MyStory from "./MyStory";
import StoryAvatar from "./StoryAvatar";
import Slider from "infinite-react-carousel";

function PrevButton(props) {
  return (
     <button className={props.className} disabled={props.index === 0} onClick={props.onClick}>
       prev
     </button>
  )
}

function NextButton(props) {
  return (
    <button className={props.className}  disabled={props.index === (props.stories.length / 11) - 1} onClick={props.onClick} >
      next
    </button>
  )
}

function Stories(props) {
  // const {stories} = props
  const { getStories ,getActiveStories} = useContext(PostContext);
  const [index, setIndex] = useState(0)
  const [activeStories, setActiveStories] = useState()

  const [listStories, setListStories] = useState();
  useEffect( () => {
     getStories(setListStories);
  }, [props])

  useEffect( () => {
   listStories && getActiveStories(listStories,setActiveStories);
 }, [listStories])
 
  const aiecaramba = activeStories && activeStories.map((el) => (
    <StoryAvatar story={el} key={el._id} />
  ));
 
  function bc(oldIndex,newIndex){
    setIndex(newIndex) 
  }

  const settings = {
    rows:1,
    slidesPerRow: 10,
    duration: 100,
    shift: 0,
    // arrowsScroll : 0.5,
    // centerMode :true,
    prevArrow: <PrevButton index={index} />,
    nextArrow: <NextButton index={index} stories={listStories}/>,
    beforeChange : bc, 
    initialSlide : 0
  };
  
  const carouselStyle = {
  //  width: '95%',
  }

  return (
    <div>
       <div style={carouselStyle}>
        <Slider {...settings}  >
          <MyStory   />
          {aiecaramba}
        </Slider>
      </div> 
    </div>
  );
}

export default Stories;
