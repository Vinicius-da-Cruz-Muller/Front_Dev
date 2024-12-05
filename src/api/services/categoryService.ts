import api from "../api";

export const createCategory = async (data: any) => {
    const response = await api.post("/create/category", data);
    return response.data;
}

export const listCategory = async (id: number) => {
    const response = await api.get(`/list/category/${id}`);
    return response.data;
}

export const getCategories = async () => {
    const response = await api.get("list/categories");
    return response.data;
}

export const updateCategory = async (id: any, data: any) => {
    const response = await api.put(`/update/category/${id}`, data);
    return response.data;
}


