import { Typography } from "antd";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import dateIcon from "../../../images/date.svg";
import geoIcon from "../../../images/geo.svg";

const { Title } = Typography;

export const HouseItem = ({ id, title, phone, location, date, image }) => {
    return (
        <Link to={`/house/${id}`} className="house__item" style={{ cursor: "pointer" }}>
            <div className="house__img">
                <img
                    src={
                        image && image.startsWith("http")
                            ? image
                            : `https://smpt.kz/api${image}`
                    }
                    alt="Poster"
                />            </div>
            <div className="afisha__name">
                <Title level={5}>{title}</Title>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--text">{phone}</div>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={dateIcon} alt=""/>
                </div>
                <div className="afisha__item--text">{date}</div>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={geoIcon} alt=""/>
                </div>
                <div className="afisha__item--text">{location}</div>
            </div>
        </Link>
    );
};
