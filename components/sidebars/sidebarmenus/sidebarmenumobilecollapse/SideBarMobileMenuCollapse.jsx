import { useState, useEffect } from 'react';

const SideBarMobileMenuCollapse = ({ renderSideBarMenuMobile }) => {

    const [sidebarMenuMobileIsOpen, setSidebarMenuMobileIsOpen] = useState(false);

    useEffect(() => {

        const closeSideBarMobileMenuMobileonKeyDown = (event) => {
            if (event.key === 'Escape') setSidebarMenuMobileIsOpen(false);
        };

        document.body.addEventListener('keydown', closeSideBarMobileMenuMobileonKeyDown);

        return () => document.removeEventListener('keydown', closeSideBarMobileMenuMobileonKeyDown);

    }, [])

    return renderSideBarMenuMobile(sidebarMenuMobileIsOpen, setSidebarMenuMobileIsOpen)

}

export default SideBarMobileMenuCollapse;