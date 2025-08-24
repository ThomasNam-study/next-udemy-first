'use client';

import React from 'react';
import classes from "@/components/main-header/nav-link.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

type Prop = {linkPath: string, children: React.ReactNode}

const NavLink = ({linkPath, children}: Prop) => {
    const path = usePathname();

    return (
        <Link href={linkPath} className={path.startsWith(linkPath) ? `${classes.link} ${classes.active}`: classes.link}>{children}</Link>
    );
};

export default NavLink;