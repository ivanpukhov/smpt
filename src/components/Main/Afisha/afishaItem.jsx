import { Link } from "react-router-dom";
import dateIcon from "../../../images/date.svg";
import geoIcon from "../../../images/geo.svg";
import tengeIcon from "../../../images/Tenge.svg";

export const AfishaItem = ({ afisha }) => {
    return (
        <Link to={`/afisha/${afisha.id}`} className="afisha__item">
            <div className="afisha__img">
                <img
                    src={
                        afisha.image && afisha.image.startsWith("http")
                            ? afisha.image
                            : `http://localhost:3001/api/${afisha.image}`
                    }
                    alt="Poster"
                />            </div>
            <div className="afisha__name">
                {afisha.title}
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={dateIcon} alt="Дата" />
                </div>
                <div className="afisha__item--text">
                    {afisha.startDate ? new Date(afisha.startDate).toLocaleString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Дата не указана'}
                </div>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={geoIcon} alt="Локация" />
                </div>
                <div className="afisha__item--text">{afisha.location || 'Локация не указана'}</div>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={tengeIcon} alt="Цена" />
                </div>
                <div className="afisha__item--text">от {afisha.price ? `${afisha.price} тг` : 'Бесплатно'}</div>
            </div>
        </Link>
    );
};
