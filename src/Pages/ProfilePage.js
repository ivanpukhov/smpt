import React, { useEffect, useState } from 'react';
import { Typography, Button, Avatar, List, Card, Space, Spin, Row, Col, Empty } from 'antd';
import { EditOutlined, HeartOutlined, PhoneOutlined, UserOutlined, StarOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import api from '../api';

const { Title, Text } = Typography;

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState(0);
    const [rank, setRank] = useState("");
    const [comments, setComments] = useState(0);
    const [likes, setLikes] = useState(0);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedPoints = parseInt(localStorage.getItem('points')) || 0;
        const storedComments = parseInt(localStorage.getItem('comments')) || 0;
        const storedLikes = parseInt(localStorage.getItem('likes')) || 0;

        setPoints(storedPoints);
        setRank(getRank(storedPoints));
        setComments(storedComments);
        setLikes(storedLikes);
    }, []);

    const getRank = (points) => {
        if (points < 10) return "Новичок";
        if (points < 20) return "Участник";
        if (points < 30) return "Опытный";
        return "Мастер";
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/user/profile');
                const profileData = response.data;

                setProfile(profileData);
                setFavorites(profileData.favorites);
            } catch (error) {
                console.error("Ошибка при загрузке профиля:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', padding: '50px' }} />;

    return (
        <div style={{ padding: '24px' }}>
            <Row justify="center" style={{ textAlign: 'center', paddingBottom: '24px' }}>
                <Col>
                    <Avatar size={100} style={{ backgroundColor: '#87d068' }}>
                        {profile.firstName[0]}{profile.lastName[0]}
                    </Avatar>
                    <Title level={3} style={{ marginTop: '16px' }}>Личный кабинет</Title>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        shape="round"
                        size="large"
                        style={{ marginTop: '8px', textTransform: 'none' }}
                        href="/profile/edit"
                    >
                        Редактировать
                    </Button>
                </Col>
            </Row>

            <Row gutter={16} justify="center" style={{ marginTop: '32px' }}>
                <Col span={24} md={12} lg={8}>
                    <Card bordered style={{ borderRadius: '8px' }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Title level={4}>
                                <UserOutlined /> {profile.firstName} {profile.lastName}
                            </Title>
                            <Text><PhoneOutlined /> Телефон: {profile.phone}</Text>
                            <Text><StarOutlined /> Баллы: {points}</Text>
                            <Text><HeartOutlined /> Звание: {rank}</Text>
                            <Text><CommentOutlined /> Комментарии: {comments}</Text>
                            <Text><LikeOutlined /> Лайки: {likes}</Text>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Row justify="center" style={{ marginTop: '32px', textAlign: 'center' }}>
                <Col span={24}>
                    <Title level={4}>Обо мне</Title>
                    <Text>{profile.bio || "Информация отсутствует"}</Text>
                </Col>
            </Row>

            <Row justify="center" style={{ marginTop: '32px' }}>
                <Col span={24}>
                    <Title level={4}>Избранные мероприятия</Title>
                    {favorites.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={<span>Нет избранных мероприятий</span>}
                            style={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}
                        />
                    ) : (
                        <List
                            grid={{ gutter: 16, column: 2 }}
                            dataSource={favorites}
                            renderItem={event => (
                                <List.Item>
                                    <Link to={`/events/${event.id}`} style={{ width: '100%' }}>
                                        <Card
                                            hoverable
                                            style={{
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                transition: 'transform 0.3s',
                                                height: '100%'
                                            }}
                                            bodyStyle={{ padding: '16px' }}
                                            cover={
                                                <div style={{
                                                    height: '160px',
                                                    background: 'linear-gradient(135deg, #6f86d6, #48c6ef)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <HeartOutlined style={{ fontSize: '36px', color: '#fff' }} />
                                                </div>
                                            }
                                        >
                                            <Title level={5}>{event.title}</Title>
                                            <Text type="secondary">
                                                {new Date(event.startDate).toLocaleDateString()} - {event.location}
                                            </Text>
                                            <p style={{ marginTop: '8px' }}>
                                                {event.description.length > 100
                                                    ? `${event.description.substring(0, 100)}...`
                                                    : event.description}
                                            </p>
                                            <Text type="secondary">Лайков: {event.likes}</Text>
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default ProfilePage;
