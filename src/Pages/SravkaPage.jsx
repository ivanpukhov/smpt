import { useState } from 'react';
import { Modal, Button } from 'antd';
import {TopList} from "../components/Main/TopList";

export const Spavka = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState('');
    const [selectedName, setSelectedName] = useState('');

    const data = [
        {"name": "Открытый акимат", "phone": "109"},
        {"name": "При симптомах коронавируса", "phone": "1409"},
        {"name": "Противопожарная служба", "phone": "101"},
        {"name": "Полиция", "phone": "102"},
        {"name": "Скорая медицинская помощь", "phone": "103"},
        {"name": "Аварийная горгаза", "phone": "104"},
        {"name": "Департамент по ЧС", "phone": "+77152522454"},
        {"name": "Заказ газовых баллонов и газа", "phone": "+77152470404"},
        {"name": "Диспетчер теплосетей", "phone": "+77152522686"},
        {"name": "Диспетчер электросетей", "phone": "154"},
        {"name": "Аварийная ТОО Кызылжар Су", "phone": "+77152501386"},
        {"name": "Заказ междугородних и международных переговоров", "phone": "171"},
        {"name": "Прием телеграмм по телефону", "phone": "166"},
        {"name": "Аварийное открытие дверей", "phone": "+77772492667"},
        {"name": "ПК аварийная служба (уличное освещение)", "phone": "+77152528901"},
        {"name": "ТОО Энергоцентр, прием показаний по водомерам", "phone": "+77152500666"},
        {"name": "Справочная служба автовокзала", "phone": "+77152330369"},
        {"name": "Справочная ж/д вокзала", "phone": "+77152383434"},
        {"name": "Справочная лекарственных средств", "phone": "138"},
        {"name": "Информационно-справочная служба, АО Казахтелеком", "phone": "118"},
        {"name": "Справочное кодов городов", "phone": "170"},
        {"name": "Справочно-информационная служба Импульс", "phone": "169"},
        {"name": "Справочная аэропорта", "phone": "+77152463142"},
        {"name": "Справочная служба по выдаче пенсии", "phone": "+77152551008"},
        {"name": "Справочная ЦОН", "phone": "1414"},
        {"name": "Областная больница", "phone": "+77152464716"},
        {"name": "1 Поликлиника", "phone": "+77152463636"},
        {"name": "2 Поликлиника", "phone": "+77152330360"},
        {"name": "3 Поликлиника", "phone": "+77152538291"},
        {"name": "4 Поликлиника", "phone": "+77152511930"},
        {"name": "Стоматология", "phone": "+77152465151"},
        {"name": "Кожно-венерологический диспансер", "phone": "+77152331530"},
        {"name": "Перинатальный центр", "phone": "+77152421897"},
        {"name": "Спид-центр", "phone": "+77152369171"},
        {"name": "Противотуберкулезный диспансер", "phone": "+77152538116"},
        {"name": "Онкологический диспансер", "phone": "+77152466008"},
        {"name": "Психоневрологический диспансер", "phone": "+77152524353"},
        {"name": "Областная больница для детей", "phone": "+77152468888"},
        {"name": "1 Детская поликлиника", "phone": "+77152464848"},
        {"name": "2 Детская поликлиника", "phone": "+77152509373"},
        {"name": "3 Детская поликлиника", "phone": "+77152538288"},
        {"name": "Стоматология для детей", "phone": "+77152467593"}
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
        <div className='content soska'>
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
        </div>
    );
};
