import React, { ReactElement, useEffect } from 'react'
import { Paper, IconButton, InputBase, Grid, Divider, TextField } from '@material-ui/core'
import { useStyles } from '../stylesheets';
import SearchIcon from '@material-ui/icons/Search';
import { TodoStatus, ITodoRequest } from '../models/todo.models';
import { useState } from 'react';

interface ISearchInputProps {
    onUpdate: (searchParams: ITodoRequest) => void;
}

function SearchInput({onUpdate}: ISearchInputProps): ReactElement {
    const classes = useStyles();

    let todoStatusList: {key: string, value: number}[] = [{key: "All", value: -1}];
    for(let key in TodoStatus){
        if(typeof TodoStatus[key] === "number"){
            todoStatusList.push({key, value: +TodoStatus[key]});
        }
    }
    const [searchText, setSearchText] = useState("");
    const [status, setStatus] = useState(-1);

    useEffect(() => {
        onSubmit();
    }, [status]);

    const onSubmit = (e?: React.FormEvent) => {
        !!e && e.preventDefault();

        let params: ITodoRequest = {search: searchText};
        if(status in TodoStatus){
            params.status = status;
        }
        onUpdate(params);
        // console.log(searchText, status, status in TodoStatus, (status as TodoStatus))
    }

    return (
        <Paper component="form" onSubmit={onSubmit} style={{padding: "10px"}} className={classes.list}>
            <Grid container={true}>
                <Grid xs={12} className={classes.flexDisplay} item={true}>
                    <InputBase
                        id="todo-search"
                        className={classes.input}
                        placeholder="Search To dos"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        inputProps={{ 'aria-label': 'search to dos' }}
                        />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Grid>
                <Grid component={Divider} xs={12} className={classes.flexDisplay} item={true} ></Grid>
                <Grid style={{marginTop: 10}} xs={12} className={classes.flexDisplay} item={true}>
                    <TextField
                        id="todo-select"
                        select={true}
                        label="Status Filter"
                        SelectProps={{
                            native: true,
                        }}
                        value={status}
                        onChange={e => setStatus(+e.target.value)}
                        helperText="Please select the status you would like to view"
                        >
                        {todoStatusList.map(option => (
                            <option key={option.key} value={option.value}>
                                {option.key}
                            </option>
                        ))}
                    </TextField>
                </Grid>

            </Grid>

        </Paper>
    )
}

export default SearchInput
