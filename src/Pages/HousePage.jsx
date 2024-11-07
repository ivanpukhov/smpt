import { useEffect, useState } from "react";
import api from "../api";
import { TopList } from "../components/Main/TopList";
import { HouseItem } from "../components/Main/House/HouseItem";

export const HousePage = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await api.get('/directory');
                const filteredHouses = response.data.filter(house => !house.name.toLowerCase().includes("service")); // Фильтруем заведения
                setHouses(filteredHouses);
            } catch (error) {
                console.error("Ошибка при загрузке городских служб:", error);
            }
        };
        fetchHouses();
    }, []);

    return (
        <div className='content soska'>
            <TopList title="Городские службы" btn='Еще 5'/>
            <div className="house">
                {houses.map((house) => (
                    <HouseItem
                        key={house.id}
                        id={house.id}
                        title={house.name}
                        phone={house.phone}
                        location={house.location}
                        date="Вт. 12 ноя, 19:00"
                        image={house.image}
                    />
                ))}
            </div>
        </div>
    );
};
