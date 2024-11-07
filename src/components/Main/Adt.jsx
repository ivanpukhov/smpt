import { useState, useEffect } from "react";
import { Modal, Button, App } from "antd";
import { TopList } from "./TopList";
import { Link } from "react-router-dom";
import api from "../../api"; // Импортируем api для запросов к серверу

export const Adt = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAdt, setSelectedAdt] = useState(null);
    const [ads, setAds] = useState([]);
    const [visibleAds, setVisibleAds] = useState([]);

    // Получение уведомлений с сервера при загрузке компонента
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await api.get("/notifications/emergency-alerts"); // Запрос к серверу
                setAds(response.data); // Устанавливаем все уведомления в состояние
                setVisibleAds(response.data.slice(0, 5)); // Показываем первые 5 уведомлений
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

    const remainingAdsCount = ads.length - visibleAds.length;

    return (
        <App>
            <TopList title="Объявления" btn={`Еще ${remainingAdsCount > 0 ? remainingAdsCount : 0}`} />
            <div className="adt">
                {visibleAds.map((ad, index) => (
                    <div key={index} className="adt__item" onClick={() => showModal(ad)}>
                        {ad.title}
                    </div>
                ))}
            </div>
            <Link to='/adt' className="seeAll">Показать еще</Link>

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
                <p><strong>Дата:</strong> {selectedAdt?.createdAt ? new Date(selectedAdt.createdAt).toLocaleDateString() : ""}</p>
                <p><strong>Описание:</strong> {selectedAdt?.content}</p>
            </Modal>
        </App>
    );
};
