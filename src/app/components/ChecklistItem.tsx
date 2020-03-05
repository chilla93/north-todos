import React, { ReactElement, useState } from 'react'
import { ListItemIcon, Checkbox, ListItemTextProps, ListItemText, ListItemSecondaryAction, IconButton, ButtonGroup, Button } from '@material-ui/core';
import Item, { IItemProps } from './Item';
import { IChecklistItem } from 'src/app/models/checklistItem.models';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import classNames from 'classnames';
import { useStyles } from '../stylesheets';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ChecklistInput from './ChecklistInput';

interface ChecklistItemProps extends IItemProps {
    item: IChecklistItem;
    onChecklistItemUpdate: (item: IChecklistItem) => void;
    onChecklistItemRemove: (item: IChecklistItem) => void;
}

function ChecklistItem(props: ChecklistItemProps): ReactElement {
    const { item: {title, completed, unsaved}, onChecklistItemUpdate, onChecklistItemRemove} = props;

    const classes = useStyles();
    const [editState, setEditState] = useState(false);


    const listItemTextProps: ListItemTextProps = {
        primary: title, 
        primaryTypographyProps: {
            color: (unsaved ? "textSecondary" : "textPrimary")
        }
    };

    const onStatusUpdate = (checked: boolean) => {
        const newStatus = checked;
        onChecklistItemUpdate({...props.item, completed: newStatus}) 
    }

    const onChecklistItemSubmit = (partialItem: Partial<IChecklistItem>) => {
        const value: IChecklistItem = {...props.item, ...partialItem};
        onChecklistItemUpdate(value)
        setEditState(false);
    }


    const itemClassnames = classNames({
        [classes.completedItem]: completed
    })

    if(editState){
        return (
            <ChecklistInput 
                onChecklistItemSubmit={onChecklistItemSubmit} 
                {...props.item} 
                onCancel={() => setEditState(false)} />
        )
    }
  
    return (
        <Item {...props} className={itemClassnames}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={completed}
                        onChange={(_, value) => onStatusUpdate(value)}
                        tabIndex={-1}
                        disableRipple
                        color={"primary"}
                    />
                </ListItemIcon>
                <ListItemText {...listItemTextProps} />
                <ListItemSecondaryAction>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button variant={"text"} onClick={() => setEditState(true)}><EditIcon/></Button>
                        <Button variant={"text"}  onClick={() => onChecklistItemRemove(props.item)}><DeleteForeverIcon/></Button>
                    </ButtonGroup>
                </ListItemSecondaryAction>
        </Item>
    )
}

export default ChecklistItem
