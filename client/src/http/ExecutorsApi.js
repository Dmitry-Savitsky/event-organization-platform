// executorsApi.js
import { $host } from ".";

export const createExecutor = async (executor) => {
    try {
        const { data } = await $host.post('api/executor/create', executor);
        return data;
    } catch (error) {
        console.error('Error creating executor:', error);
        throw error; // Propagate the error for handling in the calling code
    }
};

export const getAllExecutors = async () => {
    const { data } = await $host.get('api/executor/get');
    return data;
};

export const getOneExecutor = async (id) => {
    const { data } = await $host.get('api/executor/' + id);
    return data;
};

export const deleteExecutor = async (id) => {
    const { data } = await $host.delete('api/executor/' + id);
    return data;
};

export const updateExecutor = async (id, executor) => {
    const { data } = await $host.put('api/executor/update/' + id, executor);
    return data;
};
