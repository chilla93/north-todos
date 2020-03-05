import { createStyles, Theme, makeStyles } from "@material-ui/core";

// Theme-dependent styles
const styles = (theme: Theme) => {
    console.log(theme, theme.spacing());
    
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(),
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main,
        },
        list: {
            width: '100%',
            maxWidth: 500,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        block: {
            display: 'block',
        },
        completedItem: {
            textDecoration: "line-through"
        },
        flexDisplay: {
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            // marginLeft: theme.spacing(),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        }
        
    });

}

const useStyles = makeStyles(styles);

export {useStyles}

export default styles;