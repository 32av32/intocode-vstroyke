import React from 'react';
import styles from './Categories.module.scss'
import {Link} from 'react-router-dom';
// import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import {useAppSelector} from "../../hooks";

const Categories = () => {
    const categories = useAppSelector(state => state.common.categories)

    return (
        <div className={styles.container}>
            {
                categories.map(category => {
                    return (
                        <Link key={category._id} to={'/'} className={styles.link}>
                            {/*<HouseSidingIcon fontSize={'small'} color={'secondary'} />*/}
                            <span>{category.title}</span>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default Categories;