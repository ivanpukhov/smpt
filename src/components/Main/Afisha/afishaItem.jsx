import poster from "../../images/poster.jpg";
import date from "../../images/date.svg";
import geo from "../../images/geo.svg";
import tenge from "../../images/Tenge.svg";

export const AfishaItem = () => {
    return (
        <div className="afisha__item">
            <div className="afisha__img">
                <img src={poster} alt=""/>
            </div>
            <div className="afisha__name">
                Nurbolat Abdullin Петропавл қаласында
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={date} alt=""/>
                </div>
                <div className="afisha__item--text">Вт. 12 ноя, 19:00</div>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={geo} alt=""/>
                </div>
                <div className="afisha__item--text">Достык молл</div>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={tenge} alt=""/>
                </div>
                <div className="afisha__item--text">от 6000 тг</div>
            </div>
        </div>
    )
}
