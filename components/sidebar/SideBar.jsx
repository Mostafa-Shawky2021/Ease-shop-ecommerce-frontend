
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
        brands: [],
    });

    const router = useRouter();
    const { data: productVariants } = useProductVariants();

    console.log(productVariants)
    useEffect(() => {

        const queryFilter = router.query;

        const filterRulesQueries = {};

        (queryFilter.price) ? filterRulesQueries.price = queryFilter.price.split('-') : null;
        (queryFilter.sizes) ? filterRulesQueries.sizes = queryFilter.sizes.split('-') : null;
        (queryFilter.colors) ? filterRulesQueries.colors = queryFilter.colors.split('-') : null;
        (queryFilter.brands) ? filterRulesQueries.brands = queryFilter.brands.split('-') : null;

        setFilterRules({ ...filterRules, ...filterRulesQueries });

    }, []);

    const valueLabelFormat = (value) => value;


    const handlePriceFilter = (event) => {
        setFilterRules({ ...filterRules, price: [...event.target.value] })
    }
    const handleBrandChange = (event) => {

        if (event.target.checked) {
            const filterData = [...filterRules.brands, event.target.value]
            setFilterRules({ ...filterRules, brands: filterData });
        } else {
            const filterDataFun = (brand) => brand !== event.target.value;
            const brands = filterRules.brands.filter(filterDataFun)
            setFilterRules({ ...filterRules, brands });
        }
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
                    disableSwap />
                <p className={style.priceRange}>
                    السعر  : {Number(filterRules.price[1]).toLocaleString()} - {Number(filterRules.price[0]).toLocaleString()}
                </p>
            </div>
            <div>
                {!!productVariants?.brands?.length &&
                    <div className={style.filter}>
                        <h4 className={style.title}>البراندات</h4>
                        <ul className={`list-unstyled ${style.filterList}`} >
                            {productVariants.brands.map(brand => (
                                <li key={brand.id} className={`${style.filterItem} d-flex align-items-center`}>
                                    <input
                                        className={style.checkBox}
                                        type="checkbox"
                                        value={brand.brand_name}
                                        id="brand"
                                        onChange={handleBrandChange}
                                        checked={filterRules.brands.includes(brand.brand_name) ? 'checked' : ''}
                                    />
                                    <label htmlFor="brand" className="ms-2">{brand.brand_name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                {!!productVariants?.sizes?.length &&
                    <div className={style.filter}>
                        <h4 className={style.title}>المقاسات</h4>
                        <ul className={`list-unstyled ${style.filterList}`} >
                            {productVariants.sizes.map(size => (
                                <li key={size.id} className={`${style.filterItem} d-flex align-items-center`}>
                                    <input
                                        className={style.checkBox}
                                        type="checkbox"
                                        value={size.size_name}
                                        id="size"
                                        onChange={handleSizeChange}
                                        checked={filterRules.sizes.includes(size.size_name) ? 'checked' : ''}
                                    />
                                    <label htmlFor="size" className="ms-2">{size.size_name}</label>
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
                                        value={color.color_name}
                                        id="color"
                                        onChange={handleColorChange}
                                        checked={filterRules.colors.includes(color.color_name) ? 'checked' : ''}
                                    />
                                    <label htmlFor="color" className="ms-2">{color.color_name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>

            <div className={style.applyFilter}>
                <Button className={style.applyFilterBtn} onClick={() => handleFilter(filterRules)}>تطبيق الفلتر</Button>
            </div>
        </div>
    )
}
export default Sidebar;