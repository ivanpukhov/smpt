import React, { useState } from "react";
import { TopList } from "../TopList";
import { EmergencyModal } from "../EmergencyModal";

export const Sos = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <div className='soska'>
            <TopList title="Чрезвычайная ситуация" />

            <div className="sos">
                <div className="sos__subtitle">Экстренная служба</div>
                <div className="sos__title">Нужна срочная помощь?</div>
                <div className="sos__button" onClick={showModal}>
                    Обратиться
                </div>
            </div>

            <EmergencyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </div>
    );
};
