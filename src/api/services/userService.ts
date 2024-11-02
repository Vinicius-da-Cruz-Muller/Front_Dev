import { AxiosResponse } from "axios";
import api from "../api";

export async function login(data : FormData){
    const toDto = {
        login : data.get("email"),
        password : data.get("senha")
    }
    const response : AxiosResponse = await api.post("/login",toDto);
    console.log(response.data);
    return response.data;
}

export async function register(data : FormData){
    const toDto = {
        login : data.get("email"),
        password : data.get("senha")
    }
    const response : AxiosResponse = await api.post("/create/user",toDto);
    console.log(response.data);
    return response.data;
}
