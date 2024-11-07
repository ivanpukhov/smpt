import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import poster from "../images/poster.jpg";
import styles from "./AfishaPage.module.scss";
import api from "../api";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, QrCode, Star, StarBorder } from "@mui/icons-material";
import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router-dom";

const customIcon = new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

// Объект с координатами для известных локаций
const locationCoordinates = {
    "Областная филармония г. Петропавловск": [54.86826, 69.1619],
    "Театр кукол г. Петропавловск": [54.861657, 69.144262],
    "Royal Palace": [54.892135, 69.145357],
    "ГДК г. Петропавловск": [54.85851, 69.17303]
};

export const AfishaItemPage = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const qrRef = useRef();

    const { eventId } = useParams();

    const addGoogleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails?.title || '')}&dates=20241112T190000/20241112T210000&location=${encodeURIComponent(eventDetails?.location || '')}&details=${encodeURIComponent(eventDetails?.description || '')}`;

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const [eventResponse] = await Promise.all([
                    api.get(`/events/${eventId}`),
                ]);
                setEventDetails(eventResponse.data);

                const token = localStorage.getItem("token");
                if (token) {
                    const profileResponse = await api.get("/user/profile");
                    setUserProfile(profileResponse.data);
                    setIsLiked(localStorage.getItem(`event-${eventId}-liked`) === "true");
                    setIsFavorite(localStorage.getItem(`event-${eventId}-favorite`) === "true");
                }
            } catch (error) {
                console.error("Ошибка при загрузке данных мероприятия или профиля:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [eventId]);

    const addPoints = (pointsToAdd) => {
        let currentPoints = parseInt(localStorage.getItem("points")) || 0;
        currentPoints += pointsToAdd;
        localStorage.setItem("points", currentPoints);
        alert(currentPoints);
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await api.post(`/events/${eventId}/comment`, { content: newComment });
            const { content, createdAt } = response.data;
            addPoints(100);
            setEventDetails((prev) => ({
                ...prev,
                comments: [
                    ...prev.comments,
                    {
                        content,
                        createdAt,
                        author: {
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                        },
                    },
                ],
            }));
            setNewComment("");
        } catch (error) {
            console.error("Ошибка при добавлении комментария:", error);
        }
    };

    const addAppleCalendar = () => {
        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventDetails?.title}
DTSTART;TZID=Asia/Almaty:20241112T190000
DTEND;TZID=Asia/Almaty:20241112T210000
LOCATION:${eventDetails?.location}
DESCRIPTION:${eventDetails?.description}
END:VEVENT
END:VCALENDAR
        `;

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "event.ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    if (loading) return <CircularProgress />;
    if (!eventDetails) return <div>Мероприятие не найдено.</div>;

    const locationCoords = locationCoordinates[eventDetails.location] || [54.8661, 69.1505];
    const handleLike = async () => {
        if (!isLiked) {
            try {
                await api.post(`/events/${eventId}/like`);
                setEventDetails(prev => ({ ...prev, likes: prev.likes + 1 }));
                setIsLiked(true);
                localStorage.setItem(`event-${eventId}-liked`, 'true');
            } catch (error) {
                console.error("Ошибка при добавлении лайка:", error);
            }
        }
    };

    const handleFavorite = async () => {
        try {
            if (!isFavorite) {
                await api.post(`/events/${eventId}/favorite`);
                setIsFavorite(true);
                localStorage.setItem(`event-${eventId}-favorite`, 'true');
            } else {
                await api.post(`/events/${eventId}/unfavorite`);
                setIsFavorite(false);
                localStorage.setItem(`event-${eventId}-favorite`, 'false');
            }
        } catch (error) {
            console.error("Ошибка добавления в избранное:", error);
        }
    };

    return (
        <div className="content">
            <div className={styles.afishaPage}>
                <div className={styles.imgContainer}>
                    <img
                        src={
                            eventDetails.image && eventDetails.image.startsWith("http")
                                ? eventDetails.image
                                : `https://smpt.kz/api/${eventDetails.image || poster}`
                        }
                        alt="Poster"
                    />
                </div>
                <div className={styles.contentContainer}>
                    <h4>{eventDetails.title}</h4>
                    <div className={styles.eventInfo}>
                        <div className={styles.date}>
                            <strong>Дата:</strong> {eventDetails.startDate ? new Date(eventDetails.startDate).toLocaleDateString() : "Не указана"}
                        </div>
                        <div className={styles.location}>
                            <strong>Место:</strong> {eventDetails.location}
                        </div>
                    </div>
                    <div className={`${styles.description} ${!showFullDescription ? styles.collapsed : ""}`}>
                        {showFullDescription ? eventDetails.description : `${eventDetails.description.slice(0, 300)}...`}
                        <span className={styles.readMore} onClick={() => setShowFullDescription(!showFullDescription)}>
                            {showFullDescription ? "Скрыть" : "Читать далее"}
                        </span>
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={`${styles.button} ${styles.buy}`}>Купить билет</button>
                        <button className={`${styles.button} ${styles.google}`} onClick={() => window.open(addGoogleCalendarLink, "_blank")}>
                            Добавить в Google Календарь
                        </button>
                        <button className={`${styles.button} ${styles.apple}`} onClick={addAppleCalendar}>
                            Добавить в Apple Календарь
                        </button>
                        <Button variant="outlined" startIcon={<QrCode />} onClick={() => setQrOpen(true)}>
                            QR-код
                        </Button>
                        <IconButton onClick={handleLike} disabled={isLiked}>
                            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />} {eventDetails.likes}
                        </IconButton>
                        <IconButton onClick={handleFavorite}>
                            {isFavorite ? <Star color="primary" /> : <StarBorder />} В избранное
                        </IconButton>

                    </div>

                </div>
            </div>

            <div className={styles.commentSection}>
                <h5>Комментарии</h5>
                {eventDetails.comments.map((comment, index) => (
                    <div key={index} className={styles.comment}>
                        <Avatar>
                            {comment.author ? comment.author.firstName[0] : "?"}
                            {comment.author ? comment.author.lastName[0] : ""}
                        </Avatar>
                        <div className={styles.commentContent}>
                            <span className={styles.author}>
                                {comment.author ? `${comment.author.firstName} ${comment.author.lastName}` : "Anonymous"}
                            </span>
                            {comment.content}
                        </div>
                    </div>
                ))}
                <textarea placeholder="Написать комментарий..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                    Отправить
                </button>
            </div>

            <div className={styles.mapContainer}>
                <MapContainer center={locationCoords} zoom={15} style={{ height: "250px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={locationCoords} icon={customIcon} />
                </MapContainer>
            </div>

            <Dialog open={qrOpen} onClose={() => setQrOpen(false)}>
                <DialogTitle>QR-код для добавления в избранное</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 3 }} ref={qrRef}>
                    <QRCodeCanvas value={`${window.location.origin}/events/${eventId}?addToFavorite=true`} size={200} />
                    <Button onClick={() => setQrOpen(false)} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Закрыть
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};
