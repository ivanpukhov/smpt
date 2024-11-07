import { useState } from 'react';
import { Modal, Button } from 'antd';
import {TopList} from "./Main/TopList";
import {Link} from "react-router-dom";

export const Spravka = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState('');
    const [selectedName, setSelectedName] = useState('');

    const data = [
        {"name": "Открытый акимат", "phone": "109"},
        {"name": "При симптомах коронавируса", "phone": "1409"},
        {"name": "Противопожарная служба", "phone": "101"},
        {"name": "Департамент по ЧС", "phone": "+77152522454"},
        {"name": "Заказ газовых баллонов и газа", "phone": "+77152470404"},

    ];

    const showModal = (name, phone) => {
        setSelectedName(name);
        setSelectedPhone(phone);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedPhone('');
    };

    return (
        <div className=' soska'>
            <TopList title="Справочная"  />

            <div className="spravka">
                {data.map((item, index) => (
                    <div
                        className='spravka__item'
                        onClick={() => showModal(item.name, item.phone)}
                        key={index}
                    >
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

            <Modal
                title={selectedName}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Закрыть</Button>,
                    <Button key="call" type="primary" href={`tel:${selectedPhone}`}>
                        Позвонить
                    </Button>,
                ]}
            >
                <p>Номер телефона: {selectedPhone}</p>
            </Modal>
            <Link to='/spravka' className="seeAll">Показать еще</Link>

        </div>
    );
};
