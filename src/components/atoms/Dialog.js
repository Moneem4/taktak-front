import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { ItemTypes } from "../profileRestaurant/menu/createArticle/categoriesUtil/ItemTypes";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedItem, open, items } = props;

  const handleClose = () => {
    onClose(selectedItem);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <List>
        {items &&
          items.length &&
          items.map((el) => (
            <ListItem
              button
              onClick={() => handleListItemClick(el)}
              key={el._id}
            >
              <ListItemAvatar>
                <Avatar
                  src={`https://${el.avatar}`}
                  className={classes.avatar}
                />
              </ListItemAvatar>
              <ListItemText primary={el.name} />
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedItem: PropTypes.string.isRequired,
};

export default function Dialogg(props) {
  const { items, selectedItem, setSelectedItem } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedItem(value);
  };

  return (
    <div>
      <br />
      <Button
        className="gestion-residus-Restaurant-header-title"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        choisir votre restaurant
      </Button>
      <SimpleDialog
        items={items}
        selectedItem={selectedItem}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
