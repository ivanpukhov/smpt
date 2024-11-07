// src/pages/AddEventPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AddEventPage() {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        tags: [],
        price: ''
    });
    const [image, setImage] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSave = async () => {
        setSaving(true);
        const formData = new FormData();
        formData.append('title', eventData.title);
        formData.append('description', eventData.description);
        formData.append('location', eventData.location);
        formData.append('startDate', eventData.startDate);
        formData.append('endDate', eventData.endDate);
        formData.append('price', eventData.price);
        formData.append('tags', eventData.tags);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await api.post('/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/events/${response.data.id}`);
        } catch (error) {
            console.error("Ошибка при создании мероприятия:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>Добавить мероприятие</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Название"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Описание"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />
                <TextField
                    label="Локация"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Дата начала"
                    name="startDate"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={eventData.startDate}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Дата окончания"
                    name="endDate"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={eventData.endDate}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Цена"
                    name="price"
                    type="number"
                    value={eventData.price}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Теги"
                    name="tags"
                    value={eventData.tags}
                    onChange={(e) => setEventData((prevData) => ({
                        ...prevData,
                        tags: e.target.value.split(',')
                    }))}
                    helperText="Введите теги, разделенные запятыми"
                    fullWidth
                />
                <Button
                    variant="outlined"
                    component="label"
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                    Загрузить изображение
                    <input type="file" hidden onChange={handleImageChange} />
                </Button>
                {image && <Typography>Файл выбран: {image.name}</Typography>}
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                    {saving ? <CircularProgress size={24} /> : 'Сохранить'}
                </Button>
            </Box>
        </Box>
    );
}

export default AddEventPage;
