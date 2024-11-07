// src/components/Main/Afisha/Afisha.js
import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Title } from "../Title";
import CalendarSlider from "./CalendarSlider/CalendarSlider";
import { AfishaItem } from "./afishaItem";
import { TopList } from "../TopList";
import { Link } from "react-router-dom";
import api from '../../../api';

export const Afisha = () => {
    const [afishas, setAfishas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchAfishas = async () => {
            setLoading(true);
            try {
                const response = await api.get('/events');
                setAfishas(response.data.slice(0, 6)); // Получаем только первые 6 записей
            } finally {
                setLoading(false);
            }
        };
        fetchAfishas();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const dateString = selectedDate.toISOString().split('T')[0];
            setAfishas(prevAfishas =>
                prevAfishas.filter(afisha => afisha.startDate && afisha.startDate.startsWith(dateString))
            );
        }
    }, [selectedDate]);

    if (loading) return <CircularProgress />;

    return (
        <div className="afisha">
            <Title />
            <TopList title="Афиша" btn="Еще 5" />
            <CalendarSlider selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <div className="afisha__block">
                {afishas.length ? (
                    afishas.map(afisha => (
                        <AfishaItem key={afisha.id} afisha={afisha} />
                    ))
                ) : (
                    <Typography>Нет доступных афиш на выбранную дату.</Typography>
                )}
            </div>
            <Link to="/events" className="seeAll">Показать еще</Link>
        </div>
    );
};
