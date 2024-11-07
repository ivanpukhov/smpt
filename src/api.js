import axios from 'axios';

const API_URL = 'https://smpt.kz/api';

const api = axios.create({
    baseURL: API_URL,
});

// Установка токена
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    }
};

// Получение информации о заведении и его отзывах
export const getDirectoryService = async (directoryServiceId) => {
    const response = await api.get(`/directory/${directoryServiceId}`);
    return response.data;
};

// Добавление нового отзыва к заведению
export const addDirectoryServiceReview = async (directoryServiceId, reviewData) => {
    const response = await api.post(`/directory-services/${directoryServiceId}/reviews`, reviewData);
    return response.data;
};

export default api;
