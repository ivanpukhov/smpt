import con from "../../images/con.webp";
import date from "../../images/date.svg";
import geo from "../../images/geo.svg";

export const HouseItem = () => {
    return (
        <div className="house__item">
            <div className="house__img">
                <img src={con} alt=""/>
            </div>
            <div className="afisha__name">
                Nurbolat Abdullin Петропавл қаласында
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={date} alt=""/>
                </div>
                <div className="afisha__item--text">08:00-20:00</div>
            </div>
            <div className="afisha__item--small">
                <div className="afisha__item--svg">
                    <img src={geo} alt=""/>
                </div>
                <div className="afisha__item--text">Достык молл</div>
            </div>

        </div>
    )
}
