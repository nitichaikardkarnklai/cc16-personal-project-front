import React from 'react';
import { useLocation } from "react-router-dom";
import MenuItem from './MenuItem';

const employeeMenuList = [
    {
        id: 1,
        word: "Start",
        to: "/"
    },
    {
        id: 2,
        word: "Coming Soon",
        to: "/comingSoon"
    },
    {
        id: 3,
        word: "History",
        to: "/history"
    }
]

export default function EmployeeHeader() {
    const { pathname } = useLocation();
    return (
        <div className="flex justify-self-start place-self-center">
            {employeeMenuList.map(el => {
                return <MenuItem key={el.id} to={el.to} active={pathname === el.to} >{el.word}</MenuItem>
            })}
        </div>
    )
}
