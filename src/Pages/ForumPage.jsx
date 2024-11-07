import React, { useEffect, useState } from 'react';
import { TopList } from "../components/Main/TopList";
import { ForumItem } from "../components/ForumItem";
import api from '../api'; // импортируйте настроенный axios экземпляр

export const ForumPage = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await api.get('/proposals'); // Запрос на получение списка предложений
                setProposals(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке предложений:", error);
            }
        };

        fetchProposals();
    }, []);

    return (
        <div className='content soska'>
            <TopList title="Обсуждения"/>
            <div className="forum">
                {proposals.map((proposal) => (
                    <ForumItem key={proposal.id} proposal={proposal} /> // Передаем данные в каждый ForumItem
                ))}
            </div>
        </div>
    );
};
