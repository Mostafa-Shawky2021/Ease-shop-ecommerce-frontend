import { useState } from 'react';

import { useCategoriesData } from '@root/hooks';

import { Button } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { BarIcon } from '@root/components/baricon';
import { ListItem } from '@root/components/listitem';
import { CategoryItem } from './categoryitem';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import style from './categoriesmenumobile.module.scss';

const CategoriesMenuMobile = () => {

    const [categoryListIsOpen, setCategoryListIsOpen] = useState(false);

    const { data: categories } = useCategoriesData();

    const mainCategories = categories?.filter(category => category.parent_id === null);

    return (
        <div className={style.categoriesMenuMobileWrapper}>
            <Button
                className={style.buttonCategories}
                onClick={() => setCategoryListIsOpen(!categoryListIsOpen)}>

                <BarIcon
                    style={{ marginLeft: '0.7rem', marginTop: '5px', width: "20px" }}
                    activeIcons={categoryListIsOpen ? true : false}
                    barIconStyle={style.barIcon} />

                <span className={style.text}>جميع الاقسام</span>
                <span
                    className="ms-auto"
                    style={{ transition: "all 0.3s", transform: categoryListIsOpen ? "rotate(-90deg)" : "rotate(0deg)" }}>
                    <ChevronLeftIcon fontSize="small" />
                </span>
            </Button>
            <Collapse in={categoryListIsOpen}>
                <ul className={`${style.listCategories} list-unstyled`}>
                    {!!categories?.length ?
                        <ListItem
                            data={mainCategories}
                            renderItem={(category) => (
                                <CategoryItem
                                    key={category.id}
                                    categoryData={category} />)
                            } />
                        : <li>لا توجد اقسام</li>
                    }

                </ul>
            </Collapse>
        </div>
    )
}
export default CategoriesMenuMobile;