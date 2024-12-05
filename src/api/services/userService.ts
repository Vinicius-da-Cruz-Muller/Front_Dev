import { AxiosResponse } from "axios";
import api from "../api";

export async function login(data : any){
    const response : AxiosResponse = await api.post("/login",data);
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

export async function getUserId(login:string) {
    const response : AxiosResponse = await api.get(`/user/login?login=${login}`);
    return response.data;
}
