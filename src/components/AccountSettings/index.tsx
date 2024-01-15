import React, {useEffect, useRef, useState} from 'react';
import styles from './AccountSettings.module.scss'
import {Alert, Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {patchAccount} from "../../createActions/userActions";
import {useAppDispatch, useAppSelector} from "../../hooks";

const AccountSettings = () => {
    const dispatch = useAppDispatch()
    const { user, errors } = useAppSelector(state => state.user)
    const [activeOrganization, setActiveOrganization] = useState(user.organization)
    const formRef = useRef<HTMLFormElement>(null)
    const [didMount, setDidMount] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleInputSelect = (e: SelectChangeEvent<string>) => {
        setActiveOrganization(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccess(false)
        const formData = new FormData(formRef.current!)
        dispatch(patchAccount(formData))
    }

    useEffect(() => {
        setDidMount(true)
        if (didMount) {
            setSuccess(true)
        }
    }, [user]);

    return (
        <div className={styles.container}>
            <form ref={formRef} onSubmit={e => handleSubmit(e)}>
                <h2>Настройки аккаунта</h2>
                {success && <Alert severity="success">Объявление успешно добавлено</Alert>}
                {errors && <Alert severity="error">{errors}</Alert>}
                <TextField name='name' required={true} label="Имя/Название" variant="standard" defaultValue={user.name}/>
                <TextField name='phone' required={true} label="Телефон" variant="standard" defaultValue={user.phone}/>
                <FormControl fullWidth variant='standard'>
                    <InputLabel id="category-select-label">Категория</InputLabel>
                    <Select name='organization'
                            labelId="category-select-label"
                            value={activeOrganization}
                            onChange={(e) => handleInputSelect(e)}
                    >
                            <MenuItem value={'Частное лицо'}>Частное лицо</MenuItem>
                            <MenuItem value={'Юридическое лицо'}>Юридическое лицо</MenuItem>
                    </Select>
                </FormControl>
                <Button type={'submit'} variant={"contained"}>Отправить</Button>
            </form>
        </div>
    );
};

export default AccountSettings;