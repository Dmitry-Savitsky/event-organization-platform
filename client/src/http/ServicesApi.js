import { $host } from ".";
import { jwtDecode } from "jwt-decode";

export const getAllServices = async () => {
    const { data } = await $host.get('api/service/get')
    return data
}