import {useState} from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import poster from "../images/poster.jpg";
import styles from "./AfishaPage.module.scss";

const customIcon = new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

export const AfishaItemPage = () => {
    const [comments, setComments] = useState([
        {author: "Айбек", content: "Очень жду это мероприятие!"},
        {author: "Алия", content: "В прошлый раз было супер, обязательно пойду!"},
    ]);
    const [newComment, setNewComment] = useState("");
    const [showFullDescription, setShowFullDescription] = useState(false);

    const eventDetails = {
        title: "Концерт Нурболата Абдуллина",
        location: "Достык молл, Петропавловск",
        startDate: "Вт. 12 ноя, 19:00",
        description:
            "Концерт известного казахстанского певца Нурболата Абдуллина. Концерт включает множество известных песен и обещает незабываемую атмосферу. Все зрители смогут насладиться выступлением в живую и провести приятный вечер. Потрясающая музыка и незабываемые эмоции! Все зрители смогут насладиться выступлением в живую и провести приятный вечер. Потрясающая музыка и незабываемые эмоции",
    };

    const addGoogleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=20241112T190000/20241112T210000&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`;

    const addAppleCalendar = () => {
        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DTSTART;TZID=Asia/Almaty:20241112T190000
DTEND;TZID=Asia/Almaty:20241112T210000
LOCATION:${eventDetails.location}
DESCRIPTION:${eventDetails.description}
END:VEVENT
END:VCALENDAR
    `;

        const blob = new Blob([icsContent], {type: "text/calendar;charset=utf-8"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "event.ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleAddComment = () => {
        if (newComment) {
            setComments([...comments, {author: "Вы", content: newComment}]);
            setNewComment("");
        }
    };

    return (
        <div className="content">
            <div className={styles.afishaPage}>
                <div className={styles.imgContainer}>
                    <img src={poster} alt="Poster"/>
                </div>
                <div className={styles.contentContainer}>
                    <h4>{eventDetails.title}</h4>
                    <div className={styles.eventInfo}>
                        <div className={styles.date}>
                            <strong>Дата:</strong> {eventDetails.startDate}
                        </div>
                        <div className={styles.location}>
                            <strong>Место:</strong> {eventDetails.location}
                        </div>
                    </div>
                    <div className={`${styles.description} ${!showFullDescription ? styles.collapsed : ""}`}>
                        {showFullDescription ? eventDetails.description : `${eventDetails.description.slice(0, 300)}...`}
                        <span
                            className={styles.readMore}
                            onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                            {showFullDescription ? "Скрыть" : "Читать далее"}
                        </span>
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={`${styles.button} ${styles.buy}`}>Купить билет</button>
                        <button
                            className={`${styles.button} ${styles.google}`}
                            onClick={() => window.open(addGoogleCalendarLink, "_blank")}
                        >
                            Добавить в Google Календарь
                        </button>
                        <button className={`${styles.button} ${styles.apple}`} onClick={addAppleCalendar}>
                            Добавить в Apple Календарь
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.commentSection}>
                <h5>Комментарии</h5>
                {comments.map((item, index) => (
                    <div key={index} className={styles.comment}>
                        <div className={styles.avatar}>{item.author[0]}</div>
                        <div className={styles.commentContent}>
                            <span className={styles.author}>{item.author}</span>
                            {item.content}
                        </div>
                    </div>
                ))}
                <textarea
                    rows="2"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Написать комментарий"
                />
                <button onClick={handleAddComment}>Отправить</button>
            </div>

            <div className={styles.mapContainer}>
                <MapContainer center={[54.8661, 69.1505]} zoom={13} style={{height: "250px", width: "100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[54.8661, 69.1505]} icon={customIcon}/>
                </MapContainer>
            </div>
        </div>
    );
};
