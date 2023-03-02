
import { useState, useEffect } from 'react';

import { useRouter } from "next/router";
import { useCategoriesData, useProductVariants } from "@root/hooks";

import Slider from '@mui/material/Slider';
import { Button } from 'react-bootstrap';
import { CategoriesMenu } from "./categoriesmenu";

import CloseIcon from '@mui/icons-material/Close';

import style from './sidebar.module.scss';


const Sidebar = ({ handleFilter, handleDeleteFilter }) => {

    const [filterRules, setFilterRules] = useState({
        price: [50, 10000],
        sizes: [],
        colors: [],
    });

    const router = useRouter();
    const { data: productVariants } = useProductVariants();
    const { data: categories } = useCategoriesData();

    useEffect(() => {
        const queryFilter = router.query;

        const filterRulesQueries = {};

        (queryFilter.price) ? filterRulesQueries.price = queryFilter.price.split('-') : null;
        (queryFilter.sizes) ? filterRulesQueries.sizes = queryFilter.sizes.split('-') : null;
        (queryFilter.colors) ? filterRulesQueries.colors = queryFilter.colors.split('-') : null;
        setFilterRules({ ...filterRules, ...filterRulesQueries })

    }, []);

    const valueLabelFormat = (value) => value;

    const handlePriceFilter = (event) => {
        setFilterRules({ ...filterRules, price: [...event.target.value] })
    }
    const handleSizeChange = (event) => {

        if (event.target.checked) {
            const filterData = [...filterRules.sizes, event.target.value]
            setFilterRules({ ...filterRules, sizes: filterData });
        } else {
            const filterDataFun = (size) => size !== event.target.value;
            const sizes = filterRules.sizes.filter(filterDataFun)
            setFilterRules({ ...filterRules, sizes });
        }
    }

    const handleColorChange = (event) => {

        if (event.target.checked) {
            const filterData = [...filterRules.colors, event.target.value]
            setFilterRules({ ...filterRules, colors: filterData });
        } else {
            const filterDataFun = (color) => color !== event.target.value;
            const colors = filterRules.colors.filter(filterDataFun)
            setFilterRules({ ...filterRules, colors });

        }

    }


    return (
        <div className={style.sidebarWrapper}>
            <div className={style.priceFilter}>
                <div className='d-flex align-items-center justify-content-spacebetween'>
                    <h4 className={style.title} style={{ margin: '0px' }}>السعر</h4>
                    <Button className={style.clearFilter} onClick={() => handleDeleteFilter(setFilterRules)}>
                        مسح الفلتر
                        <CloseIcon className={style.coloricon} fontSize="small" />
                    </Button>
                </div>
                <Slider
                    size="small"
                    min={50}
                    max={10000}
                    step={80}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    value={filterRules.price}
                    onChange={handlePriceFilter}
                    valueLabelDisplay="auto"
                    disableSwap

                />
                <p className={style.priceRange}>
                    السعر  : {Number(filterRules.price[1]).toLocaleString()} - {Number(filterRules.price[0]).toLocaleString()}
                </p>
            </div>
            <div>
                {!!productVariants?.sizes?.length &&
                    <div className={style.filter}>
                        <h4 className={style.title}>فلترة بحسب الحجم</h4>
                        <ul className={`list-unstyled ${style.filterList}`} >
                            {productVariants.sizes.map(size => (
                                <li key={size.id} className={`${style.filterItem} d-flex align-items-center`}>
                                    <input
                                        className={style.checkBox}
                                        type="checkbox"
                                        value={size.name}
                                        id={size.name}
                                        onChange={handleSizeChange}
                                        checked={filterRules.sizes.includes(size.name) ? 'checked' : ''}
                                    />
                                    <label htmlFor={size.name} className="ms-2">{size.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                {!!productVariants?.colors.length &&
                    <div className={style.filter}>
                        <h4 className={style.title}>اللون</h4>
                        <ul className={`list-unstyled ${style.filterList}`}>
                            {productVariants.colors.map(color => (
                                <li key={color.id} className={`${style.filterItem} d-flex`}>
                                    <input
                                        className={style.checkBox}
                                        type="checkbox"
                                        value={color.name}
                                        id={color.name}
                                        onChange={handleColorChange}
                                        checked={filterRules.colors.includes(color.name) ? 'checked' : ''}
                                    />
                                    <label htmlFor={color.name} className="ms-2">{color.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
            {!!categories?.length &&
                <div className={style.categories}>
                    <h4 className={style.title}>الاقسام</h4>
                    <CategoriesMenu />
                </div>
            }

            <div className={style.applyFilter}>
                <Button className={style.applyFilterBtn} onClick={() => handleFilter(filterRules)}>تطبيق الفلتر</Button>
            </div>
            {/* <div className={style.tags}>
                <h4 className={style.title}>العلامات</h4>
                <Link href="" className={style.tagItem}>ملابس</Link>
            </div> */}
        </div>
    )
}
export default Sidebar;