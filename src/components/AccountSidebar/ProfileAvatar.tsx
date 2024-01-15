import React, {useRef, useState} from 'react';
import styles from "./AccountSidebar.module.scss";
import {Alert, Avatar, Box, Button, IconButton, Modal, Popover, styled} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {patchAccount} from "../../createActions/userActions";
import {BoxModalStyle} from "../../utils/mui";

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

const ProfileAvatar = ({_id, image}: {_id: string, image: string}) => {
    const dispatch = useAppDispatch()
    const formRef = useRef<HTMLFormElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const { errors } = useAppSelector(state => state.user)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenModal(true)
        const fileReader = new FileReader();
        fileReader.onload = function() {
            imgRef.current!.src = fileReader.result as string;
        }
        fileReader.readAsDataURL(e.target.files![0]);
    }

    const handleSubmitProfileImageForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const formData = new FormData(formRef.current!)
        dispatch(patchAccount(formData))
    }

    return (
        <div className={styles.profile__avatar}>
            <Avatar sx={{width: '120px', height: '120px'}} alt="profile photo"
                    src={`http://localhost:4000/images/profile/${image}`}/>
            <IconButton color="secondary" className={styles.profile__avatarPost} onClick={handleClick}>
                <AddAPhotoIcon/>
            </IconButton>
            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <form ref={formRef}>
                    <Button className={styles.button} component="label" variant="contained"
                            size='small' startIcon={<CloudUploadIcon sx={{color: 'white'}}/>}
                    >
                        Загрузить
                        <VisuallyHiddenInput type={'file'} name={'image'} onChange={e => handleSelectFiles(e)}/>
                    </Button>
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                    >
                        <Box sx={{...BoxModalStyle, width: 500, p: 2,}}>
                            <div className={styles.uploadedImage}>
                                <img ref={imgRef} alt={'avatar'}/>
                                <Button type={'submit'} color={'success'} variant={'contained'}
                                        onClick={e => handleSubmitProfileImageForm(e)}>Отправить</Button>
                                {errors && <Alert severity="error">{errors}</Alert>}
                            </div>
                        </Box>
                    </Modal>
                </form>
            </Popover>
        </div>
    );
};

export default ProfileAvatar;