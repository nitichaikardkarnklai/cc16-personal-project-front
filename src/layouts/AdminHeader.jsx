import React from 'react';
import { useLocation } from "react-router-dom";
import MenuItem from './MenuItem';

const adminMenuList = [
    {
        id: 1,
        word: "Employee",
        to: "/admin/employeeMgt"
    },
    {
        id: 2,
        word: "Create",
        to: "/admin/create"
    },
    {
        id: 3,
        word: "Ongoing",
        to: "/admin/ongoing"
    },
    {
        id: 4,
        word: "Finished",
        to: "/admin/finished"
    }
]

export default function AdminHeader() {
    const { pathname } = useLocation();
    return (
        <div className="flex justify-self-start place-self-center">
            {adminMenuList.map(el => {
                return <MenuItem key={el.id} to={el.to} active={pathname === el.to} >{el.word}</MenuItem>
            })}
        </div>
    )
}
