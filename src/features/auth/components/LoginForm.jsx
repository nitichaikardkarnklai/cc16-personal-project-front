import { useState } from 'react';
import { toast } from "react-toastify"
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import validateLogin from '../validations/validate-login';
import useAuth from "../../../hooks/use-auth";

export default function LoginForm() {
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState({});

    const { login } = useAuth();

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const handleSubmitForm = async e => {
        try {
            e.preventDefault();
            const validationError = validateLogin(input);
            if (validationError) {
                return setError(validationError);
            }
            await login(input);
        } catch (err) {
            toast.error(err.response?.data.message);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <div className='text-white text-[2rem]'>Login</div>
                <div className="grid gap-4 p-4">
                    <div>
                        <Input
                            placeholder="Email address"
                            value={input.email}
                            name="email"
                            onChange={handleChangeInput}
                            errorMessage={error.email}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Password"
                            value={input.password}
                            name="password"
                            onChange={handleChangeInput}
                            errorMessage={error.password}
                            type="password"
                        />
                    </div>
                    <Button width="full" color="white" bg="black">LOGIN</Button>
                </div>
            </form>
        </div>
    )
}
