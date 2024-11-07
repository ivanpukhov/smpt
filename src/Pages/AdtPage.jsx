import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { TopList } from "../components/Main/TopList";
import api from "../api"; // Подключаем api

export const AdtPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAdt, setSelectedAdt] = useState(null);
    const [ads, setAds] = useState([]);

    // Получение уведомлений с сервера при загрузке компонента
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await api.get("/notifications/emergency-alerts"); // Запрос к серверу
                setAds(response.data); // Устанавливаем уведомления в состояние
            } catch (error) {
                console.error("Ошибка при получении уведомлений:", error);
            }
        };
        fetchAds();
    }, []);

    const showModal = (ad) => {
        setSelectedAdt(ad);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='content adtPage'>
            <TopList title="Объявления" btn="Еще 5" />
            <div className="adt">
                {ads.map((ad, index) => (
                    <div key={index} className="adt__item" onClick={() => showModal(ad)}>
                        {ad.title}
                    </div>
                ))}
            </div>

            <Modal
                title={selectedAdt?.title}
                open={isModalVisible}
                onOk={closeModal}
                onCancel={closeModal}
                footer={[
                    <Button key="ok" type="primary" onClick={closeModal}>
                        ОК
                    </Button>,
                ]}
            >
                <p><strong>Дата:</strong> {new Date(selectedAdt?.createdAt).toLocaleDateString()}</p>
                <p><strong>Описание:</strong> {selectedAdt?.content}</p>
            </Modal>
        </div>
    );
};
