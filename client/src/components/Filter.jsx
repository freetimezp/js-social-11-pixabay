import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { filterMenu } from '../utils/supports';

const Filter = () => {
    const [isActive, setIsActive] = useState("Home");
    console.log("Filter :", filterMenu);

    return (
        <div className='flex items-start justify-start xl:items-center xl:justify-center 
        overflow-x-scroll gap-12 pt-6 scrollbar-none'>
            {filterMenu && filterMenu.map((menu) => (
                <Link
                    key={menu.label}
                    to={menu.to}
                    onClick={() => setIsActive(menu.label)}
                >
                    <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full 
                    ${isActive === menu.label ? "bg-zinc-100" : ""} cursor-pointer`}>
                        <menu.icon
                            className={`${isActive === menu.label ? "text-emerald-400" : "text-primary"} text-lg`}
                        />
                        <p className='text-base text-primary'>
                            {menu.label}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Filter;

