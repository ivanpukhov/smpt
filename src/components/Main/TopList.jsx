import { useEffect, useState } from "react";

export const TopList = ({ title, btn }) => {
    const [btnValue, setBtnValue] = useState();

    useEffect(() => {
        setBtnValue(btn);
    }, [btn]);

    return (
        <div className="toplist">
            <div className="toplist__title">
                <div className="line"></div>
                <h3>{title}</h3>
                {btnValue && <div className="toplist__btn">{btnValue}</div>}
                <div className="line"></div>
            </div>
        </div>
    );
};
