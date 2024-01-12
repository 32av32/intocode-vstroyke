import React, {useState} from 'react';
import styles from './Reviews.module.scss'
import Review from "./Review";
import {Tab, Tabs} from "@mui/material";

const Reviews = () => {
    const [activeTab, setActiveTab] = useState(0)

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <div className={styles.container} id={'reviews'}>
            <Tabs value={activeTab} onChange={handleChange}>
                <Tab sx={{fontSize: '1.1rem'}} label="Reviews"  />
                <Tab sx={{fontSize: '1.1rem'}} label="Question" />
            </Tabs>
            { activeTab === 0 && <Review /> }
        </div>
    );
};

export default Reviews;