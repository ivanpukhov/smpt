import React from 'react';
import logo from '../images/logo.png';
import search from '../images/search.svg';
import profile from '../images/profile.svg';
import phone from '../images/phone.svg';
import { Link } from "react-router-dom";
import { EmergencyModal } from "../components/Main/EmergencyModal";

const Header = ({ isModalVisible, setIsModalVisible }) => (
    <div className="container">
        <header className="header">
            <Link to={'/'} className="header__logo">
                <img src={logo} alt="Logo" />
            </Link>
            <div className="header__right">
                <div className="header__search header__btn">
                    <img src={search} alt="Search" />
                    <input
                        type="text"
                        className="header__search--input"
                        placeholder="Найти на сайте"
                    />
                </div>
                <Link to={'/auth'} className="header__profile header__btn">
                    <img src={profile} alt="Profile" />
                    <div className="header__profile--btn header__pc">Личный кабинет</div>
                </Link>
                <div className="header__phone header__btn" onClick={() => setIsModalVisible(true)}>
                    <img src={phone} alt="Phone" />
                    <div className="header__phone__btn header__pc">Экстренные службы</div>
                </div>
            </div>
        </header>
        <EmergencyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
);

export default Header;
