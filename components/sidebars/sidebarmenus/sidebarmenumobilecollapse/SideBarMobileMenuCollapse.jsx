import { useState, useEffect } from 'react';

const SideBarMobileMenuCollapse = ({ children }) => {

    const [sidebarMenuIsOpen, setSidebarMenuIsOpen] = useState(false);

    useEffect(() => {

        const closeSideBarMobileMenuMobileonKeyDown = (event) => {
            if (event.key === 'Escape') setSidebarMenuIsOpen(false);
        };


        document.body.addEventListener('keydown', closeSideBarMobileMenuMobileonKeyDown);

        return () => document.removeEventListener('keydown', closeSideBarMobileMenuMobileonKeyDown);


    }, [])

    return children(sidebarMenuIsOpen, setSidebarMenuIsOpen)

}

export default SideBarMobileMenuCollapse;