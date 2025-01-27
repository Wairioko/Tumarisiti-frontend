import React from 'react';
import useSignUpHook from '../hooks/userSignUpHook.mjs';
const SignUpPage = () => {
    const { 
        KRApin, 
        password, 
        error, 
        setKRApin, 
        setPassword, 
        handleSubmit, 
        email, 
        setEmail, 
        companyName, 
        setCompanyName 
    } = useSignUpHook();

    return (
        <div>
            {error && <div className="error">{error}</div>}
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img 
                        className="mx-auto h-10 w-auto" 
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" 
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign up for your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    className="block w-full rounded-md bg-blue px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-900">
                                Company Name
                            </label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="companyName" 
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required 
                                    className="block w-full rounded-md bg-blue px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="kraPin" className="block text-sm font-medium text-gray-900">
                                KRA Pin
                            </label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="kraPin" 
                                    value={KRApin}
                                    onChange={(e) => setKRApin(e.target.value)}
                                    required 
                                    className="block w-full rounded-md bg-blue px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                              
                            </div>
                            <div className="mt-2">
                                <input 
                                    type="password" 
                                    id="password" 
                                    autoComplete="current-password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    className="block w-full rounded-md bg-blue px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                            </div>
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login Page
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
