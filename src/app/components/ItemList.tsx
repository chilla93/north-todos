import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { IBaseProps } from 'src/app/shared/BaseProps';
import styles, { useStyles } from 'src/app/stylesheets';
// import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// // import about1 from 'src/assets/images/about_1.jpg';
// import person1 from 'src/assets/images/person_1.jpg';
// import person2 from 'src/assets/images/person_2.jpg';
// import Item from "./Item";



export interface IItemListProps extends IBaseProps{

}
export default function ItemList(props: IItemListProps) {
  const classes = useStyles();
  const {children} = props;
  return (
    <List className={classes.list}>
      {children}

    </List>
  );
}
