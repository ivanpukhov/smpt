import {Title} from "./Title";
import CalendarSlider from "./CalendarSlider";
import {AfishaItem} from "./afishaItem";
import {TopList} from "./TopList";

export const Afisha = () => {
    return (
        <div className="afisha">
            <Title />
            <TopList title="Афиша" btn='Еще 5'/>
            <CalendarSlider/>
            <div className="afisha__block">
                <AfishaItem/>
                <AfishaItem/>
                <AfishaItem/>
                <AfishaItem/>
                <AfishaItem/>
                <AfishaItem/>
            </div>
        </div>
    )
}
