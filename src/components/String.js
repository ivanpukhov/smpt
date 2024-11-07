import React from 'react';
import {Link} from "react-router-dom";

const String = () => (
    <div className="string">
        <Link to="/" className="string__item">Главная </Link>
        <Link to="/events" className="string__item">Афиша </Link>
        <Link to="/adt" className="string__item">Объявления</Link>
        <Link to='/houses' className="string__item">Заведения</Link>
        <Link to='/sos' className="string__item">Экстренные службы</Link>
        <Link to='/spravka' className="string__item">Справочная</Link>
        <Link to='/forum' className="string__item">Отзывы и обсуждения</Link>
    </div>
);

export default String;
