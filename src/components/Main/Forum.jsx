import {TopList} from "./TopList";

export const Forum = () => {
    return (
        <>
            <TopList title="Обсуждения" btn='Еще 5'/>
            <div className="forum">
                <div className="forum__item">Где найти хорошего стамотолога?</div>
                <div className="forum__item">Где найти хорошего стамотолога?</div>
                <div className="forum__item">Где найти хорошего стамотолога?</div>
                <div className="forum__item">Где найти хорошего стамотолога?</div>
                <div className="forum__item">Где найти хорошего стамотолога?</div>
                <div className="forum__item">Где найти хорошего стамотолога?</div>
            </div>
        </>
    )
}
