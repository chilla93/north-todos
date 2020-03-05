import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IAppState } from 'src/app/store/reducer';
import { Container, Typography, Box, Button } from '@material-ui/core';
import ItemList from 'src/app/components/ItemList';
import AddIcon from '@material-ui/icons/Add';
import { NewTodoAction, DispatchAction, AddPlaceholderTodoAction, RemovePlaceholderTodoAction, UpdateTodoAction, GetAllTodosAction } from '../store/actions';
import { ITodoItem, ITodoBase, ITodoRequest } from '../models/todo.models';
import {Btn, TodoInput, Todo } from 'src/app/components';
import { IRootState } from '../store';
import SearchInput from '../components/SearchInput';

interface HomeProps {
}

interface HomeReduxProps extends Partial<HomeProps> {
    addNewTodo: (todo: ITodoItem) => void;
    getAllTodos: (searchParams?: ITodoRequest) => void;
    updateTodo: (todo: ITodoItem) => void;
    addPlaceholderTodo: () => void;
    removePlaceholderTodo: () => void;
    todos: Array<ITodoItem>;
    placeholderTodo: ITodoBase | null;
}

interface HomeState {
    
}

export class Home extends Component<HomeProps, HomeState> {
    public state: HomeState = {}
    get reduxprops() {
		return this.props as HomeReduxProps;
    }
    
    componentDidMount(){
        this.reduxprops.getAllTodos();
    }

    render() {
        const {addPlaceholderTodo, addNewTodo, updateTodo, removePlaceholderTodo, todos, placeholderTodo, getAllTodos} = this.reduxprops;
        return (
            <Container fixed={true} component={"div"}>
                <Box mt={8} width="100%">
                    <Typography variant={"h3"}> My Todos</Typography>
                </Box>
                <br />
                <SearchInput onUpdate={getAllTodos} />
                <br />
                <Btn onClick={addPlaceholderTodo} startIcon={<AddIcon />} variant="contained" color="primary"> 
                    Add a To do
                </Btn>
                <br />
                <br />
                <ItemList>
                    {placeholderTodo && <TodoInput onTodoSubmit={addNewTodo} {...placeholderTodo} onCancel={removePlaceholderTodo} />}
                    {todos.map((t, i) => (
                        <Todo onTodoRemove={console.log} onTodoUpdate={updateTodo} key={t.id} todo={t} showDivider={i !== todos.length - 1 || !!placeholderTodo} />
                    ))}
                </ItemList>

            </Container>
        )
    }
}

const mapStateToProps = (state: IRootState): Partial<HomeReduxProps> => ({
    todos: state.app.todos,
    placeholderTodo: state.app.placeholderTodo
})

const mapDispatchToProps = (dispatch: DispatchAction): Partial<HomeReduxProps> => ({
    addNewTodo: (todo: ITodoItem) => dispatch(new NewTodoAction(todo)),
    getAllTodos: (searchParams?: ITodoRequest) => dispatch(new GetAllTodosAction(searchParams)),
    updateTodo: (todo: ITodoItem) => dispatch(new UpdateTodoAction(todo)),
    addPlaceholderTodo: () => dispatch(new AddPlaceholderTodoAction()),
    removePlaceholderTodo: () => dispatch(new RemovePlaceholderTodoAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
