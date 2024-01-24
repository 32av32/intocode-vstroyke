import React, { useEffect, useState } from 'react';
import styles from './Questions.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addQuestions, getQuestions } from '../../../createActions/questionsActions';
import { Input } from '@mui/material';

const Questions = () => {

    const dispatch = useAppDispatch()
    const [answer, setAnswer] = useState(false)
    const [text, setText] = useState('')
    const questions = useAppSelector(state => state.questions.questions)
    const {_id, title, user, images} = useAppSelector(state => state.ads.detailAd)
    const userAd = useAppSelector(state => state.user.user)


    console.log(questions);
    
    useEffect(() => {
        dispatch(getQuestions(_id))
    }, [])

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addQuestions({questionText: text, ad: _id}))
        setText('')
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
                        return <div className={styles.block}>
                             <div>
                                <img src="https://sherkaly-adm.ru/media/resized/WM9TDafsZ9SvnsMkzT-wtLG2umrXfl747xf_uHYjAe8/rs:fit:1024:768/aHR0cHM6Ly9zaGVy/a2FseS1hZG0ucnUv/bWVkaWEvcHJvamVj/dF9tb18xNDUvMmQv/YmYvYTYvZGMvZGUv/MWYvNnFwMWRjdjN6/NjQuanBlZw.jpg" alt="" />
                             </div>
                              <div className={styles.info}>
                                  <div className={styles.title}>
                                    <div className={styles.title}><h4>{title}</h4></div>
                                    <div className={styles.daty}>{item.createdDate.substring(0, 10)}</div>
                                 </div>
                                 <div className={styles.questionText}>{item.questionText}</div>
                                 <div className={styles.answer}>
                                    <div className={styles.user}>{item.user.name}</div>
                                    <div className={styles.resButton}>{user._id === userAd._id && <button onClick={() => setAnswer(!answer)}>Ответить</button>}</div>
                                 </div>
                            </div>                           
                        </div>
                    })}
                    {answer && <div className={styles.answerBlock}>
                                     <input type="text" placeholder='Напишите свой ответ'/>
                              </div>}
                </div>
            </div>
        </>
    );
};

export default Questions;