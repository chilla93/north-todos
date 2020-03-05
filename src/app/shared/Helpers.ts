import _ from "lodash";

export interface IWithId {
    id: string | number;
}

export const UpdateOrIgnoreCollection = <T1 extends IWithId> (collection: Array<T1>, item: T1): Array<T1>  =>{
    const i = _.findIndex(collection, i => i.id === item.id);

    if (i > -1) {
        collection = [...collection.slice(0, i), item, ...collection.slice(i + 1)];
    }

    return collection;
}

export const RemoveOrIgnoreCollection = <T1 extends IWithId> (collection: Array<T1>, item: T1): Array<T1>  =>{
    const i = _.findIndex(collection, i => i.id === item.id);

    if (i > -1) {
        collection = [...collection.slice(0, i), ...collection.slice(i + 1)];
    }

    return collection;
}