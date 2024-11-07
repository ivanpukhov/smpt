// src/pages/SendEmergencyAlertPage.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import api from '../api';

function SendEmergencyAlertPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/notifications/emergency-alert', { title, content });
            setSuccess(true);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Ошибка при отправке уведомления:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>Отправить экстренное уведомление</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Сообщение"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Отправить'}
                </Button>
            </form>
            {success && <Typography color="green" sx={{ mt: 2 }}>Уведомление успешно отправлено!</Typography>}
        </Box>
    );
}

export default SendEmergencyAlertPage;
