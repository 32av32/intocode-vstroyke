import React from 'react';
import styles from './Questions.module.scss'

const Questions = () => {
    return (
        <>
            <div className={styles.questionCard}>
                <div>
                    Карточка вопроса
                </div>
                <div>
                    Карточка ответа
                </div>
            </div>
        </>

    );
};

export default Questions;