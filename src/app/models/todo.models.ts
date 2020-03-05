import { IChecklistItem, sampleChecklist } from './checklistItem.models';

export interface ITodoBase {
    title: string;
    status: TodoStatus;
}

export interface ITodoItem extends ITodoBase{
    id: string;
    dueDate?: number | null;
    createdDate: number;
    description?: string;
}

export interface ITodoDetails extends ITodoItem {
    checklist: Array<IChecklistItem>
}

export enum TodoStatus {
    Pending = 10,
    Complete = 20
}

export interface ITodoRequest {
    search: string;
    status?: TodoStatus;
}

export const sampleTodoList: Array<ITodoItem> = [
    {
        id: "2",
        title: "Buy things",
        description: "Buy all the things you can find",
        status: TodoStatus.Pending,
        createdDate: new Date().getTime(),
    },
    {
        id: "1",
        title: "Buy things",
        description: "Buy all the things you can find",
        status: TodoStatus.Pending,
        createdDate: new Date().getTime(),
    },
    {
        id: "3",
        title: "Buy things",
        status: TodoStatus.Pending,
        createdDate: new Date().getTime(),
    },
    
]

export const sampleTodoDetails: ITodoDetails = {
    ...sampleTodoList[0],
    checklist: sampleChecklist
}