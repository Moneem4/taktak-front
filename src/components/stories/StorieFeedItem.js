import React, {useContext} from "react";
import { PostContext } from "../../context/PostContext";
import { UserContext, userContext } from "../../context/UserContext";
import StoriesModal from "react-insta-stories";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  titleLabel: {
    fontSize: 13,
    color: 'black',
    margin: 10,
    fontWeight: 'bold',
  },
})

function StorieFeedItem(props) {
  const {classes, story} = props;
  const { updateStoryViewers } = useContext(PostContext);
  const { activeUser } = useContext(UserContext);

  const list=[]
  story.mediaStories.map((el) => {
    let post;
    if(el.type === "VIDEO"){
      post = {
        id: el._id,
        url: `https://${el.url}`,
        type: "video",
      }
    }else{
      if(el.userId === activeUser.userId){
        post = {
          id: el._id,
          url: `https://${el.url}`,
          seeMore: ({ close }) => {
            return <div onClick={close} 
              style={{backgroundColor:"#fff", height:"80%", marginTop: "20%", 
                //display:  el.userId === activeUser.userId ? "none" : "block"
               }}>
                {el.viewers && 
                  el.viewers.map((view) => (
                    <Grid container direction="row" style={{marginLeft: 10}}>
                      <Grid item xs={1}>
                        <img src={`https://${view.avatar}`} 
                          alt="avatar" 
                          style={{width: 30, height: 30, borderRadius: "50%", marginTop: 5}} />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="subtitle2" className={classes.titleLabel}>
                          {view.firstName+" "+view.lastName}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                }
              </div>;
          },
          header: {
            heading: story.owner.name,
            subheading: story.createdAt,
            profileImage: `https://${story.owner.avatar}`
          }
        }
      }else{
        post = {
          id: el._id,
          url: `https://${el.url}`,
          header: {
            heading: story.owner.name,
            subheading: story.createdAt,
            profileImage: `https://${story.owner.avatar}`
          }
        }
      }
      
    }
    list.push(post)
  });
  
  return (
    <div  style={{marginTop: -150}}>
      <StoriesModal
        stories={list}
        defaultInterval={1500}
        width={432}
        height={468}
        onStoryStart={(...args) => {
          if(story.userId !== activeUser.userId){
            console.log("aaaa", args[1].id)
            updateStoryViewers(args[1].id)
          }else{
            console.log("bbbb", args[1].id)
          }
        }}
      />
    </div>
  );
}

const stories1 = [
  {
    url: "https://picsum.photos/1080/1920",
    header: {
      heading: "Amir bouker",
      subheading: "Posted 5h ago",
      profileImage: "https://picsum.photos/1000/1000",
    },
  },
  {
    url:
      "https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN",
    header: {
      heading: "Amir bouker",
      subheading: "Posted 32m ago",
      profileImage: "https://picsum.photos/1080/1920",
    },
  },
  {
    url:
      "https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg",
    header: {
      heading: "Chouaieb Chouaieb",
      subheading: "Posted 32m ago",
      profileImage:
        "https://avatars0.githubusercontent.com/u/24852829?s=400&v=4",
    },
  },
  {
    url: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    type: "video",
    duration: 1000,
  },
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    type: "video",
    
  },
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: "video",
  },
  "https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
];

export default withStyles(styles)(StorieFeedItem);
