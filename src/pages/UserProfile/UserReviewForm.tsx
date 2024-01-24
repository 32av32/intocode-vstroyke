import React from 'react';
import {BoxModalStyle} from "../../utils/mui";
import {Box, Button, Rating, TextField} from "@mui/material";
import styles from "./UserProfile.module.scss";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

const UserReviewForm = () => {
    const [ratingValue, setRatingValue] = React.useState<number | null>(1);
    const [inputText, setInputText] = React.useState<string>('');

    return (
        <Box sx={{...BoxModalStyle, p: 3}}>
            <form>
                <div className={styles.formRating}>
                    <span>Оценка: </span>
                    <Rating
                        name="rating" value={ratingValue} onChange={(e, newValue) => setRatingValue(newValue)}
                        icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                        emptyIcon={<StarRateRoundedIcon fontSize='inherit'/>}
                    />
                </div>
                <TextField name='text'
                           value={inputText}
                           required
                           label="Текст"
                           multiline
                           maxRows={4}
                           onChange={e => setInputText(e.target.value)}/>
                <Button type={'submit'} color={'success'}>Отправить</Button>
            </form>
        </Box>
    );
};

export default UserReviewForm;