import Link from 'next/link';
import { useState } from 'react';

import { useProductVariants } from "@root/hooks";

import Slider from '@mui/material/Slider';
import { Button } from 'react-bootstrap';

import style from './sidebar.module.scss';


const Sidebar = ({ setFilterRules, filterRules, handleFilter }) => {

    const { data: productVariants } = useProductVariants();

    const valueLabelFormat = (value) => value;

    const handlePriceFilter = (event) => {
        setFilterRules({ ...filterRules, price: [...event.target.value] })
    }
    const handleSizeFilter = (event) => {

        if (event.target.nodeName === 'INPUT') {

            if (event.target.checked) {
                const filterData = [...filterRules.sizes, event.target.getAttribute('value')]
                setFilterRules({ ...filterRules, sizes: filterData });
            } else {
                const filterDataFun = (size) => size !== event.target.getAttribute('value');
                const sizes = filterRules.sizes.filter(filterDataFun)
                setFilterRules({ ...filterRules, sizes });

            }
        }
    }

    const handleColorFilter = (event) => {

        if (event.target.nodeName === 'INPUT') {

            if (event.target.checked) {
                const filterData = [...filterRules.colors, event.target.getAttribute('value')]
                setFilterRules({ ...filterRules, colors: filterData });
            } else {
                const filterDataFun = (color) => color !== event.target.getAttribute('value');
                const colors = filterRules.colors.filter(filterDataFun)
                setFilterRules({ ...filterRules, colors });

            }
        }
    }

    return (
        <div className={style.sidebarWrapper}>
            <div className={style.priceFilter}>
                <h4 className={style.title}>فلترة بحسب السعر</h4>
                <Slider
                    size="small"
                    min={50}
                    max={3000}
                    step={80}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    value={filterRules.price}
                    onChange={handlePriceFilter}
                    valueLabelDisplay="auto"
                    disableSwap
                />
                <p className={style.priceRanger}>
                    السعر  : {filterRules.price[1]} - {filterRules.price[0]}
                </p>
            </div>
            {!!productVariants?.sizes?.length &&
                (<div className={style.filter}>
                    <h4 className={style.title}>فلترة بحسب الحجم</h4>
                    <ul className={`list-unstyled ${style.filterList}`} onChange={handleSizeFilter}>
                        {productVariants.sizes.map(size => (
                            <li key={size.id} className={`${style.filterItem} d-flex`}>
                                <input type="checkbox" value={size.name} id={size.name} />
                                <label htmlFor={size.name} className="ms-2">{size.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>)}
            {!!productVariants?.colors.length &&
                (<div className={style.filter}>
                    <h4 className={style.title}>فلترة بحسب اللون</h4>
                    <ul className={`list-unstyled ${style.filterList}`} onChange={handleColorFilter}>
                        {productVariants.colors.map(color => (
                            <li key={color.id} className={`${style.filterItem} d-flex`}>
                                <input
                                    type="checkbox"
                                    value={color.name}
                                    id={color.name}
                                />
                                <label htmlFor={color.name} className="ms-2">{color.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>)}
            <div className={style.applyFilter}>
                <Button className={style.applyFilterBtn} onClick={handleFilter}>تطبيق الفلتر</Button>
            </div>
            <div className={style.tags}>
                <h4 className={style.title}>العلامات</h4>
                <Link href="" className={style.tagItem}>ملابس</Link>
            </div>
        </div>
    )
}
export default Sidebar;