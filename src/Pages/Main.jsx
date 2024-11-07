import React from 'react';
import { Sos } from "../components/Main/Sos/Sos";
import { Adt } from "../components/Main/Adt";
import { Afisha } from "../components/Main/Afisha/Afisha";
import { Forum } from "../components/Main/Forum";
import { House } from "../components/Main/House/House";
import { EmergencyModal } from "../components/Main/EmergencyModal";
import {Spravka} from "../components/Spravka";

function Main({ isModalVisible, setIsModalVisible }) {
    return (
        <div className="page">
            <div className="content">
                <Afisha />
                <Adt />
                <Sos />
                <Forum />
                <House />
                <Spravka />
            </div>
            <EmergencyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </div>
    );
}

export default Main;
