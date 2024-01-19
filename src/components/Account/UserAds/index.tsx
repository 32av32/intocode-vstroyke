import React, {useEffect, useState} from 'react';
import styles from './UserAds.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import Divider from "@mui/material/Divider";
import {deleteAd, getUserAds} from "../../../createActions/adsActions";
import {Link, useParams} from "react-router-dom";
import AccountAdCard from "../AccountAdCard";
import {Box, Button, IconButton, Modal, Popover} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {BoxModalStyle, boxPopoverStyle} from "../../../utils/mui";
import AddAd from "../../../pages/AddAd";

const UserAds = () => {
    const dispatch = useAppDispatch()
    const {ads} = useAppSelector(state => state.ads)
    const {id} = useParams()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getUserAds(id!))
    }, []);

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEditClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteAd = (id: string) => {
        dispatch(deleteAd(id))
    }

    return (
        <div className={styles.container}>
            {ads.map((ad, index) => {
                return (
                    <>
                        <div className={styles.card}>
                            <Link to={`ads/${ad._id}`}>
                                <AccountAdCard key={index} {...ad} />
                            </Link>
                            <div>
                                <IconButton onClick={e => handleEditClick(e)}>
                                    <MoreHorizIcon fontSize='small'/>
                                </IconButton>
                                <Popover
                                    open={!!anchorEl}
                                    anchorEl={anchorEl}
                                    onClose={handleEditClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Box className={styles.cardPopup} sx={boxPopoverStyle}>
                                        <Button color='info' onClick={() => setOpenModal(true)}>Редактировать</Button>
                                        <Modal open={openModal} onClose={() => setOpenModal(false)}>
                                            <Box sx={{...BoxModalStyle, p: 3}}>
                                                <AddAd variant='patch' {...ad}/>
                                            </Box>
                                        </Modal>
                                        <Button color='error' onClick={() => handleDeleteAd(ad._id)}>Удалить</Button>
                                    </Box>
                                </Popover>
                            </div>
                        </div>
                        {(ads.length - index !== 1) && <Divider/>}
                    </>
                )
            })}
        </div>
    );
};

export default UserAds;