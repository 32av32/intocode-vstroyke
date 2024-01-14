import React, {useEffect, useRef, useState} from 'react';
import styles from './AddAd.module.scss'
import {Alert, Button, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from "@mui/material/FormControl";
import TextCard from "../../components/TextCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {patchAd, postAd} from "../../createActions/adsActions";

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface IProps {
    variant?: string
    _id?: string
    title?: string
    description?: string
    address?: string
    price?: number
    category?: string
    unit?: string
}

const AddAd = ({variant='', _id='', title='', description='', address='', price=0, category='', unit='шт.'}: IProps) => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.common.categories)
    const {ads, errors} = useAppSelector(state => state.ads)
    const [activeCategory, setActiveCategory] = useState({
        category,
        unit
    })
    const [inputValues, setInputValues] = useState({
        title,
        description,
        address,
        price,
    })
    const [filesList, setFilesList] = useState<FileList | null>(null)
    const [didMount, setDidMount] = useState(false)
    const [success, setSuccess] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value})
    }

    const handleInputSelect = (e: SelectChangeEvent<string>) => {
        setActiveCategory({...activeCategory, [e.target.name]: e.target.value})
    }

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilesList(e.target.files)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(formRef.current!)
        const data = {...activeCategory, ...inputValues}
        if (variant) {
            dispatch(patchAd({_id, data}))
        } else {
            dispatch(postAd(form))
        }
    }

    useEffect(() => {
        setDidMount(true)
        if (didMount) {
            setSuccess(true)
        }
    }, [ads]);

    return (
        <div className={styles.container}>
            <form ref={formRef} onSubmit={e => handleSubmit(e)}>
                {success && <Alert severity="success">Объявление успешно добавлено</Alert>}
                {errors && <Alert severity="error">{errors}</Alert>}
                <TextField name='title'
                           value={inputValues.title}
                           required
                           label="Название"
                           onChange={e => handleInputChange(e)}/>
                <TextField name='description'
                           value={inputValues.description}
                           required
                           label="Описание"
                           multiline
                           maxRows={4}
                           onChange={e => handleInputChange(e)}/>
                <TextField name='address'
                           value={inputValues.address}
                           required
                           label="Адрес"
                           onChange={e => handleInputChange(e)}/>
                <TextField name='price'
                           value={inputValues.price}
                           required
                           label="Цена"
                           onChange={e => handleInputChange(e)}/>
                <FormControl fullWidth required={true}>
                    <InputLabel id="category-select-label">Категория</InputLabel>
                    <Select name='category'
                            labelId="category-select-label"
                            value={activeCategory.category}
                            onChange={(e) => handleInputSelect(e)}>

                        {categories.map((category, index) => {
                            return <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>})}
                    </Select>
                </FormControl>
                <FormControl fullWidth required={true}>
                    <InputLabel id="unit-select-label">Единица</InputLabel>
                    <Select name='unit'
                            required
                            labelId="unit-select-label"
                            value={activeCategory.unit}
                            onChange={e => handleInputSelect(e)}>
                        <MenuItem value={'шт.'}>шт.</MenuItem>
                        <MenuItem value={'кв.м.'}>кв.м.</MenuItem>
                        <MenuItem value={'куб.м.'}>куб.м.</MenuItem>
                    </Select>
                </FormControl>
                <div className={styles.imageCardsContainer}>
                    {[...Array(filesList?.length || 0)].map((_, index) => <TextCard text={filesList![index].name}/>)}
                </div>
                <div className={styles.buttonsBlock}>
                    <Button className={styles.button} color='info' component="label" variant="contained"
                            size='small' startIcon={<CloudUploadIcon sx={{color: 'white'}}/>}
                    >
                        Загрузить изображения
                        <VisuallyHiddenInput name='images' type="file" multiple={true}
                                             onChange={e => handleSelectFiles(e)}/>
                    </Button>
                    <Button className={styles.button} type='submit' variant="contained" size='small'>Отправить</Button>
                </div>
            </form>
        </div>
    )};

export default AddAd;