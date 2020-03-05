import React, { ReactElement, useState } from 'react'
import { ITodoItem, ITodoBase } from '../models/todo.models';
import ItemInput, { ItemInputProps } from './ItemInput';

interface TodoInputProps extends ITodoBase {
    onCancel: () => void;
    onTodoSubmit: (todo: ITodoItem) => void;
}


function TodoInput(props: TodoInputProps): ReactElement {
    const {onCancel, title, onTodoSubmit, status} = props;

    const onSubmit = (text: string) => {
        const createdDate = new Date().getTime();
        const todo: ITodoItem = {
            status,
            title: text,
            createdDate,
            id: "id-"+createdDate
        }
        onTodoSubmit(todo);
    }


    return (
        <ItemInput
            onCancel={onCancel}
            onInputSubmit={onSubmit}
            label={"Add whatever you want!!"} />
    )
}

export default TodoInput
