
import { useCategoriesData, useProductVariants } from "@root/hooks";

import Slider from '@mui/material/Slider';
import { Button } from 'react-bootstrap';

import CloseIcon from '@mui/icons-material/Close';

import style from './sidebar.module.scss';
import { CategoriesMenu } from "../categoriesmenu";


const Sidebar = ({ setFilterRules,
    filterRules,
    handleFilter,
    handleDeleteFilter
}) => {

    const { data: productVariants } = useProductVariants();
    const { data: categories } = useCategoriesData();

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
                <div className='d-flex align-items-center justify-content-spacebetween'>
                    <h4 className={style.title} style={{ margin: '0px' }}>السعر</h4>
                    <Button className={style.clearFilter} onClick={handleDeleteFilter}>
                        مسح الفلتر
                        <CloseIcon className={style.coloricon} fontSize="small" />
                    </Button>
                </div>
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
                <p className={style.priceRange}>
                    السعر  : {Number(filterRules.price[1]).toLocaleString()} - {Number(filterRules.price[0]).toLocaleString()}
                </p>
            </div>
            <div>
                {!!productVariants?.sizes?.length &&
                    <div className={style.filter}>
                        <h4 className={style.title}>فلترة بحسب الحجم</h4>
                        <ul className={`list-unstyled ${style.filterList}`} onChange={handleSizeFilter}>
                            {productVariants.sizes.map(size => (
                                <li key={size.id} className={`${style.filterItem} d-flex align-items-center`}>
                                    <input
                                        className={style.checkBox}
                                        type="checkbox"
                                        value={size.name}
                                        id={size.name} />
                                    <label htmlFor={size.name} className="ms-2">{size.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                {!!productVariants?.colors.length &&
                    <div className={style.filter}>
                        <h4 className={style.title}>اللون</h4>
                        <ul className={`list-unstyled ${style.filterList}`} onChange={handleColorFilter}>
                            {productVariants.colors.map(color => (
                                <li key={color.id} className={`${style.filterItem} d-flex`}>
                                    <input
                                        className={style.checkBox}
                                        type="checkbox"
                                        value={color.name}
                                        id={color.name}
                                    />
                                    <label htmlFor={color.name} className="ms-2">{color.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
            {/* {!!categories?.length &&
                <div className={style.categories}>
                    <h4 className={style.title}>الاقسام</h4>
                    <CategoriesMenu
                        categoriesData={categories}
                        withButtonOpen={false}
                    />
                </div>
            } */}

            <div className={style.applyFilter}>
                <Button className={style.applyFilterBtn} onClick={handleFilter}>تطبيق الفلتر</Button>
            </div>
            {/* <div className={style.tags}>
                <h4 className={style.title}>العلامات</h4>
                <Link href="" className={style.tagItem}>ملابس</Link>
            </div> */}
        </div>
    )
}
export default Sidebar;