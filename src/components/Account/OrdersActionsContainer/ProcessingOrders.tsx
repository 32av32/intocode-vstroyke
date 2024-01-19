import React, {useState} from 'react';
import styles from "./OrdersActionsContainer.module.scss";
import {Avatar, Box, Button, IconButton, Popover, Rating} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {boxPopoverStyle} from "../../../utils/mui";
import {IOrder} from "../../../types/ordersTypes";
import Divider from "@mui/material/Divider";
import {useAppDispatch} from "../../../hooks";
import {patchOrders} from "../../../createActions/ordersActions";

const PendingOrders = ({orders}: { orders: IOrder[] }) => {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEditClose = () => {
        setAnchorEl(null);
    };
    const handleOrderAction = (id: string, status: string) => {
        dispatch(patchOrders({id, status}))
    }

    return (
        <div className={styles.ordersContainer}>
            {orders.map((order, index) => {
                return (
                    <div className={styles.orderItem}>
                        <Avatar alt='ava' variant="rounded" sx={{width: '80px', height: '80px'}}
                                src={`http://localhost:4000/images/profile/${typeof order.user !== "string" && order.user.image}`}/>
                        <div className={styles.orderItem__content}>
                            <h4>{typeof order.user !== "string" && order.user.name}</h4>
                            <p>2023-01-18</p>
                            <Rating
                                name="read-only" value={5} precision={0.5} readOnly
                                icon={<StarRateRoundedIcon sx={{color: 'gold'}} fontSize='inherit'/>}
                                emptyIcon={<StarRateRoundedIcon sx={{}} fontSize='inherit'/>}
                            />
                        </div>
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
                                    <Button color='success' onClick={() => handleOrderAction(order._id, 'fulfilled')}>Завершить</Button>
                                    <Button color='error' onClick={() => handleOrderAction(order._id, 'canceled')}>Прекратить</Button>
                                </Box>
                            </Popover>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default PendingOrders;