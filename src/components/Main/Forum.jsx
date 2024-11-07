// src/components/Forum.js
import React, { useEffect, useState } from 'react';
import { TopList } from "./TopList";
import { ForumItem } from "../ForumItem";
import { Link } from "react-router-dom";
import api from '../../api'; // импортируйте настроенный axios экземпляр

export const Forum = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProposals = async () => {
            setLoading(true);
            try {
                const response = await api.get('/proposals'); // Запрос на получение списка предложений
                setProposals(response.data.slice(0, 6)); // Получаем только первые 6 записей
            } catch (error) {
                console.error("Ошибка при загрузке предложений:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    if (loading) return <p>Загрузка...</p>;

    return (
        <>
            <TopList title="Обсуждения" btn="Еще 5" />
            <div className="forum">
                {proposals.length ? (
                    proposals.map((proposal) => (
                        <ForumItem key={proposal.id} proposal={proposal} /> // Передаем данные в каждый ForumItem
                    ))
                ) : (
                    <p>Нет доступных обсуждений.</p>
                )}
            </div>
            <Link to='/forum' className="seeAll">Показать еще</Link>
        </>
    );
};
