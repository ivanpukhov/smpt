import { useEffect, useState } from "react";
import { TopList } from "../TopList";
import { HouseItem } from "./HouseItem";
import { Link } from "react-router-dom";
import api from "../../../api"; // Импортируем конфигурацию API

export const House = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        // Запрос данных с сервера
        const fetchHouses = async () => {
            try {
                const response = await api.get('/directory'); // Замените на ваш путь
                const filteredHouses = response.data.filter(house => !house.name.toLowerCase().includes("service")); // Фильтруем заведения

                setHouses(filteredHouses); // Устанавливаем данные в состояние

            } catch (error) {
                console.error("Ошибка при загрузке данных городских служб:", error);
            }
        };

        fetchHouses();
    }, []);

    return (
        <div className='soska'>
            <TopList title="Городские службы" btn='Еще 5'/>
            <div className="house">
                {houses.slice(0, 4).map((house) => (
                    <HouseItem
                        key={house.id}
                        id={house.id}
                        title={house.name}
                        phone={house.phone}
                        location={house.location}
                        date="Вт. 12 ноя, 19:00" // Динамическое значение, если нужно
                        image={house.image}
                    />
                ))}
            </div>
            <Link to='/houses' className="seeAll">Показать еще</Link>
        </div>
    );
};
