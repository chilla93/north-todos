import React, { ReactElement, useState } from 'react'
import { ListItemIcon, TextField, IconButton, Box } from '@material-ui/core';
import Item, { IItemProps } from './Item';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

export interface ItemInputProps extends IItemProps {
    onCancel: () => void;
    onInputSubmit: (todo: string) => void;
    label: string;
    defaultValue?: string;
}


function ItemInput(props: ItemInputProps): ReactElement {
    const {onCancel, onInputSubmit, label, defaultValue} = props;
    const [text, setText] = useState(defaultValue || "");

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onInputSubmit(text);
    }


    return (
        <Item {...props} showDivider={false}>
            <ListItemIcon>
                <IconButton onClick={onCancel} edge={"start"} color="default" aria-label="add to shopping cart">
                    <RemoveCircleIcon />
                </IconButton>
            </ListItemIcon>
            <Box width={"100%"} component={"form"} onSubmit={onSubmit}>
                <TextField 
                    id="add-new" 
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                    autoFocus={true} 
                    color={"primary"} 
                    fullWidth={true} 
                    margin={"dense"} 
                    label={label}
                    variant="outlined" />
            </Box>
        </Item>
    )
}

export default ItemInput
