import React, {useContext} from "react";
import { UserContext } from "../../context/UserContext";
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

function ProfileStoryFeedItem(props) {
  const {classes, story} = props;
  const { activeUser } = useContext(UserContext);

//console.log("ddddd:", story.createdAt.getFullYear()+'-'+(story.createdAt.getMonth()+1)+'-'+story.createdAt.getDate())

  const list=[]
  let post;
    if(story.type === "VIDEO"){
      post = {
        id: story._id,
        url: `https://${story.url}`,
        type: "video",
      }
    }else{
      post = {
        id: story._id,
        url: `https://${story.url}`,
        seeMore: ({ close }) => {
          return <div onClick={close} style={{backgroundColor:"#fff", height:"80%", marginTop: "20%"}}>
            {story.viewers && 
              story.viewers.map((view) => (
                <Grid container direction="row" style={{marginLeft: 10}}>
                  <Grid item xs={1}>
                    <img src={`https://${view.avatar}`} alt="avatar" 
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
          heading: activeUser.firstName+" "+activeUser.lastName,
          subheading: story.createdAt,
          profileImage: `https://${activeUser.avatar}`
        }
      }      
    }
    list.push(post)
  
  return (
    <div  style={{marginTop: -150}}>
      <StoriesModal
        stories={list}
        defaultInterval={1500}
        width={432}
        height={468}
      />
    </div>
  );
}

export default withStyles(styles)(ProfileStoryFeedItem);
