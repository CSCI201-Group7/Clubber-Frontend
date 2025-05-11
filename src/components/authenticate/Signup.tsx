"use client";

import { encrypt } from "@/utilities/utilities";
import axios, { AxiosError } from "axios";
import Form from "next/form";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/utilities/Fetcher";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const validateEmail = () => {
        if (!emailInputRef.current) return;
        const input = emailInputRef.current;

        if (input.value === "") {
            input.setCustomValidity("");
            return;
        }

        // Check if email ends with @usc.edu
        if (!input.value.endsWith("@usc.edu")) {
            input.setCustomValidity("Must end with @usc.edu");
            return;
        }

        input.setCustomValidity("");
    };

    const validatePassword = () => {
        if (!passwordInputRef.current) return;
        const input = passwordInputRef.current;

        if (input.value === "") {
            input.setCustomValidity("");
            return;
        }

        if (input.value.length < 8) {
            input.setCustomValidity("Must be at least 8 characters long");
            return;
        }
        if (!/[A-Z]/.test(input.value)) {
            input.setCustomValidity(
                "Must contain at least one uppercase letter"
            );
            return;
        }
        if (!/[a-z]/.test(input.value)) {
            input.setCustomValidity(
                "Must contain at least one lowercase letter"
            );
            return;
        }
        if (!/[0-9]/.test(input.value)) {
            input.setCustomValidity("Must contain at least one number");
            return;
        }
        if (!/[!@#$%^&*\-\_]+/.test(input.value)) {
            input.setCustomValidity(
                "Must contain at least one special character"
            );
            return;
        }

        input.setCustomValidity("");
    };

    const validateConfirmPassword = () => {
        if (!passwordInputRef.current || !confirmPasswordInputRef.current)
            return;

        const passwordInput = passwordInputRef.current;
        const confirmInput = confirmPasswordInputRef.current;

        if (confirmInput.value === "") {
            confirmInput.setCustomValidity("");
            return;
        }

        if (passwordInput.value !== confirmInput.value) {
            confirmInput.setCustomValidity("Passwords do not match");
        } else {
            confirmInput.setCustomValidity("");
        }
    };

    const validateUsername = () => {
        if (!usernameInputRef.current) return;
        const input = usernameInputRef.current;

        if (input.value === "") {
            input.setCustomValidity("");
            return;
        }

        if (input.value.length < 3) {
            input.setCustomValidity("Must be at least 3 characters long");
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(input.value)) {
            input.setCustomValidity(
                "Can only contain letters, numbers, and underscores"
            );
            return;
        }

        input.setCustomValidity("");
    };

    useEffect(validateConfirmPassword, [password, confirmPassword]);
    useEffect(validateUsername, [username]);
    useEffect(validatePassword, [password]);
    useEffect(validateEmail, [email]);

    const onSubmitSignup = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const encryptedUsername = await encrypt(username);
        const encryptedPassword = await encrypt(password);
        const encryptedEmail = await encrypt(email);

        try {
            const response = await axios.post("http://localhost:8080/users", {
                username: encryptedUsername,
                email: encryptedEmail,
                password: encryptedPassword,
            });
            if (response.status === 200) {
                setError("");
                await setToken(response.data.token);
                router.push("/clubs");
            } else if (response.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        }
    };

    return (
        <div
            className="w-1/3 h-fit flex flex-col justify-start items-center
        mt-30 outline-2 outline-gray-500 rounded-2xl bg-white p-4 gap-6">
            <div className="text-4xl font-bold font-roboto text-center w-full px-4 py-2 text-usc-cardinal-dark mt-2">
                Sign Up
            </div>

            <Form
                id="signup-form"
                action={onSubmitSignup}
                className="w-full h-fit flex flex-col justify-start items-center p-4 gap-15">
                <div className="w-full h-fit flex flex-col justify-start items-center gap-5">
                    <div
                        className="w-full max-w-2/3 flex-1 h-fit py-1 px-2 flex justify-center items-center rounded-lg bg-gray-100
                focus-within:outline-3 focus-within:outline-gray-300">
                        <input
                            form="signup-form"
                            className="w-full h-full flex-1 bg-transparent p-2 text-lg focus:outline-none"
                            placeholder="Username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            ref={usernameInputRef}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div
                        className="w-full max-w-2/3 flex-1 h-fit py-1 px-2 flex justify-center items-center rounded-lg bg-gray-100
                focus-within:outline-3 focus-within:outline-gray-300">
                        <input
                            form="signup-form"
                            className="w-full h-full flex-1 bg-transparent p-2 text-lg focus:outline-none"
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            ref={emailInputRef}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div
                        className="w-full max-w-2/3 flex-1 h-fit py-1 px-2 flex justify-center items-center rounded-lg bg-gray-100
                focus-within:outline-3 focus-within:outline-gray-300">
                        <input
                            form="signup-form"
                            className="w-full h-full flex-1 bg-transparent p-2 text-lg focus:outline-none"
                            placeholder="Password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            ref={passwordInputRef}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div
                        className="w-full max-w-2/3 flex-1 h-fit py-1 px-2 flex justify-center items-center rounded-lg bg-gray-100
                focus-within:outline-3 focus-within:outline-gray-300">
                        <input
                            form="signup-form"
                            className="w-full h-full flex-1 bg-transparent p-2 text-lg focus:outline-none"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            ref={confirmPasswordInputRef}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="w-full max-w-2/3 flex-1 h-fit py-2 flex flex-col justify-center items-center gap-2">
                    <div className="text-red-500 text-sm font-roboto p-1 text-center">
                        {error}
                    </div>

                    <button
                        form="signup-form"
                        className="w-full py-3 h-fit flex justify-center items-center cursor-pointer
                        rounded-lg bg-usc-cardinal-red text-white text-xl font-bold font-roboto
                        hover:bg-usc-cardinal-light transition-colors duration-100
                        active:bg-usc-cardinal-dark"
                        type="submit">
                        Sign Up
                    </button>

                    <div className="text-gray-500 text-sm font-roboto p-1">
                        Already have an account?{" "}
                        <Link
                            href="/authenticate?type=login"
                            className="text-usc-cardinal-red font-bold">
                            Log in
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
}
