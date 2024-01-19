import React, { useEffect, useState } from 'react';
import styles from './Questions.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addQuestions, getQuestions } from '../../../createActions/questionsActions';




const Questions = () => {

    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const questions = useAppSelector(state => state.questions.questions)
    const {_id, title, images} = useAppSelector(state => state.ads.detailAd)

    useEffect(() => {
        dispatch(getQuestions(_id))
    }, [])

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addQuestions(text))
    }


    return (
        <>
            <div className={styles.questions}>
                <div className={styles.questionCard}>
                    <h3>Задайте вопрос о товаре</h3>
                    <p>Вам ответит продавец, представитель бренда или пользователь, купивший этот товар. Пришлем уведомление, когда поступит ответ</p>
                    <form onSubmit={(e) => handleAdd(e)}>
                        <div className={styles.input_text}>
                            <input
                                type="text"
                                placeholder='Напишите свой вопрос'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <hr />
                <div className={styles.thisQuestion}>
                    {questions.map((item) => {
                        return <div>
                            <div className={styles.displey}>
                                <div className={styles.title}><h4>{title}</h4></div>
                                <div className={styles.daty}>{item.createdDate}</div>
                            </div>
                            <div className={styles.questionText}>{item.questionText}</div>
                            <div className={styles.user}>{item.user.name}</div>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
};

export default Questions;