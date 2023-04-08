import React, { useState, useEffect, useRef } from 'react';

import { useCategoriesData } from '@root/hooks';

import { Button } from 'react-bootstrap';

import { BarIcon } from '@root/components/baricon';
import { ListItem } from '@root/components/listitem';
import { CategoryItem } from './categoryitem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import style from './categoriesmenu.module.scss';

const CategoriesMenu = () => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false);


    const refCategoryMenu = useRef(null);

    const { data: categories } = useCategoriesData();

    useEffect(() => {

        const closeCategoryListMenuListOnPressEscape = (event) => {
            if (event.key === 'Escape') setCategoryListIsOpen(false);

        };
        const closeCategoryListMenuListOnMouseClick = (event) => {
            if (refCategoryMenu.current.contains(event.target)) {
                return;
            }
            setCategoryListIsOpen(false);
        }

        document.addEventListener('keydown', closeCategoryListMenuListOnPressEscape);
        document.addEventListener('click', closeCategoryListMenuListOnMouseClick);


        return () => {
            document.removeEventListener('keydown', closeCategoryListMenuListOnPressEscape);
            document.removeEventListener('click', closeCategoryListMenuListOnMouseClick);
        }

    }, []);

    return (
        <div className={style.categoryWrapperMenu} ref={refCategoryMenu}>
            <Button
                className={style.buttonCategories}
                onClick={() => setCategoryListIsOpen(!categoryListIsOpen)}>

                <BarIcon
                    activeIcons={categoryListIsOpen ? true : false}
                    style={{ marginLeft: '0.7rem', marginTop: '5px', width: "20px" }}
                    barIconStyle={null} />
                <span className={style.text}>جميع الاقسام</span>
                <span className="ms-auto">
                    <KeyboardArrowDownIcon fontSize="small" />
                </span>
            </Button>
            <ul className={`${style.listCategories} ${categoryListIsOpen ? style.openCategoryList : ''}  list-unstyled`}>

                {!!categories?.data?.length ?
                    <ListItem
                        data={categories.data}
                        renderItem={
                            (category) => (
                                <CategoryItem
                                    key={category.id}
                                    categoryData={category}
                                    onClick={() => setCategoryListIsOpen(false)}
                                />)}
                    />

                    : <li style={{ padding: " 0.5rem 0.2rem" }}>لا توجد اقسام</li>

                }
            </ul>
        </div>
    )

}

export default CategoriesMenu;