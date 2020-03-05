import React, { ReactElement, useState } from 'react'
import { ITodoItem, ITodoBase } from '../models/todo.models';
import ItemInput, { ItemInputProps } from './ItemInput';
import { IChecklistItemBase, IChecklistItem } from 'src/app/models/checklistItem.models';

interface ChecklistInputProps extends IChecklistItemBase {
    onCancel: () => void;
    onChecklistItemSubmit: (todo: Partial<IChecklistItem>) => void;
}


function ChecklistInput(props: ChecklistInputProps): ReactElement {
    const {onCancel, title, onChecklistItemSubmit, completed} = props;

    const onSubmit = (text: string) => {
        const createdDate = new Date().getTime();
        const item: Partial<IChecklistItem> = {
            completed,
            title: text,
            createdDate,
            // id: "id-"+createdDate
        }
        onChecklistItemSubmit(item);
    }


    return (
        <ItemInput
            onCancel={onCancel}
            onInputSubmit={onSubmit}
            defaultValue={title}
            label={"Add something new to check off later..."} />
    )
}

export default ChecklistInput
