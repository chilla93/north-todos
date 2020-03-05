import * as React from 'react';
import { Box, ListItem, Divider } from '@material-ui/core';
import { IBaseProps } from 'src/app/shared/BaseProps';

export interface IItemProps extends IBaseProps {
    showDivider?: boolean
    onItemPress?: () => void;
}



export default function Item (props: IItemProps) {
  const {children, showDivider = true, onItemPress, className} = props;

  const isButton:boolean = !!onItemPress;
  let buttonProps = {};
  if(isButton){
    buttonProps = {button: true, onClick: onItemPress}
  }

  return (
    <Box className={className}>
        <ListItem dense={true} {...buttonProps}>
            {children}
        </ListItem>
        {showDivider && <Divider variant="inset" />}
    </Box>
  );
}
