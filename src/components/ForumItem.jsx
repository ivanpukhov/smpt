import { useState } from "react";
import { Modal, Button, Typography, Divider } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import DiscussionCommentSection from "./DiscussionCommentSection";
import api from "../api"; // Импорт API-функций

const { Title } = Typography;

export const ForumItem = ({ proposal }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [discussion, setDiscussion] = useState({
        ...proposal,
        upvotes: proposal.upvotes,
        downvotes: proposal.downvotes,
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleVote = async (type) => {
        try {
            await api.post(`/proposals/${proposal.id}/vote`, { vote: type });
            setDiscussion(prev => ({
                ...prev,
                upvotes: type === 'up' ? prev.upvotes + 1 : prev.upvotes,
                downvotes: type === 'down' ? prev.downvotes + 1 : prev.downvotes,
            }));
        } catch (error) {
            console.error("Ошибка при голосовании:", error);
        }
    };

    return (
        <>
            <div className="forum__item" onClick={showModal} style={{ cursor: "pointer" }}>
                {proposal.title}
            </div>

            <Modal
                title={null}
                open={isModalVisible}
                onCancel={closeModal}
                footer={null}
                centered
                width="90%"
                style={{ maxWidth: "600px", borderRadius: "16px", overflow: "hidden", padding: 0 }}
                bodyStyle={{ padding: "16px" }}
            >
                <div style={{ marginBottom: "16px" }}>
                    <Title level={4} style={{ textAlign: "center" }}>{discussion.title}</Title>

                    <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "8px" }}>
                        <Button
                            type="primary"
                            icon={<LikeOutlined />}
                            onClick={() => handleVote('up')}
                        >
                            За ({discussion.upvotes})
                        </Button>
                        <Button
                            type="primary"
                            danger
                            icon={<DislikeOutlined />}
                            onClick={() => handleVote('down')}
                        >
                            Против ({discussion.downvotes})
                        </Button>
                    </div>
                </div>

                <Divider />

                <DiscussionCommentSection discussionId={discussion.id} />
            </Modal>
        </>
    );
};
