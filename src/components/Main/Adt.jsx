import {TopList} from "./TopList";

export const Adt = () => {
    return (
        <>
            <TopList title="Объявления" btn='Еще 5'/>

            <div className="adt">
                <div className="adt__item">В городе отключили воду</div>
                <div className="adt__item">Итоги хакатона в университете</div>
                <div className="adt__item">Закрыта трасса Астана-Омск</div>
                <div className="adt__item">В городе сильный гололёд</div>
                <div className="adt__item">Авария на теплотрассе</div>
            </div>
        </>
    )
}
