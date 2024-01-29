import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { patchQuestion } from "../../../createActions/questionsActions";
import styles from "./Answer.module.scss";
import { IQuestions } from "../../../types/questionsTypes";
import { IAdsUser } from "../../../types/adsTypes";

const Answer = ({
  item,
  title,
  user,
  images,
}: {
  item: IQuestions;
  title: string;
  user: IAdsUser;
  images: string[];
}) => {
  const dispatch = useAppDispatch();
  const [answer, setAnswer] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const userAd = useAppSelector((state) => state.user.user);

  const handleAnswer = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    dispatch(patchQuestion({ answer: answerText, id }));
    setAnswer(!answer);
    setAnswerText("");
  };

  return (
    <div className={styles.block}>
      <div className={styles.displey}>
        <div>
          <img
            src="https://sherkaly-adm.ru/media/resized/WM9TDafsZ9SvnsMkzT-wtLG2umrXfl747xf_uHYjAe8/rs:fit:1024:768/aHR0cHM6Ly9zaGVy/a2FseS1hZG0ucnUv/bWVkaWEvcHJvamVj/dF9tb18xNDUvMmQv/YmYvYTYvZGMvZGUv/MWYvNnFwMWRjdjN6/NjQuanBlZw.jpg"
            alt=""
          />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <div>
              <h4>{title}</h4>
            </div>
            <div className={styles.daty}>
              {item.createdDate.substring(0, 10)}
            </div>
          </div>
          <div className={styles.questionText}>{item.questionText}</div>
          <div className={styles.answer}>
            <div className={styles.user}>{item.user.name}</div>
            <div className={styles.resButton}>
              {user._id === userAd._id && (
                <button onClick={() => setAnswer(!answer)}>Ответить</button>
              )}
            </div>
          </div>
        </div>
      </div>
      {answer && (
        <div className={styles.answerBlock}>
          <form onSubmit={(e) => handleAnswer(e, item._id)}>
            <input
              type="text"
              placeholder="Напишите свой ответ"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            />
          </form>
        </div>
      )}
      {item.answer && (
        <div className={styles.answerText}>
          <h6>Ответ на ваш вопрос:</h6>
          <div>{item.answer}</div>
        </div>
      )}
    </div>
  );
};

export default Answer;
