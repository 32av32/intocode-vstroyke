import React from 'react';
import styles from "./AccountSidebar.module.scss";
import ExtensionIcon from "@mui/icons-material/Extension";
import {Link} from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Divider from "@mui/material/Divider";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {useAppSelector} from "../../hooks";

const LinksSideBar = () => {
    const id = useAppSelector(state => state.user.user._id)

    return (
        <div>
            <div className={styles.sidebar}>
                <ul>
                    <li className={styles.sidebar__link}>
                        <ExtensionIcon/>
                        <Link to={`/account/${id}`}>Мои объявления</Link>
                    </li>
                    <li className={styles.sidebar__link}>
                        <ShoppingBagIcon/>
                        <Link to={'/'}>Мои заказы</Link>
                    </li>
                    <li className={styles.sidebar__link}>
                        <RateReviewIcon/>
                        <Link to={'/'}>Мои отзывы</Link>
                    </li>
                    <li className={styles.sidebar__link}>
                        <ThumbUpAltIcon/>
                        <Link to={`/account/${id}/favorites`}>Избранное</Link>
                    </li>
                    <Divider/>
                    <li className={styles.sidebar__link}>
                        <MessageIcon/>
                        <Link to={'/'}>Сообщения</Link>
                    </li>
                    <li className={styles.sidebar__link}>
                        <NotificationsIcon/>
                        <Link to={'/'}>Уведомления</Link>
                    </li>
                    <Divider/>
                    <li className={styles.sidebar__link}>
                        <ManageAccountsIcon/>
                        <Link to={`/account/${id}/settings`}>Настройки профиля</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LinksSideBar;