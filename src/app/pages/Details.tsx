import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IAppState } from 'src/app/store/reducer';
import { Container, Typography, Box, Button, Paper, TextField, Divider, IconButton, withStyles, WithStyles, Checkbox, Grid } from '@material-ui/core';
import ItemList from 'src/app/components/ItemList';
import { NewTodoAction, DispatchAction, AddPlaceholderTodoAction, RemovePlaceholderTodoAction, UpdateTodoAction, RemovePlaceholderChecklistAction, AddPlaceholderChecklistAction, UpdateChecklistItemAction, UpdateTodoDetailsAction, AddChecklistItemAction, RemoveChecklistItemAction, GetTodoDetailsAction, SaveTodoDetailsAction, DeleteTodoAction } from '../store/actions';
import { ITodoItem, ITodoBase, ITodoDetails, TodoStatus } from '../models/todo.models';
import {Btn, TodoInput, Todo, DateTimeInput } from 'src/app/components';
// import DirectionsIcon from '@material-ui/icons/Directions';
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from '../stylesheets';
import { IChecklistItem, IChecklistItemBase } from 'src/app/models/checklistItem.models';
import ChecklistItem from '../components/ChecklistItem';
import ChecklistInput from '../components/ChecklistInput';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IRootState } from '../store/index';

type DetailsPropsType = WithStyles<typeof styles> & RouteComponentProps<{id: string}>;
interface DetailsProps extends DetailsPropsType {
}

interface DetailsReduxProps extends Partial<DetailsProps> {
    addNewTodo: (todo: ITodoItem) => void;
    getTodoDetails: (id: string) => void;
    updateTodoDetails: (todo: Partial<ITodoDetails>) => void;
    deleteTodoItem: (todo: ITodoItem) => void;
    saveTodoDetails: (todo: ITodoDetails) => void;
    addChecklistItem: (item: Partial<IChecklistItem>) => void;
    updateChecklistItem: (item: IChecklistItem) => void;
    removeChecklistItem: (item: IChecklistItem) => void;
    addPlaceholderChecklistItem: () => void;
    removePlaceholderChecklistItem: () => void;
    currentTodo: ITodoDetails | null;
    placeholderChecklistItem: IChecklistItemBase | null;
}

interface DetailsState {
    
}

export class Details extends Component<DetailsProps, DetailsState> {
    public state: DetailsState = {}
    get reduxprops() {
		return this.props as DetailsReduxProps;
    }
    
    componentDidMount(){
        // console.log("get details about this id", this.props.match.params.id);
        this.reduxprops.getTodoDetails(this.props.match.params.id);
    }

    render() {
        const {
            currentTodo, 
            placeholderChecklistItem, 
            addPlaceholderChecklistItem, 
            addChecklistItem,
            updateChecklistItem,
            removeChecklistItem,
            updateTodoDetails,
            deleteTodoItem,
            removePlaceholderChecklistItem,
            saveTodoDetails,
        } = this.reduxprops;
        const {classes, history} = this.props;

        if(currentTodo == null){
            return (
                <Container fixed={true} component={"div"}>
                    <Box mt={8} width="100%">
                        <Typography variant={"h3"}>Loading...</Typography>
                    </Box>
                </Container>
            )
        }
        return (
            <Container fixed={true} component={"div"}>
                <Box mt={8} width="100%">
                    <Typography variant={"h3"}> Details</Typography>
                </Box>
                <br />
                <Box mb={4} component={Paper} p={2}>
                    <Box mb={4} className={classes.flexDisplay}>
                        <IconButton color="primary" aria-label="directions">
                            <Checkbox
                                edge="start"
                                checked={currentTodo.status === TodoStatus.Complete}
                                onChange={(_, value) => updateTodoDetails({status: value ? TodoStatus.Complete : TodoStatus.Pending})}
                                tabIndex={-1}
                                disableRipple
                                color={"primary"}
                            />
                        </IconButton>
                        <TextField
                            id="details-full-width"
                            label="Title"
                            fullWidth={true}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={currentTodo.title}
                            onChange={e => updateTodoDetails({title: e.target.value})}
                            variant="outlined"
                            className={classes.input}
                            />
                    </Box>
                    <Divider />
                    <Box mb={1} className={classes.flexDisplay}>
                        <TextField
                            id="details-full-width"
                            label="Description"
                            // fullWidth={true}
                            margin="normal"
                            multiline={true}
                            rows="5"
                            value={currentTodo.description}
                            onChange={e => updateTodoDetails({description: e.target.value})}
                            className={classes.input}
                            />
                    </Box>
                    <Box mb={1} className={classes.flexDisplay}>
                        <Btn onClick={addPlaceholderChecklistItem} startIcon={<AddIcon />} variant="contained" color="primary"> 
                            Add a Subtask
                        </Btn>
                    </Box>
                    <Box mb={3} className={classes.flexDisplay}>
                        <ItemList>
                            {placeholderChecklistItem && (
                                <ChecklistInput 
                                    onChecklistItemSubmit={addChecklistItem} 
                                    {...placeholderChecklistItem} 
                                    onCancel={removePlaceholderChecklistItem} />
                            )}
                            {currentTodo.checklist.filter(t => !t.isDeleted).map((t, i) => (
                                <ChecklistItem 
                                    onChecklistItemUpdate={updateChecklistItem} 
                                    onChecklistItemRemove={removeChecklistItem}
                                    key={t.id} 
                                    item={t} 
                                    showDivider={i !== currentTodo.checklist.length - 1 || !!placeholderChecklistItem} />
                            ))}
                        </ItemList>
                    </Box>
                    <Box justifyContent={"space-between"} className={classes.flexDisplay}>
                        <DateTimeInput label={"Pick a due date"} currentDate={currentTodo.dueDate} handleCurrentDateChange={value => updateTodoDetails({dueDate: value})}  />
                        <Grid item={true}>
                            <Grid container={true} spacing={2} justify={"flex-end"}>
                                <Grid item={true}>
                                    <Btn onClick={() => deleteTodoItem(currentTodo)} startIcon={<DeleteForeverIcon />} variant="contained" color="secondary"> 
                                        Delete
                                    </Btn>
                                </Grid>
                                <Grid item={true}>
                                    <Btn onClick={() => saveTodoDetails(currentTodo)} startIcon={<SaveIcon />} variant="contained" color="primary"> 
                                        Save
                                    </Btn>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Box>
                    
                </Box>
            </Container>
        )
    }
}

const mapStateToProps = (state: IRootState): Partial<DetailsReduxProps> => ({
    currentTodo: state.app.currentTodo,
    placeholderChecklistItem: state.app.placeholderChecklistItem
})

const mapDispatchToProps = (dispatch: DispatchAction): Partial<DetailsReduxProps> => ({
    addNewTodo: (todo: ITodoItem) => dispatch(new NewTodoAction(todo)),
    updateTodoDetails: (todo: Partial<ITodoDetails>) => dispatch(new UpdateTodoDetailsAction(todo)),
    deleteTodoItem: (todo: ITodoItem) => dispatch(new DeleteTodoAction(todo)),
    saveTodoDetails: (todo: ITodoDetails) => dispatch(new SaveTodoDetailsAction(todo)),
    getTodoDetails: (id: string) => dispatch(new GetTodoDetailsAction(id)),
    addChecklistItem: (item: Partial<IChecklistItem>) => dispatch(new AddChecklistItemAction(item)),
    updateChecklistItem: (item: IChecklistItem) => dispatch(new UpdateChecklistItemAction(item)),
    removeChecklistItem: (item: IChecklistItem) => dispatch(new RemoveChecklistItemAction(item)),
    addPlaceholderChecklistItem: () => dispatch(new AddPlaceholderChecklistAction()),
    removePlaceholderChecklistItem: () => dispatch(new RemovePlaceholderChecklistAction()),
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Details)))
