import React from 'react';
import styles from './TextCard.module.scss'
import CloseIcon from '@mui/icons-material/Close';

const TextCard = ({ text }: { text: string }) => {
    return (
        <div className={styles.container}>
            <p>{text}</p>
            <div className={styles.icon}><CloseIcon fontSize='small' /></div>
        </div>
    );
};

export default TextCard;