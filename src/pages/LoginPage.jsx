import LoginForm from '../features/auth/components/LoginForm'
import { useState } from 'react'
import RegisterForm from '../features/auth/components/RegisterForm';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div className='max-w-full max-h-full flex mx-auto h-screen'>
            <div className="flex-1 hidden sm:block overflow-hidden">
                <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="landingPic" />
            </div>
            <div className='flex-1 bg-gradient-to-r from-orange-400 to-yellow-200 px-16'>
                <div className='mt-8 text-[80px] text-white'>Survey</div>
                <div className='text-[20px] text-white mx-[18%]'>for the better work life</div>
                <div className='mt-16'>
                    {isRegister ? "" : (
                        <div>
                            <LoginForm />
                            <div className='text-end mt-4'>
                                <button onClick={() => setIsRegister(true)} className='text-gray-600'>Register...</button>
                            </div>
                        </div>)}
                    {isRegister ? (
                        <div>
                            <RegisterForm />
                            <div className='text-end mt-4'>
                                <button onClick={() => setIsRegister(false)} className='text-gray-600'>Login...</button>
                            </div>
                        </div>) : ""}
                </div>
            </div>
        </div>
    )
}
