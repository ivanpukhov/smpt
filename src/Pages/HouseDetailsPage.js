import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Rate } from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDirectoryService, addDirectoryServiceReview } from "../api";
import { useParams } from "react-router-dom";
import "./HouseDetailsPage.scss";

const customIcon = new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

// JSON с адресами и координатами
const locations = [
    {
        address: "Северо-Казахстанская область, г. Петропавловск, ул. Брусиловского 20, 150000",
        coordinates: { latitude: 54.874219, longitude: 69.12678 }
    },
    {
        address: "г. Петропавловск, ул. М.Ауэзова, 130",
        coordinates: { latitude: 54.861344, longitude: 69.133714 }
    },
    {
        address: "г. Петропавловск, Улица Павла Васильева, 123",
        coordinates: { latitude: 54.867903, longitude: 69.156494 }
    },
    {
        address: "г. Петропавловск, Улица Жалела Кизатова, 7",
        coordinates: { latitude: 54.919425, longitude: 69.141194 }
    },
    {
        address: "г. Петропавловск, Улица Конституции Казахстана, 12",
        coordinates: { latitude: 54.871293, longitude: 69.126551 }
    },
    {
        address: "г. Петропавловск, Улица Ивана Шухова, 34",
        coordinates: { latitude: 54.902866, longitude: 69.150902 }
    },
    {
        address: "г. Петропавловск, Улица Интернациональная, 90а/1",
        coordinates: { latitude: 54.862703, longitude: 69.151972 }
    }
];

const HouseDetailsPage = () => {
    const { directoryServiceId } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDirectoryService(directoryServiceId);
            setServiceData(data);
            setReviews(data.reviews || []);
            setAverageRating(
                data.reviews.length > 0
                    ? data.reviews.reduce((acc, review) => acc + review.rating, 0) / data.reviews.length
                    : 0
            );

            // Удаляем "г." из адреса для корректного сопоставления
            const formattedLocation = data.location.replace(/^г\.\s*/, "").trim();

            console.log("Formatted Location:", formattedLocation);

            const location = locations.find(loc => loc.address.includes(formattedLocation));
            if (location) {
                setCoordinates(location.coordinates);
            } else {
                console.warn("No matching address found for:", formattedLocation);
            }
        };
        fetchData();
    }, [directoryServiceId]);

    const handleAddReview = async () => {
        if (newReview && newRating) {
            const newReviewData = { content: newReview, rating: newRating };
            const addedReview = await addDirectoryServiceReview(directoryServiceId, newReviewData);
            setReviews([...reviews, { ...addedReview, User: { firstName: "Вы", lastName: "" } }]);
            setNewReview("");
            setNewRating(0);
            setAverageRating(
                reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length + 1)
            );
        }
    };

    const handleFavoriteToggle = () => setFavorite(!favorite);

    const open2GISRoute = () => {
        if (coordinates) {
            window.open(`https://2gis.kz/route/points/${coordinates.latitude},${coordinates.longitude}`, '_blank');
        }
    };

    if (!serviceData || !coordinates) return <div>Loading...</div>;

    return (
        <div className="content">
            <div className="afishaPage">
                <div className="imgContainer"><img
                    src={
                        serviceData.image && serviceData.image.startsWith("http")
                            ? serviceData.image
                            : `http://localhost:3001/api${serviceData.image}`
                    }
                    alt="Poster"
                /> </div>
                <div className="contentContainer">
                    <h4>{serviceData.name}</h4>
                    <div className="eventInfo">
                        <div><strong>Часы работы:</strong> {serviceData.workingHours}</div>
                        <div><strong>Адрес:</strong> {serviceData.location}</div>
                        <a href={`tel:${serviceData.phone}`} className="phone"><strong>Телефон:</strong> {serviceData.phone}</a>
                    </div>
                    <div className="description">
                        {showFullDescription ? serviceData.description : `${serviceData.description.slice(0, 200)}...`}
                        <button onClick={() => setShowFullDescription(!showFullDescription)} className="readMore">
                            {showFullDescription ? "Свернуть" : "Читать далее"}
                        </button>
                    </div>
                    <div className="btnContainer">
                        <button className="button buy" onClick={open2GISRoute}>Построить маршрут в 2ГИС</button>
                        <button className="button" onClick={handleFavoriteToggle}>
                            {favorite ? "Убрать из избранного" : "Добавить в избранное"}
                        </button>
                        <button className="button" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                            Поделиться
                        </button>
                    </div>
                </div>
            </div>

            <div className="commentSection">
                <div className="review">
                    <h5>Отзывы</h5>
                    <div>Средняя оценка: {averageRating.toFixed(1)}</div>
                    <ul>
                        {reviews.map((item, index) => (
                            <li key={index} className="comment">
                                <div className="avatar">{item.User.firstName[0]}</div>
                                <div className="commentContent">
                                    <span className="author">{`${item.User.firstName} ${item.User.lastName}`}</span>
                                    <Rate className="ratingStars" disabled value={item.rating} />
                                    <p>{item.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="reviews">
                    <h5>Оставить отзыв</h5>
                    <Rate onChange={setNewRating} value={newRating} />
                    <textarea
                        rows="3"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Напишите ваш отзыв..."
                    />
                    <button onClick={handleAddReview} className="button">Отправить отзыв</button>
                </div>
            </div>

            <div className="mapContainer">
                <MapContainer center={[coordinates.latitude, coordinates.longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[coordinates.latitude, coordinates.longitude]} icon={customIcon}>
                        <Popup>{serviceData.location}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default HouseDetailsPage;
