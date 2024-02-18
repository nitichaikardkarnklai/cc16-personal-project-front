import { useEffect, useState } from 'react';
import * as usersApi from "../../api/users";
import { toast } from "react-toastify";
import EmployeeRow from '../../features/employee/components/EmployeeRow';
import { inactiveUser, editUser } from "../../api/users"

export default function EmployeeMgtPage() {
    const [users, setUsers] = useState([]);
    const [onFetch, setOnFetch] = useState(true);

    const handleInactive = async (id) => {
        try {
            await inactiveUser(id);

            setOnFetch(c => !c);
        } catch (err) {
            toast.error(err.response?.data.message);
        }
    }

    const handleSubmit = async (e, handleIsEdit, id, inputUserData) => {
        e.preventDefault();
        const userObj = { ...inputUserData };
        try {
            // console.log(userObj);
            if (userObj.isAdmin.toString().toLowerCase() === "true" || +userObj.isAdmin === 1) {
                userObj.isAdmin = true;
            } else if (userObj.isAdmin.toString().toLowerCase() === "false" || +userObj.isAdmin === 0) {
                userObj.isAdmin = false;
            }

            await editUser(id, userObj);

            handleIsEdit(e);
            setOnFetch(c => !c);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data.message);
        }
    }

    useEffect(() => {
        usersApi
            .getUsers()
            .then(res => {
                setUsers(res.data.users);
            })
            .catch(err => {
                toast.error(err.response?.data.message);
            })
    }, [onFetch])

    return (
        <div className='min-h-screen'>
            <div className='flex flex-col'>
                <div className="flex bg-gray-300 p-3">
                    <div className="w-20">Id</div>
                    <div className="w-64">Email</div>
                    <div className="w-48">Firstname</div>
                    <div className="w-48">Lastname</div>
                    <div className="w-48">Admin</div>
                    <div className="w-20">Actions</div>
                    <div className="w-32"></div>
                </div>
                {users.map((el) => <EmployeeRow
                    key={el.id}
                    userObj={el}
                    onInactive={handleInactive}
                    onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    )
}