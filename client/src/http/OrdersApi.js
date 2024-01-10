import { $host } from ".";


// export const createOrder = async () => {
//     const { data } = await $host.post('api/order/create')
//     return data
// }

// Assuming $host is configured properly
export const createOrder = async (orderData) => {
    try {
        const { data } = await $host.post('api/order/create', orderData);
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Propagate the error for handling in the calling code
    }
};


export const setOrderExecutor = async (id, newExecutorId) => {
    console.log('Setting executor for order ID:', id);
    console.log('New Executor ID:', newExecutorId);
  
    const { data } = await $host.put(`api/order/updateExecutor/${id}/${newExecutorId}`);
    return data;
}; 
  

export const getAllOrders = async () => {
    const { data } = await $host.get('api/order/get')
    return data
}

