import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Typography, Card } from "antd";
import Swal from 'sweetalert2';
import InputMask from "react-input-mask";
import { PhoneOutlined, EnvironmentOutlined, FileTextOutlined } from '@ant-design/icons';
import api from '../../api'; // Импорт API
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export const EmergencyModal = ({ isModalVisible, setIsModalVisible }) => {
    const [service, setService] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phone') || "");
    const [message, setMessage] = useState("");
    const [location, setLocation] = useState({ lat: 54.8667, lng: 69.15 });
    const [step, setStep] = useState(1);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const phoneMap = {
        "Скорая помощь": "103",
        "Пожарная служба": "101",
        "Горгаз": "104",
        "МЧС": "112",
        "Полиция": "102",
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    const handleCancel = () => {
        setIsModalVisible(false);
        setStep(1);
        setService(null);
    };

    const handleServiceChange = (value) => {
        setService(value);
        setStep(2);
    };

    const handleSubmit = async () => {
        if (!phoneNumber.trim()) {
            Swal.fire({
                title: 'Ошибка',
                text: 'Пожалуйста, введите номер телефона',
                icon: 'error',
                confirmButtonColor: '#ff3366'
            });
            return;
        }

        setSaving(true);
        try {
            await api.post(`/emergency-services/${phoneMap[service]}/request`, {
                userPhone: phoneNumber, // Используем userPhone вместо phoneNumber
                message,
                location: `${location.lat},${location.lng}`
            });
            localStorage.setItem('phone', phoneNumber);
            Swal.fire({
                title: 'Успешно отправлено',
                text: `Ваше обращение отправлено в службу: ${service}`,
                icon: 'success',
                confirmButtonColor: '#00aaff'
            });
            navigate('/emergency-services/requests');
        } catch (error) {
            console.error("Ошибка при отправке обращения:", error);
            Swal.fire({
                title: 'Ошибка',
                text: 'Не удалось отправить обращение. Попробуйте снова позже.',
                icon: 'error',
                confirmButtonColor: '#ff3366'
            });
        } finally {
            setSaving(false);
        }
    };

    const CallButton = () => {
        if (!service) return null;
        return (
            <Button type="primary" icon={<PhoneOutlined />} href={`tel:${phoneMap[service]}`} style={{ background: "#ff3366", borderColor: "#ff3366", marginBottom: "1rem" }}>
                Позвонить
            </Button>
        );
    };

    return (
        <Modal
            title={<Title level={3} style={{ textAlign: "center", color: "#ff3366" }}>Экстренные службы</Title>}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            styles={{ body: { padding: '2rem', background: '#f5f7fa', borderRadius: '12px' } }}
            width={600}
        >
            {step === 1 && (
                <div style={{ textAlign: "center" }}>
                    <Title level={4} style={{ marginBottom: "1rem", color: "#444" }}>Выберите службу</Title>
                    <div className="service-cards" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                        {[
                            { name: "Скорая помощь", icon: "🚑" },
                            { name: "Пожарная служба", icon: "🔥" },
                            { name: "Горгаз", icon: "🏭" },
                            { name: "МЧС", icon: "🚨" },
                            { name: "Полиция", icon: "👮‍♂️" }
                        ].map((service) => (
                            <Card
                                key={service.name}
                                hoverable
                                style={{ width: 120, background: "#ffffff", borderRadius: "8px", textAlign: "center" }}
                                onClick={() => handleServiceChange(service.name)}
                                styles={{ body: { padding: "1rem" } }}
                            >
                                <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                                <Text strong style={{ color: "#444" }}>{service.name}</Text>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <CallButton />
                    </div>

                    <div className="form-section" style={{ marginBottom: "1.5rem" }}>
                        <Text strong style={{ color: "#444" }}>
                            <PhoneOutlined style={{ marginRight: "0.5rem", color: "#00aaff" }} /> Ваш номер телефона
                        </Text>
                        <InputMask
                            mask="+7 999 999 99 99"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        >
                            {() => (
                                <Input
                                    style={{
                                        marginBottom: "1rem",
                                        borderRadius: "8px",
                                        padding: "0.75rem",
                                    }}
                                    placeholder="+7 777 777 77 77"
                                />
                            )}
                        </InputMask>
                    </div>

                    <div className="form-section" style={{ marginBottom: "1.5rem" }}>
                        <Text strong style={{ color: "#444" }}>
                            <EnvironmentOutlined style={{ marginRight: "0.5rem", color: "#00aaff" }} /> Ваше местоположение
                        </Text>
                        <Input
                            style={{
                                marginBottom: "1rem",
                                borderRadius: "8px",
                                padding: "0.75rem",
                            }}
                            value={`${location.lat}, ${location.lng}`}
                            disabled
                        />
                    </div>

                    <div className="form-section" style={{ marginBottom: "1.5rem" }}>
                        <Text strong style={{ color: "#444" }}>
                            <FileTextOutlined style={{ marginRight: "0.5rem", color: "#00aaff" }} /> Опишите ваше обращение
                        </Text>
                        <Input.TextArea
                            rows={4}
                            placeholder="Ваше сообщение"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ borderRadius: "8px", padding: "0.75rem" }}
                        />
                    </div>

                    <div style={{ marginTop: "1rem", textAlign: "center" }}>
                        <Button
                            type="primary"
                            style={{
                                background: "linear-gradient(45deg, #00aaff, #00ffaa)",
                                borderColor: "#00aaff",
                                color: "#fff",
                                fontWeight: "bold",
                                padding: "0.5rem 1.5rem"
                            }}
                            onClick={handleSubmit}
                            loading={saving}
                        >
                            Отправить
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
};
