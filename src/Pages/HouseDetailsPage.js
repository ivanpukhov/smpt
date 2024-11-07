import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Rate } from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import con from "../images/con.webp";
import "./HouseDetailsPage.scss";

const data = {
    phone: "+77777777777",
    coordinates: { latitude: 54.8661, longitude: 69.1505 },
    eventTitle: "Областной центр обслуживания населения",
    workingHours: "08:00-20:00",
    address: "Достык молл",
    description:
        "Описание заведения. Отличное место для посещения с удобным графиком и удобным расположением. Описание заведения. Отличное место для посещенияудобным графиком и удобным расположением...",
    reviews: [
        { author: "Айбек", rating: 5, content: "Отличное место!" },
        { author: "Алия", rating: 4, content: "Хорошо, но можно улучшить сервис." }
    ]
};

const customIcon = new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

const HouseDetailsPage = () => {
    const [reviews, setReviews] = useState(data.reviews || []);
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [averageRating, setAverageRating] = useState(
        reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
            : 0
    );
    const [favorite, setFavorite] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleAddReview = () => {
        if (newReview && newRating) {
            const updatedReviews = [...reviews, { author: "Вы", rating: newRating, content: newReview }];
            setReviews(updatedReviews);
            setNewReview("");
            setNewRating(0);
            setAverageRating(updatedReviews.reduce((acc, review) => acc + review.rating, 0) / updatedReviews.length);
        }
    };

    const handleFavoriteToggle = () => setFavorite(!favorite);

    return (
        <div className="content">
            <div className="afishaPage">
                <div className="imgContainer"><img src={con} alt="Poster" /></div>
                <div className="contentContainer">
                    <h4>{data.eventTitle}</h4>
                    <div className="eventInfo">
                        <div><strong>Часы работы:</strong> {data.workingHours}</div>
                        <div><strong>Адрес:</strong> {data.address}</div>
                        <a href={`tel:${data.phone}`} className="phone"><strong>Телефон:</strong> {data.phone}</a>
                    </div>
                    <div className="description">
                        {showFullDescription ? data.description : `${data.description.slice(0, 200)}...`}
                        <button onClick={() => setShowFullDescription(!showFullDescription)} className="readMore">
                            {showFullDescription ? "Свернуть" : "Читать далее"}
                        </button>
                    </div>
                    <div className="btnContainer">
                        <button className="button buy">Построить маршрут в 2ГИС</button>
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
                                <div className="avatar">{item.author[0]}</div>
                                <div className="commentContent">
                                    <span className="author">{item.author}</span>
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
                <MapContainer center={[data.coordinates.latitude, data.coordinates.longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[data.coordinates.latitude, data.coordinates.longitude]} icon={customIcon}>
                        <Popup>{data.address}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default HouseDetailsPage;
