// src/pages/AdminPage.js
import React, {useEffect, useState} from 'react';
import {Button, Divider, List, Typography} from 'antd';
import {Link} from 'react-router-dom';
import api from '../api';

const {Title, Text} = Typography;

function AdminPage() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/emergency-services');
                setServices(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке служб:", error);
            }
        };
        fetchServices();
    }, []);

    return (
        <div style={{padding: '24px', backgroundColor: '#f0f2f5'}}>
            <Title level={2} style={{fontWeight: 'bold', marginBottom: '24px'}}>Админ Панель</Title>

            <Title level={4} style={{marginBottom: '16px'}}>Список экстренных служб</Title>
            <List
                bordered
                dataSource={services}
                renderItem={(service) => (
                    <List.Item
                        key={service.phoneNumber}
                        actions={[
                            <Button type="primary">
                                <Link to={`/emergency-services/${service.phoneNumber}/requests`}>Просмотреть
                                    обращения</Link>
                            </Button>,
                        ]}
                        style={{padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '8px'}}
                    >
                        <Text style={{fontSize: '16px', fontWeight: '500'}}>{service.name}</Text>
                    </List.Item>
                )}
            />

            <Button type="primary" style={{marginTop: '24px'}}>
                <Link to="/send-emergency-alert">Отправить экстренное сообщение</Link>
            </Button>
            <Divider />
            <Button type="primary" style={{marginTop: '24px'}}>
                <Link to="/send-emergency-alert">Отправить экстренное сообщение</Link>
            </Button>
            <Divider />

            <Button type="primary" style={{marginTop: '24px'}}>
                <Link to="/discussions/add">Добавить обсуждение</Link>
            </Button>
            <Divider />

            <Button type="primary" style={{marginTop: '24px'}}>
                <Link to="/events/add">Добавить мероприятие</Link>
            </Button>
        </div>
    );
}

export default AdminPage;
