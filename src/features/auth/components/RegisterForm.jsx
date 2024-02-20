import { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { toast } from "react-toastify"
import validateRegister from '../validations/validate-register';
import useAuth from "../../../hooks/use-auth";

const initial = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function RegisterForm() {
    const [input, setInput] = useState(initial);
    const [error, setError] = useState({});

    const { register } = useAuth();

    const handleSubmitForm = async e => {
        try {
            e.preventDefault();

            const validateError = validateRegister(input);
            if (validateError) {
                return setError(validateError)
            }

            console.log("input: ", input);

            await register(input);

            toast.success("Register Successfully");
        } catch (err) {
            if (err.response.data.message === "EMAIL_MOBILE_IN_USE") {
                setError({ emailOrMobile: "already in use" })
            }
            console.log("error: ", err);
            toast.error(err.response?.data.message);
        }
    };
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };
    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <div className='text-white text-[2rem]'>Register</div>
                <div className="grid grid-cols-2 p-4 gap-4">
                    <div>
                        <Input
                            placeholder="First name"
                            value={input.firstName}
                            name="firstName"
                            onChange={handleChange}
                            errorMessage={error.firstName}
                        ></Input>
                    </div>
                    <div>
                        <Input
                            placeholder="Last name"
                            value={input.lastName}
                            name="lastName"
                            onChange={handleChange}
                            errorMessage={error.lastName}
                        ></Input>
                    </div>
                    <div className='col-span-full'>
                        <Input
                            placeholder="Email address"
                            value={input.email}
                            name="email"
                            onChange={handleChange}
                            errorMessage={error.email}
                        ></Input>
                    </div>
                    <div className='col-span-full'>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={input.password}
                            name="password"
                            onChange={handleChange}
                            errorMessage={error.password}
                        ></Input>
                    </div>
                    <div className='col-span-full'>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={input.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            errorMessage={error.confirmPassword}
                        ></Input>
                    </div>
                    <div className='col-span-full'>
                        <Button width="full" color="white" bg="black">REGISTER</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
