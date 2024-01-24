import React, {useState} from 'react';
import styles from './Feedback.module.scss'
import Reviews from "./Reviews";
import {Tab, Tabs} from "@mui/material";
import Questions from './Questions';

const Feedback = () => {
    const [activeTab, setActiveTab] = useState(0)

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <div className={styles.container} id={'reviews'}>
            <Tabs value={activeTab} onChange={handleChange}>
                <Tab sx={{fontSize: '1.1rem'}} label="Отзывы"  />
                <Tab sx={{fontSize: '1.1rem'}} label="Вопросы" />
            </Tabs>
            { activeTab === 0 && <Reviews /> }
            { activeTab === 1 && <Questions/>}
        </div>
    );
};

export default Feedback;