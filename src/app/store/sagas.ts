import { takeLatest, call, put } from 'redux-saga/effects';

import { TodoActionNames, NewTodoAction, GetAllTodosSuccessAction, NewTodoSuccessAction, UpdateTodoAction, UpdateTodoSuccessAction, GetTodoDetailsAction, GetTodoDetailsSuccessAction, SaveTodoDetailsAction, SaveTodoDetailsSuccessAction, DeleteTodoAction, DeleteTodoSuccessAction, GetAllTodosAction } from './actions';
import { todoService } from '../services/todo.services';
import { push } from 'connected-react-router';



function* GetAllTodos(action: GetAllTodosAction) {
    const getAll = todoService.getAll.bind(todoService)
    const result = yield call(getAll, action.payload)

    yield put(new GetAllTodosSuccessAction(result));
    
}

function* AddNewTodo(action: NewTodoAction) {
    const {title, status} = action.payload;
    const item = {
        title,
        status,
        description: "",
    }

    const addNewTodo = todoService.addNewTodo.bind(todoService)

    const result = yield call(addNewTodo, item)

    yield put(new NewTodoSuccessAction(result));
}

function* UpdateTodo(action: UpdateTodoAction) {
    const result = yield call(todoService.updateTodo.bind(todoService), action.payload)

    yield put(new UpdateTodoSuccessAction(result));
}

function* DeleteTodo(action: DeleteTodoAction) {
    yield call(todoService.deleteTodo.bind(todoService), action.payload.id)

    yield put(new DeleteTodoSuccessAction());
    yield put(push("/"))
}

function* SaveTodoDetails(action: SaveTodoDetailsAction) {
    const result = yield call(todoService.updateTodoDetails.bind(todoService), action.payload)

    yield put(new SaveTodoDetailsSuccessAction(result));
    yield put(push("/"))
}

function* GetTodoDetails(action: GetTodoDetailsAction) {
    const result = yield call(todoService.getDetails.bind(todoService), action.id);


    console.log(result);
    yield put(new GetTodoDetailsSuccessAction(result));
}

export default function*() {
    yield takeLatest(TodoActionNames.NewTodo, AddNewTodo);
    yield takeLatest(TodoActionNames.DeleteTodo, DeleteTodo);
    yield takeLatest(TodoActionNames.UpdateTodo, UpdateTodo);
    yield takeLatest(TodoActionNames.SaveTodoDetails, SaveTodoDetails);
    yield takeLatest(TodoActionNames.GetAllTodos, GetAllTodos);
    yield takeLatest(TodoActionNames.GetTodoDetails, GetTodoDetails);
}
