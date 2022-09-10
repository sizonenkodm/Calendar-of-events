import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';
import { Context } from 'App';
import { createTask, updateTask, deleteTask } from 'utils/axios_utils';
import styles from './Form.module.scss';

const Form = () => {
    const {
        openForm,
        setOpenForm,
        taskForUpdate,
        setTaskForUpdate,
        setTasks,
        setUpdatingTasks
    } = useContext(Context);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [showElementsForUpd, setShowElementsForUpd] = useState(false);

    const handleSubmit = () => {
        const task = {
            sort: Date.parse(date),
            title,
            description,
            date,
            time
        }

        console.log(task);

        if (Object.keys(taskForUpdate).length !== 0) {
            task.id = taskForUpdate.id;
            task.updatedAt = moment().clone().format('DD.MM.YYYY HH:mm');
            updateTask(task);
        } else {
            task.id = Date.now();
            task.createdAt = moment().clone().format('DD.MM.YYYY HH:mm');
            createTask(task);
        }

        setUpdatingTasks(true);

        setTimeout(() => {
            toDefaultValues();
        }, 300);
    }

    const handleDelete = () => {
        const task = {
            id: taskForUpdate.id
        }

        deleteTask(task)
            .then(() => {
                setTasks(prevState => prevState.filter(el => el.id !== task.id));
            })
            .finally(() => {
                setTimeout(() => {
                    toDefaultValues();
                }, 300);
            })
    }

    const toDefaultValues = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setOpenForm(false);
        setTaskForUpdate({});
        setShowElementsForUpd(false);
        setUpdatingTasks(false);
    }

    useEffect(() => {
        if (Object.keys(taskForUpdate).length !== 0) {
            setTitle(taskForUpdate.title);
            setDescription(taskForUpdate.description);
            setDate(taskForUpdate.date);
            setTime(taskForUpdate.time);
            setShowElementsForUpd(true);
        }
    }, [taskForUpdate])

    return (
        <Dialog
            open={openForm}
            onClose={() => {
                setOpenForm(false);
            }}
        >
            <DialogTitle>
                Add new task
                {
                    showElementsForUpd && <DialogContentText>
                        <small>Created at: {taskForUpdate.createdAt}<br /></small>
                        {taskForUpdate.updatedAt && <small>Updated at: {taskForUpdate.updatedAt}</small>}
                    </DialogContentText>
                }
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="title"
                    label="Title"
                    type="text"
                    value={title}
                    autoFocus
                    margin="dense"
                    required
                    fullWidth
                    variant="outlined"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField
                    id="description"
                    label="Description"
                    type="text"
                    value={description}
                    multiline
                    rows={3}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <div className={styles.date}>
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        value={date}
                        required
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <TextField
                        id="time"
                        label="Time"
                        type="time"
                        value={time}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300,
                        }}
                        sx={{ width: 150 }}
                        onChange={(event) => setTime(event.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpenForm(false);
                    }}
                >
                    Cancel
                </Button>
                {
                    showElementsForUpd && <Button
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                }
                <Button
                    onClick={handleSubmit}
                    disabled={(!title || !date) ? true : false}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Form;