import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function EmployeeRow({ userObj, onInactive, onSubmit }) {
    const { id, email, firstName, lastName, isAdmin, deletedAt } = userObj;
    const [isEdit, setIsEdit] = useState(false);
    const [input, setInput] = useState({ firstName: firstName, lastName: lastName, email: email, isAdmin: isAdmin });

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const handleIsEdit = (e) => {
        e.preventDefault();
        setIsEdit(c => !c);
    }

    return (
        <div className="flex p-3 items-center">
            <div className="w-20">{id}</div>
            {isEdit ?
                <>
                    <form onSubmit={(e) => onSubmit(e, handleIsEdit, id, input)} className="flex items-center">
                        <div className="w-64">
                            <Input value={input.email} onChange={handleChangeInput} type="text" name="email"></Input>
                        </div>
                        <div className="w-48">
                            <Input value={input.firstName} onChange={handleChangeInput} type="text" name="firstName"></Input>
                        </div>
                        <div className="w-48">
                            <Input value={input.lastName} onChange={handleChangeInput} type="text" name="lastName"></Input>
                        </div>
                        <div className="w-48">
                            <Input value={input.isAdmin} onChange={handleChangeInput} type="text" name="isAdmin"></Input>
                        </div>
                        <div className="min-w-20">
                            <div className="flex gap-4">
                                <Button type="submit" bg="blue" text="white">Save</Button>
                                <Button onClick={handleIsEdit} bg="yellow" text="white">Cancel</Button>
                            </div>
                        </div>
                    </form>
                    <div className="w-32">
                    </div>
                </>
                :
                <>
                    <div className="w-64">{email}</div>
                    <div className="w-48">{firstName}</div>
                    <div className="w-48">{lastName}</div>
                    <div className="w-48">{"" + isAdmin}</div>
                    <div className="min-w-20">
                        <Button onClick={handleIsEdit} bg="green" text="white">Edit</Button>
                    </div>
                    <div className="w-32">
                        {deletedAt ? <Button bg="gray" text="white" onClick={() => onInactive(id)}>Inactive</Button>
                            : <Button bg="red" text="white" onClick={() => onInactive(id)}>Active</Button>}
                    </div>
                </>
            }
        </div >
    )
}
