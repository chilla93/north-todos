import { ActionTypes, TodoActionNames } from "./actions"
import { ITodoItem, sampleTodoList, ITodoBase, ITodoDetails, sampleTodoDetails } from "../models/todo.models"
import {UpdateOrIgnoreCollection} from "src/app/shared/Helpers";
import { IChecklistItemBase, IChecklistItem } from 'src/app/models/checklistItem.models';
import { RemoveOrIgnoreCollection } from '../shared/Helpers';

export interface IAppState {
    todos: Array<ITodoItem>;
    currentTodo: ITodoDetails | null;
    placeholderTodo: ITodoBase | null; 
    placeholderChecklistItem: IChecklistItemBase | null; 
}

const initialState: IAppState = {
    todos: [],
    currentTodo: null,
    placeholderTodo: null,
    placeholderChecklistItem: null
}

export default (state:IAppState = initialState, action: ActionTypes) => {

    switch (action.type) {
        case TodoActionNames.GetAllTodosSuccess:
            return { ...state, todos: [...action.payload]}
        case TodoActionNames.NewTodoSuccess:
            return { ...state, placeholderTodo: null, todos: [action.payload, ...state.todos] }
        case TodoActionNames.UpdateTodoSuccess:
            return { ...state, placeholderTodo: null, todos: UpdateOrIgnoreCollection(state.todos, action.payload) }
        case TodoActionNames.GetTodoDetails:
            return { ...state, currentTodo: null }   
        case TodoActionNames.GetTodoDetailsSuccess:
            return { ...state, currentTodo: {...action.payload} }
        case TodoActionNames.DeleteTodoSuccess:
            return { ...state, currentTodo: null }      
        case TodoActionNames.UpdateTodoDetails:
        case TodoActionNames.SaveTodoDetailsSuccess:
            if(!!state.currentTodo){
                return { 
                    ...state, 
                    currentTodo: {
                        ...state.currentTodo, 
                        ...action.payload,
                    } 
                }
            }
            break;
        case TodoActionNames.AddChecklistItem:
            if(!!state.currentTodo){
                const item: IChecklistItem = {...action.payload, id: `tempId-${new Date().getTime()}`, unsaved: true, isNew: true} as IChecklistItem;
                return { 
                    ...state, 
                    placeholderChecklistItem: null, 
                    currentTodo: {
                        ...state.currentTodo, 
                        checklist: [item, ...(state.currentTodo.checklist || [])] 
                    } 
                }
            }
            break;
        case TodoActionNames.UpdateChecklistItem:
            if(!!state.currentTodo){
                const item = {...action.payload, unsaved: true};
                return { 
                    ...state,
                    placeholderChecklistItem: null, 
                    currentTodo: {
                        ...state.currentTodo, 
                        checklist: UpdateOrIgnoreCollection(state.currentTodo.checklist || [], item)
                    } 
                }
            }
            break;
        case TodoActionNames.RemoveChecklistItem:
            if(!!state.currentTodo){
                let checklist = state.currentTodo.checklist;
                if(action.payload.isNew){
                    checklist = RemoveOrIgnoreCollection(state.currentTodo.checklist || [], action.payload)
                }
                else{
                    const item: IChecklistItem = {...action.payload, isDeleted: true}
                    checklist = UpdateOrIgnoreCollection(state.currentTodo.checklist || [], item)
                }
                return { 
                    ...state,
                    placeholderChecklistItem: null, 
                    currentTodo: {
                        ...state.currentTodo, 
                        checklist 
                    } 
                }
            }
            break;
        case TodoActionNames.AddPlaceholderTodoAction:
            return { ...state, placeholderTodo: action.payload}
        case TodoActionNames.RemovePlaceholderTodoAction:
            return { ...state, placeholderTodo: null}  
        case TodoActionNames.AddPlaceholderChecklistAction:
            return { ...state, placeholderChecklistItem: action.payload}
        case TodoActionNames.RemovePlaceholderChecklistAction:
            return { ...state, placeholderChecklistItem: null}                
    }

    return state
}
