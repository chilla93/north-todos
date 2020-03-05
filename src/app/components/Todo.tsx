import React, { ReactElement, Component } from 'react'
import { ListItemIcon, Checkbox, ListItemTextProps, ListItemText, ListItemSecondaryAction, IconButton, ButtonGroup, Button, Grid, Typography, Box } from '@material-ui/core';
import Item, { IItemProps } from './Item';
import { ITodoItem, TodoStatus } from '../models/todo.models';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles, { useStyles } from '../stylesheets';
import { Link } from 'react-router-dom';
import ScheduleIcon from '@material-ui/icons/Schedule'; 
import moment from "moment";

interface TodoProps extends IItemProps {
    todo: ITodoItem;
    onTodoUpdate: (todo: ITodoItem) => void;
    onTodoRemove: (todo: ITodoItem) => void;
}

const useStyle = makeStyles(styles)

function Todo(props: TodoProps): ReactElement {
    const { todo: {title, description, dueDate, status, id}, onTodoUpdate, onTodoRemove} = props;

    const classes = useStyles();


    const listItemTextProps: ListItemTextProps = {primary: title};
    const secondaryItems: JSX.Element[] = [];
  
    if(!!description){
        secondaryItems.push(
          <Typography
              key={`${id}-todo-description`}
              component="span"
              variant="body2"
              className={classes.block}
              color="textSecondary">
              {description}
          </Typography>
        )
    }

    if(!!dueDate){
      secondaryItems.push(
        <Typography
            key={`${id}-todo-dueDate`}
            component="span"
            variant="caption"
            style={{marginTop: 5}}
            className={classes.flexDisplay}
            color="textSecondary">
                <ScheduleIcon style={{marginRight: 5, marginLeft: -3}} />
                {moment(dueDate).format("ddd MMMM Do, h:mm a")}
        </Typography>
      )
    }

    listItemTextProps.secondary = (
        <React.Fragment>              
            {secondaryItems}
        </React.Fragment>
    )

    const onStatusUpdate = (checked: boolean) => {
        const newStatus = checked ? TodoStatus.Complete : TodoStatus.Pending;
        onTodoUpdate({...props.todo, status: newStatus}) 
    }

    const checked = status === TodoStatus.Complete;

    const itemClassnames = classNames({
        [classes.completedItem]: checked
    })
  
    return (
        <Item {...props} className={itemClassnames}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        onChange={(_, value) => onStatusUpdate(value)}
                        tabIndex={-1}
                        disableRipple
                        color={"primary"}
                    />
                </ListItemIcon>
                <ListItemText {...listItemTextProps} />
                <ListItemSecondaryAction>
                    <ListItemIcon>
                        <Link to={`/details/${id}`}>
                            <IconButton edge={"end"} color="default" aria-label="go to" >
                                <NavigateNextIcon />
                            </IconButton>
                        </Link>
                    </ListItemIcon>
                </ListItemSecondaryAction>
        </Item>
    )
}

export default Todo
