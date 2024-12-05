import api from "../api";

export const createFavorite = async (data: any) => {
    const response = await api.post("/create/favorite", data);
    return response.data;
}

export const listFavoritesByCategory = async (id: number) => {
    const response = await api.get(`/list/favorites/category/${id}`);
    return response.data;
}

export const updateFavorite = async ( data: any) => {
    const response = await api.put(`/update/favorite`, data);
    return response.data;
}

export const deleteFavorite = async (id: any) => {
    const response = await api.delete(`/delete/favorite/${id}`);
    return response.data;
}

export const createTag = async (data: any) => {
    const response = await api.post("/create/tag", data);
    return response.data;
}

export const createTagToFavorite = async (tagId: number, favId: number) => {
    const response = await api.post(`/tag/${tagId}/favorite/${favId}`);
    return response.data;
}

export const deleteTag = async (id: any) => {
    const response = await api.delete(`/delete/tag/${id}`);
    return response.data;
}

export const createTrecho = async (data: any) => {
    const response = await api.post("/create/excerpt", data);
    return response.data;
}

export const updateTrecho = async (data: any) => {
    const response = await api.put("/update/excerpt", data);
    return response.data;
}
