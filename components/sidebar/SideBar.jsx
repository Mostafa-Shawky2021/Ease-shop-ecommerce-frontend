import { InputWithIcon } from '@root/components/inputs';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import style from './sidebar.module.scss';


const Sidebar = () => {

    return (
        <div className={style.sidebarWrapper}>
            <div className={style.search}>
                <h3 className={style.title}>بحث عن منتج</h3>
                <InputWithIcon placeholder="عن ماذا تبحث؟">
                    <button className={style.btnSearch}>
                        <SearchOutlinedIcon />
                    </button>
                </InputWithIcon>
            </div>

        </div>
    )
}
export default Sidebar;