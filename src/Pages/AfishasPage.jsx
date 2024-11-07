// src/pages/AfishasPage.js
import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { TopList } from "../components/Main/TopList";
import CalendarSlider from "../components/Main/Afisha/CalendarSlider/CalendarSlider";
import { AfishaItem } from "../components/Main/Afisha/afishaItem";
import api from '../api';

export const AfishasPage = () => {
    const [afishas, setAfishas] = useState([]);
    const [filteredAfishas, setFilteredAfishas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchAfishas = async () => {
            setLoading(true);
            try {
                const response = await api.get('/events');
                setAfishas(response.data);
                setFilteredAfishas(response.data); // По умолчанию показываем все афиши
            } finally {
                setLoading(false);
            }
        };
        fetchAfishas();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const dateString = selectedDate.toISOString().split('T')[0]; // Форматируем дату в строку
            setFilteredAfishas(afishas.filter(afisha => afisha.startDate && afisha.startDate.startsWith(dateString)));
        } else {
            setFilteredAfishas(afishas); // Показываем все, если дата не выбрана
        }
    }, [selectedDate, afishas]);

    if (loading) return <CircularProgress />;

    return (
        <div className="content">
            <div className="afisha">
                <TopList title="Афиша" />
                <CalendarSlider selectedDate={selectedDate} onDateChange={setSelectedDate} />
                <div className="afisha__block">
                    {filteredAfishas.length ? (
                        filteredAfishas.map(afisha => (
                            <AfishaItem key={afisha.id} afisha={afisha} />
                        ))
                    ) : (
                        <Typography>Нет доступных афиш на выбранную дату.</Typography>
                    )}
                </div>
            </div>
        </div>
    );
};
