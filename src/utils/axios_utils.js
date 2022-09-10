import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:9001/tasks/',
    headers: {
        'Content-type': 'application/json',
    }
});

export const getTasks = (startDayQuery, endDayQuery) => {
    return request.get(`?sort_gte=${startDayQuery}&sort_lte=${endDayQuery}`);
}

export const createTask = (task) => {
    return request.post('/', JSON.stringify(task));
}

export const updateTask = (task) => {
    return request.patch(`/${task.id}`, JSON.stringify(task));
}

export const deleteTask = (task) => {
    return request.delete(`/${task.id}`);
}