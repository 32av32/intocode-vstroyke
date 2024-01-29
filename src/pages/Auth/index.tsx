import React, {useEffect, useState} from 'react';
import styles from './Auth.module.scss'
import {Button, TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import {AuthEnum} from "../../types/enums";
import {postLogin, postSignup} from "../../createActions/authActions";
import { useAppSelector, useAppDispatch} from "../../hooks";
import {useNavigate} from "react-router-dom";

interface IProps {
    variant: AuthEnum
}

const Auth = ({ variant }: IProps) => {
    const {status,  errors} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState({name: '', email: '', password: ''})
    const navigate = useNavigate()

    const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue({...inputValue,
            [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        switch (variant) {
            case AuthEnum.Signup: {
                dispatch(postSignup(inputValue))
                break
            }
            case AuthEnum.Login: {
                dispatch(postLogin({email: inputValue.email, password: inputValue.password}))
                break
            }
        }
    }

    useEffect(() => {
        if (status === 200) {
            navigate('/auth/login')
        }
    }, [status])

    // useEffect(() => {
    //     if (user) {
    //         navigate(`/account/${user}`)
    //     }
    // }, [user])

    return (
        <div className={styles.container}>
            <h2>{variant}</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl error={!!errors}>
                    {
                        variant === AuthEnum.Signup && <TextField
                            required
                            name='name'
                            label="Имя/Название"
                            value={inputValue.name}
                            onChange={e => handleInputChange(e)}
                        />
                    }
                    <TextField
                        required
                        name='email'
                        label="Логин"
                        value={inputValue.email}
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        required
                        name='password'
                        label="Password"
                        type='password'
                        value={inputValue.password}
                        onChange={e => handleInputChange(e)}
                    />
                    <Button type='submit' variant='contained'>Отправить</Button>
                    <FormHelperText>{errors}</FormHelperText>
                </FormControl>
            </form>
        </div>
    );
};

export default Auth;