export interface IChecklistItemBase{
    title: string;
    completed: boolean;

}

export interface IChecklistItem extends IChecklistItemBase{
    id: string;
    createdDate: number;
    unsaved?: boolean;
    isNew?: boolean;
    isDeleted?: boolean; 
}

export const sampleChecklist: Array<IChecklistItem> = [
    {
        id: "asd-12113",
        title: "Watch TV",
        completed: false,
        createdDate: new Date().getTime(),
    },
    {
        id: "asd-121355",
        title: "Sleep",
        completed: false,
        createdDate: new Date().getTime(),
    },
    
]