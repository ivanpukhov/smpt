import { useState, useEffect } from 'react';

export const Title = () => {
    const [text, setText] = useState("SMPT");
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // Показ "SMPT" в течение 2 секунд
        const smptTimeout = setTimeout(() => {
            setPhase(1);
        }, 2000);

        return () => clearTimeout(smptTimeout);
    }, []);

    useEffect(() => {
        if (phase === 1) {
            const sm = "Smart";
            const pt = "Petropavl";
            let smIndex = 0;
            let ptIndex = 0;

            const interval = setInterval(() => {
                setText(
                    `${sm.slice(0, smIndex + 1)} ${pt.slice(0, ptIndex + 1)}`
                );
                smIndex++;
                ptIndex++;

                if (smIndex === sm.length && ptIndex === pt.length) {
                    clearInterval(interval);
                }
            }, 10); // скорость печати каждой буквы

            return () => clearInterval(interval);
        }
    }, [phase]);

    return (
        <h1 className="afisha__title">
            {text}
        </h1>
    );
};
