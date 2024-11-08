// src/components/Main/Afisha/CalendarSlider/CalendarSlider.js
import React, { useState, useEffect, useRef } from 'react';
import './CalendarSlider.css';
import back from "../../../../images/back.svg";
import next from "../../../../images/next.svg";

const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const CalendarSlider = ({ selectedDate, onDateChange }) => {
    const [dates, setDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('');
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const today = new Date();
        const end = new Date();
        end.setMonth(today.getMonth() + 2);

        const tempDates = [];
        while (today <= end) {
            tempDates.push(new Date(today));
            today.setDate(today.getDate() + 1);
        }

        setDates(tempDates);
        setCurrentMonth(monthNames[tempDates[0].getMonth()]);
    }, []);

    const handleScroll = () => {
        const scrollLeft = scrollRef.current.scrollLeft;
        const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < maxScrollLeft);

        const dateBoxWidth = scrollRef.current.firstChild.clientWidth;
        const firstVisibleDateIndex = Math.floor(scrollLeft / dateBoxWidth);
        const firstVisibleDate = dates[firstVisibleDateIndex];

        if (firstVisibleDate) {
            setCurrentMonth(monthNames[firstVisibleDate.getMonth()]);
        }
    };

    const scrollLeft = () => {
        scrollRef.current.scrollLeft -= 200;
    };

    const scrollRight = () => {
        scrollRef.current.scrollLeft += 200;
    };

    const handleDateClick = (date) => {
        onDateChange(date); // Устанавливаем выбранную дату
    };

    return (
        <div className="calendar-slider">
            <div className="calendar-header">{currentMonth}</div>
            {showLeftButton && (
                <div className="scroll-button left">
                    <button onClick={scrollLeft}>
                        <img src={back} alt=""/>
                    </button>
                </div>
            )}
            <div className="dates-container" onScroll={handleScroll} ref={scrollRef}>
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className={`date-box ${selectedDate?.getTime() === date.getTime() ? 'selected' : ''}`}
                        onClick={() => handleDateClick(date)}
                    >
                        <div className="date">{date.getDate()}</div>
                        <div className="day">{daysOfWeek[date.getDay()]}</div>
                    </div>
                ))}
            </div>
            {showRightButton && (
                <div className="scroll-button right">
                    <button onClick={scrollRight}>
                        <img src={next} alt=""/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CalendarSlider;
