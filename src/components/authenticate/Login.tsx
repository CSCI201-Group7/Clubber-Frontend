"use client";

import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import { encrypt } from "@/utilities/utilities";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div
            className="w-1/3 h-fit flex flex-col justify-start items-center 
        mt-30 outline-2 outline-gray-500 rounded-2xl bg-white p-4 gap-6">
            <div className="text-4xl font-bold font-roboto text-center w-full px-4 py-2 text-usc-cardinal-dark mt-2">
                Welcome Back
            </div>

            <Form
                id="login-form"
                action={onSubmitLogin}
                className="w-full h-fit flex flex-col justify-start items-center p-4 gap-15">
                <div className="w-full h-fit flex flex-col justify-start items-center gap-5">
                    <div
                        className="w-full max-w-2/3 flex-1 h-fit py-1 px-2 flex justify-center items-center rounded-lg bg-gray-100 
                focus-within:outline-3 focus-within:outline-gray-300">
                        <input
                            form="login-form"
                            className="w-full h-full flex-1 bg-transparent p-2 text-lg focus:outline-none"
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div
                        className="w-full max-w-2/3 flex-1 h-fit py-1 px-2 flex justify-center items-center rounded-lg bg-gray-100 
                focus-within:outline-3 focus-within:outline-gray-300">
                        <input
                            form="login-form"
                            className="w-full h-full flex-1 bg-transparent p-2 text-lg focus:outline-none"
                            placeholder="Password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full max-w-2/3 flex-1 h-fit py-2 flex flex-col justify-center items-center gap-2">
                    <button
                        form="login-form"
                        className="w-full py-3 h-fit flex justify-center items-center cursor-pointer
                        rounded-lg bg-usc-cardinal-red text-white text-xl font-bold font-roboto
                        hover:bg-usc-cardinal-light transition-colors duration-100
                        active:bg-usc-cardinal-dark"
                        type="submit">
                        Log In
                    </button>

                    <div className="text-gray-500 text-sm font-roboto p-1">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/authenticate?type=signup"
                            className="text-usc-cardinal-red font-bold">
                            Sign up
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
}

async function onSubmitLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);
    const encryptedEmail = await encrypt(email);
    const encryptedPassword = await encrypt(password);
    console.log(encryptedEmail, encryptedPassword);
}
