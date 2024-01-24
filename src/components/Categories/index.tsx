import React, {useState} from 'react';
import styles from './Categories.module.scss'
import {Link} from 'react-router-dom';
import {useAppSelector} from "../../hooks";
import {SearchContext} from "../../App";

const Categories = () => {
    const categories = useAppSelector(state => state.common.categories)
    const [activeCategory, setActiveCategory] = useState(0)
    const {setCategoryValue} = React.useContext(SearchContext)

    const handleChangeCategory = (index: number) => {
        setActiveCategory(index)
        if (setCategoryValue) {
            setCategoryValue(categories[index]._id)
        }
    }

    return (
        <div className={styles.container}>
            {
                categories.map((category, index) => {
                    return (
                        <Link key={category._id} to={'/'} className={styles.link}>
                            <span className={activeCategory === index ? styles.active : ''}
                            onClick={() => handleChangeCategory(index)}
                            >{category.title}</span>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default Categories;