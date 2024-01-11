import React from 'react';
import styles from './Comments.module.scss'

const Comments = () => {
    return (
        <div className={styles.container}>
            <form>
                <textarea></textarea>
                <button type='submit'>Send</button>
            </form>
            <div className={styles.comments}>
                <div className={styles.commentItem}>
                    <h4>Name</h4>
                    <p>Comment</p>
                </div>
            </div>
        </div>
    );
};

export default Comments;