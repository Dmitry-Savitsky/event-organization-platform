import { $host } from ".";
// import { jwtDecode } from "jwt-decode";

export const createService = async (service) => {
    try {
        const { data } = await $host.post('api/service/create', service);
        return data;
    } catch (error) {
        console.error('Error creating service:', error);
        throw error; // Propagate the error for handling in the calling code
    }
};


export const getAllServices = async () => {
    const { data } = await $host.get('api/service/get')
    return data
}

export const getOneService = async (id) => {
    const { data } = await $host.get('api/service/' + id)
    return data
}

export const deleteService = async (id) => {
    const { data } = await $host.delete('api/service/' + id)
    return data
}

export const updateService = async (id, service) => {
    const { data } = await $host.put('api/service/update/' + id, service)
    return data
}