import React, { useEffect, useState } from "react";
import styles from "./Questions.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addQuestion, getQuestions,} from "../../../createActions/questionsActions";
import Answer from "./Answer";

const Questions = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const questions = useAppSelector((state) => state.questions.questions);
  const { _id, title, user, images } = useAppSelector((state) => state.ads.detailAd);

  useEffect(() => {
    dispatch(getQuestions(_id));
  }, []);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addQuestion({ questionText: text, ad: _id }));
    setText("");
  };

  return (
    <>
      <div className={styles.questions}>
        <div className={styles.questionCard}>
          <h3>Задайте вопрос о товаре</h3>
          <p>
            Вам ответит продавец, представитель бренда или пользователь,
            купивший этот товар. Пришлем уведомление, когда поступит ответ
          </p>
          <form onSubmit={(e) => handleAdd(e)}>
            <div className={styles.input_text}>
              <input
                type="text"
                placeholder="Напишите свой вопрос"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </form>
        </div>
        <hr />
      </div>
          {questions.map((item) => {
            return (<Answer item={item} title={title} user={user} images={images}/>);
          })}
    </>
  );
};

export default Questions;


