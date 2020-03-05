import { Action } from 'redux';
import { ITodoItem, ITodoBase, TodoStatus, ITodoDetails, ITodoRequest } from '../models/todo.models';
import { IChecklistItem, IChecklistItemBase } from 'src/app/models/checklistItem.models';

export type DispatchAction = (action: Action) => void;

export enum TodoActionNames {
	NewTodo = '[Todo] NewTodo',
	NewTodoSuccess = '[Todo] NewTodoSuccess',
	GetAllTodos = "[Todo] GetAllTodos",
	GetAllTodosSuccess = "[Todo] GetAllTodosSuccess",
	DeleteTodo = '[Todo] DeleteTodo',
	DeleteTodoSuccess = '[Todo] DeleteTodoSuccess',
	UpdateTodo = "[Todo] UpdateTodo",
	UpdateTodoSuccess = "[Todo] UpdateTodoSuccess",
	AddPlaceholderTodoAction = '[Todo] NewPlaceHolderTodo',
	RemovePlaceholderTodoAction = "[Todo] RemovePlaceholderTodo",
	UpdateTodoDetails = "[Todo] UpdateTodoDetails",
	UpdateTodoDetailsSuccess = "[Todo] UpdateTodoDetailsSuccess",
	GetTodoDetails = "[Todo] GetTodoDetails",
	GetTodoDetailsSuccess = "[Todo] GetTodoDetailsSuccess",
	SaveTodoDetails = "[Todo] SaveTodoDetails",
	SaveTodoDetailsSuccess = "[Todo] SaveTodoDetailsSuccess",
	UpdateChecklistItem = "[Todo] UpdateChecklistItem",
	UpdateChecklistItemSuccess = "[Todo] UpdateChecklistItemSuccess",
	AddChecklistItem = "[Todo] AddChecklistItem",
	AddChecklistItemSuccess = "[Todo] AddChecklistItemSuccess",
	RemoveChecklistItem = "[Todo] RemoveChecklistItem",
	RemoveChecklistItemSuccess = "[Todo] RemoveChecklistItemSuccess",
	RemovePlaceholderChecklistAction = "[Todo] RemovePlaceholderChecklist",
	AddPlaceholderChecklistAction = "[Todo] AddPlaceholderChecklist",

} 

export class NewTodoAction implements Action {
	public readonly type = TodoActionNames.NewTodo;
	constructor(public payload: Partial<ITodoItem>) {}
}

export class NewTodoSuccessAction implements Action {
	public readonly type = TodoActionNames.NewTodoSuccess;
	constructor(public payload: ITodoItem) {}
}

export class DeleteTodoAction implements Action {
	public readonly type = TodoActionNames.DeleteTodo;
	constructor(public payload: ITodoItem) {}
}

export class DeleteTodoSuccessAction implements Action {
	public readonly type = TodoActionNames.DeleteTodoSuccess;
}

export class GetAllTodosAction implements Action {
	public readonly type = TodoActionNames.GetAllTodos;
	constructor(public payload?: ITodoRequest) {}
}

export class GetAllTodosSuccessAction implements Action {
	public readonly type = TodoActionNames.GetAllTodosSuccess;
	constructor(public payload: Array<ITodoItem>) {}
}

export class UpdateTodoAction implements Action {
	public readonly type = TodoActionNames.UpdateTodo;
	constructor(public payload: ITodoItem) {}
}

export class UpdateTodoSuccessAction implements Action {
	public readonly type = TodoActionNames.UpdateTodoSuccess;
	constructor(public payload: ITodoItem) {}
}

export class GetTodoDetailsAction implements Action {
	public readonly type = TodoActionNames.GetTodoDetails;
	constructor(public id: string) {}
}

export class GetTodoDetailsSuccessAction implements Action {
	public readonly type = TodoActionNames.GetTodoDetailsSuccess;
	constructor(public payload: ITodoDetails) {}
}

export class SaveTodoDetailsAction implements Action {
	public readonly type = TodoActionNames.SaveTodoDetails;
	constructor(public payload: ITodoDetails) {}
}

export class SaveTodoDetailsSuccessAction implements Action {
	public readonly type = TodoActionNames.SaveTodoDetailsSuccess;
	constructor(public payload: ITodoDetails) {}
}

export class UpdateTodoDetailsAction implements Action {
	public readonly type = TodoActionNames.UpdateTodoDetails;
	constructor(public payload: Partial<ITodoDetails>) {}
}

export class AddChecklistItemAction implements Action {
	public readonly type = TodoActionNames.AddChecklistItem;
	constructor(public payload: Partial<IChecklistItem>) {}
}

export class UpdateChecklistItemAction implements Action {
	public readonly type = TodoActionNames.UpdateChecklistItem;
	constructor(public payload: IChecklistItem) {}
}

export class RemoveChecklistItemAction implements Action {
	public readonly type = TodoActionNames.RemoveChecklistItem;
	constructor(public payload: IChecklistItem) {}
}

export class AddPlaceholderTodoAction implements Action {
	public readonly type = TodoActionNames.AddPlaceholderTodoAction;
	constructor(public payload: ITodoBase = {title: "", status: TodoStatus.Pending}) {}
}

export class RemovePlaceholderTodoAction implements Action {
	public readonly type = TodoActionNames.RemovePlaceholderTodoAction;
}

export class AddPlaceholderChecklistAction implements Action {
	public readonly type = TodoActionNames.AddPlaceholderChecklistAction;
	constructor(public payload: IChecklistItemBase = {title: "", completed: false}) {}
}

export class RemovePlaceholderChecklistAction implements Action {
	public readonly type = TodoActionNames.RemovePlaceholderChecklistAction;
}

export type ActionTypes = 
| NewTodoAction
| NewTodoSuccessAction
| DeleteTodoAction
| DeleteTodoSuccessAction
| GetAllTodosAction
| GetAllTodosSuccessAction
| UpdateTodoAction
| UpdateTodoSuccessAction
| GetTodoDetailsAction
| GetTodoDetailsSuccessAction
| SaveTodoDetailsAction
| SaveTodoDetailsSuccessAction
| UpdateTodoDetailsAction
| AddPlaceholderTodoAction
| RemovePlaceholderTodoAction
| AddChecklistItemAction
| UpdateChecklistItemAction
| RemoveChecklistItemAction
| AddPlaceholderChecklistAction
| RemovePlaceholderChecklistAction
;