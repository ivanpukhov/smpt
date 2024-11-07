import {TopList} from "./TopList";
import {HouseItem} from "./HouseItem";

export const House = () => {
    return (
        <>
            <TopList title="Городские службы" btn='Еще 5'/>
            <div className="house">
                <HouseItem />
                <HouseItem />
                <HouseItem />
                <HouseItem />
            </div>
        </>
    )
}
