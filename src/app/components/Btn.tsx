import React, { ReactElement } from 'react'
import { useStyles } from 'src/app/stylesheets';
import { Button, ExtendButtonBase, ButtonTypeMap, ButtonProps } from '@material-ui/core';


interface IBtnProps extends ButtonProps{
}


function Btn(props: IBtnProps): ReactElement {
    const {children} = props;
    
    return (
        <Button {...props}> 
            {children}
        </Button>
    )
}

export default Btn
