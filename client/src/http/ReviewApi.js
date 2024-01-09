import { $host } from ".";

export const createReview = async (reviewData) => {
    try {
        const { data } = await $host.post('api/review/create', reviewData);
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Propagate the error for handling in the calling code
    }
};

export const getAllReviews= async () => {
    const { data } = await $host.get('api/review/get')
    return data
}