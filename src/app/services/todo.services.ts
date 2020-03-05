import { fireStoreDb } from "../firebase"
import { ITodoItem, ITodoDetails, ITodoRequest } from "../models/todo.models";
import firebase from "firebase";
import { IChecklistItem } from "../models/checklistItem.models";
import SearchInput from '../components/SearchInput';

class TodoService {
    source: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
    millisecondTimeFactor: number = 1;
    constructor(){
        this.source = fireStoreDb.collection("todos");
    }

    converter(): firebase.firestore.FirestoreDataConverter<ITodoItem>{
        const self = this;
        return {
            toFirestore: function(todo) {
                return {
                    title: todo.title,
                    description: todo.description,
                    status: todo.status,
                    createdDate: firebase.firestore.Timestamp.fromDate(new Date(todo.createdDate/self.millisecondTimeFactor)),
                    dueDate: !!todo.dueDate ? firebase.firestore.Timestamp.fromDate(new Date(todo.dueDate/self.millisecondTimeFactor)) : null
                }
            },
            fromFirestore: function(snapshot, options){
                const data = snapshot.data(options);
                const id = snapshot.id;
                const {title, description, status, createdDate, dueDate} = data;
                const dueDateTime: number | null = !!dueDate ?  dueDate.toDate().getTime() * self.millisecondTimeFactor : null

                return {
                    title,
                    description,
                    status,
                    createdDate: createdDate.toDate().getTime() * self.millisecondTimeFactor,
                    dueDate: dueDateTime,
                    id
                } as ITodoItem
            }
        }
    }

    checklistConverter(): firebase.firestore.FirestoreDataConverter<IChecklistItem>{
        const self = this;
        return {
            toFirestore: function(item) {
                return {
                    title: item.title,
                    completed: item.completed,
                    createdDate: firebase.firestore.Timestamp.fromDate(new Date(item.createdDate/self.millisecondTimeFactor)),
                }
            },
            fromFirestore: function(snapshot, options){
                const data = snapshot.data(options);
                const id = snapshot.id;
                const {title, completed, createdDate} = data;

                return {
                    title,
                    completed,
                    createdDate: createdDate.toDate().getTime() * self.millisecondTimeFactor,
                    id
                } as IChecklistItem
            }
        }
    }

    getAll(request?: ITodoRequest) : Promise<ITodoItem[]>{
        let source = this.source
            .withConverter(this.converter())
            .orderBy("createdDate", "desc");

        if(request?.status){
            source = source.where("status", "==", request.status)
        }

        return source
            .get()
            .then(function(querySnapshot): ITodoItem[] {
                let result: Array<ITodoItem> = [];
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    result.push(doc.data());
                });

                console.log(result);
                return result;
            })
            .then(result => {
                if(!request?.search){
                    return result;
                }

                const parsedSearch = request.search.toUpperCase().trim();

                //why are you soooooo annoying, please learn how to do server side string contains filtering.
                return result.filter(i => {
                    return i.title.toUpperCase().includes(parsedSearch) || i.description?.toUpperCase().includes(parsedSearch);
                })
            })

    }

    getDetails(id: string) : Promise<ITodoDetails>{
        const self = this;
        return this.source
            .doc(id)
            .withConverter(this.converter())
            .get()
            .then(function(doc): ITodoItem {
                const result = doc.data();
                if(!result){
                    throw new Error("couldn't retrieve todo details");
                }

                return result;
            })
            .then(function(todo: ITodoItem): Promise<ITodoDetails> {
                return self
                    .getChecklistItems(todo.id)
                    .then(function (items: IChecklistItem[]){
                        return {...todo, checklist: items} as ITodoDetails;
                    });
            })

    }

    addNewTodo(item: Partial<ITodoItem>): Promise<ITodoItem> {
        const value: ITodoItem = {
            ...item,
            createdDate: new Date().getTime()
        } as ITodoItem;

        return this.source
            .withConverter(this.converter())
            .add(value)
            .then(doc => {
                return {...value, id: doc.id};
            })
    }

    updateTodo(item: ITodoItem): Promise<ITodoItem> {

        return this.source
            .doc(item.id)
            .withConverter(this.converter())
            .set(item, {merge: true})
            .then(doc => {
                return item;
            })
    }

    deleteTodo(todoId: string): Promise<void> {

        return this.source
            .doc(todoId)
            .delete()
    }

    updateTodoDetails(todo: ITodoDetails): Promise<ITodoDetails>{
        const self = this;
        return this.source
            .doc(todo.id)
            .withConverter(this.converter())
            .set(todo, {merge: true})
            .then(function(): Promise<ITodoDetails> {
                return self
                    .saveChecklistItems(todo.id, todo.checklist)
                    .then(function (items: IChecklistItem[]){
                        return {...todo, checklist: items} as ITodoDetails;
                    });
            })
    }

    getChecklistItems(todoId: string){
        return this.source
            .doc(todoId)
            .collection("checklistItems")
            .withConverter(this.checklistConverter())
            .orderBy("createdDate", "desc")
            .get()
            .then(function(querySnapshot): IChecklistItem[] {
                let result: Array<IChecklistItem> = [];
                querySnapshot.forEach(function(doc) {
                    result.push(doc.data());
                });

                return result;
            })
    }

    saveChecklistItems(todoId: string, items: IChecklistItem[]): Promise<IChecklistItem[]>{

        // console.log("we are saving the checklist items now", todoId, items)

        if(!items || !items.length){
            return Promise.resolve([]);
        }

        const batch = fireStoreDb.batch();
        const checklistSource = this.source
            .doc(todoId)
            .collection("checklistItems")
            .withConverter(this.checklistConverter())
            

        items.forEach(i => {
            if(i.isNew){
                batch.set(checklistSource.doc(), i)
                return;
            }

            if(i.unsaved){
                batch.set(checklistSource.doc(i.id), i)
                return;
            }

            if(i.isDeleted){
                batch.delete(checklistSource.doc(i.id))
            }
            
        })

        return batch.commit().then(() => {
            return this.getChecklistItems(todoId);
        })
                    
    }
}

export const todoService = new TodoService();