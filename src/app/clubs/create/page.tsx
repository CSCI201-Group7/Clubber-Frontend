"use client";

import { getToken, getUser } from "@/utilities/Fetcher";
import NavBar from "@/components/NavBar";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

enum OrganizationType {
    Academic = "Academic",
    Cultural = "Cultural",
    Sports = "Sports",
    Religious = "Religious",
    Political = "Political",
    Social = "Social",
    Recreational = "Recreational",
    Professional = "Professional",
    Hobby = "Hobby",
    Other = "Other",
}

export default function CreateClub() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [logofilename, setLogofilename] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const logoUploadRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const [onLogoHover, setOnLogoHover] = useState<boolean>(false);

    useEffect(() => {
        getToken().then((token) => {
            if (token) {
                setToken(token);
                getUser().then((user) => {
                    if (user) {
                        setUser(user);
                    }
                });
            }
        });
    }, []);

    if (!user) {
        return <Unauthenticated />;
    }

    const handleSubmit = async (formData: FormData) => {
        const name = formData.get("name");
        const description = formData.get("description");
        const type = formData.get("type");
        const contactEmail = formData.get("contactEmail");
        const location = formData.get("location");
        const website = formData.get("website");
        const linkedin = formData.get("linkedin");
        const instagram = formData.get("instagram");
        const discord = formData.get("discord");
        const logo = formData.get("logo");

        const link = {
            website: website as string,
            linkedin: linkedin as string,
            instagram: instagram as string,
            discord: discord as string,
        };

        const form = new FormData();
        form.append("name", name as string);
        form.append("description", description as string);
        form.append("type", type as string);
        form.append("contactEmail", contactEmail as string);
        form.append("location", location as string);
        form.append("links", JSON.stringify(link));
        form.append("logo", logo as File);
        form.append("logoFilename", logofilename as string);

        try {
            const response = await axios.post(
                "http://localhost:8080/organizations",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token,
                    },
                }
            );
            console.log(response);
            router.push("/clubs");
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setLogofilename(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-start bg-neutral-100 relative gap-10 overflow-y-auto">
            <NavBar displayProfileCard={true} />
            <div
                className="w-full h-fit max-w-1/2 bg-white flex flex-col items-start justify-start 
                py-2 px-4 border-0.5 border-usc-cardinal-light rounded-lg gap-4 relative mb-10">
                <div className="w-full h-fit text-usc-cardinal-dark text-[42px] font-bold px-4 py-2">
                    Create New Club
                </div>

                <div className="w-5/6 h-0.5 bg-gray-300 place-self-center" />

                <Form
                    action={handleSubmit}
                    className="w-full h-fit flex flex-col items-start justify-start gap-4
                    px-4 py-2"
                    id="create-club-form">
                    <div className="w-full h-fit flex flex-col items-start justify-start gap-5">
                        <div className="w-full h-fit text-gray-900 text-3xl font-bold">
                            Basic Information
                        </div>

                        <div className="w-full h-fit flex flex-col items-start justify-start gap-4 bg-gray-100 rounded-lg p-4">
                            <div className="Name w-full h-fit flex flex-row items-center justify-between gap-2">
                                <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                    Club Name
                                </div>

                                <div
                                    className="w-fit max-w-1/2 h-fit flex flex-row items-center justify-end gap-2
                                    px-3 py-1.5 border-0.5 border-gray-300 rounded-lg focus-within:outline-usc-gold-light
                                    focus-within:outline-2">
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        title="Club Name"
                                        form="create-club-form"
                                        className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none"
                                        placeholder="Club Name"
                                    />
                                </div>
                            </div>

                            <div className="ContactEmail w-full h-fit flex flex-row items-center justify-between gap-2">
                                <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                    Contact Email
                                </div>

                                <div
                                    className="w-fit max-w-2/3 h-fit flex flex-row items-center justify-end gap-2
                                    px-3 py-1.5 border-0.5 border-gray-300 rounded-lg focus-within:outline-usc-gold-light
                                    focus-within:outline-2">
                                    <input
                                        required
                                        type="email"
                                        name="contactEmail"
                                        title="Contact Email"
                                        form="create-club-form"
                                        className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none"
                                        placeholder="Contact Email"
                                    />
                                </div>
                            </div>

                            <div className="Type w-full h-fit flex flex-row items-center justify-between gap-2">
                                <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                    Type
                                </div>

                                <div className="w-full max-w-2/3 h-fit flex flex-row items-center justify-end gap-2">
                                    <select
                                        required
                                        name="type"
                                        title="Type"
                                        form="create-club-form"
                                        className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none bg-white border-0.5 border-gray-300 rounded-lg px-3 py-2 focus-within:border-usc-gold-light"
                                        defaultValue="">
                                        <option value="" disabled>
                                            Select Type
                                        </option>
                                        {Object.values(OrganizationType).map(
                                            (type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-fit text-gray-900 text-3xl font-bold">
                            Club Information
                        </div>

                        <div className="w-full h-fit flex flex-col items-start justify-start gap-4 bg-gray-100 rounded-lg p-4">
                            <div className="LogoUpload w-full h-fit flex flex-row justify-between items-center gap-4 relative">
                                <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                    Logo
                                </div>

                                <input
                                    type="file"
                                    name="logo"
                                    title="Logo"
                                    form="create-club-form"
                                    className="hidden"
                                    ref={logoUploadRef}
                                    onChange={handleLogoUpload}
                                    accept="image/*"
                                />

                                <div
                                    className="w-25 h-25 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer
                                hover:bg-gray-300 hover:outline-usc-gold-light hover:outline-3 relative"
                                    onClick={() => {
                                        logoUploadRef.current?.click();
                                    }}
                                    onMouseEnter={() => setOnLogoHover(true)}
                                    onMouseLeave={() => setOnLogoHover(false)}>
                                    {logoPreview && (
                                        <Image
                                            src={logoPreview}
                                            alt="Logo Preview"
                                            width={45}
                                            height={45}
                                            className="w-25 h-25 object-cover rounded-full"
                                        />
                                    )}
                                    {onLogoHover && (
                                        <div className="absolute text-gray-700 text-lg font-bold place-self-center z-50">
                                            Upload
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="Description w-full h-fit flex flex-col items-start justify-start gap-2">
                                <div className="w-full h-fit text-gray-900 text-2xl font-bold">
                                    Description
                                </div>

                                <div
                                    className="w-full h-fit flex flex-row items-center justify-start gap-2 
                                focus-within:outline-usc-gold-light focus-within:outline-2 py-1 px-2 rounded-lg">
                                    <textarea
                                        required
                                        name="description"
                                        title="Description"
                                        form="create-club-form"
                                        className="w-full h-fit min-h-20 text-gray-900 text-xl focus:outline-none mx0.5
                                        resize-y overflow-y-auto"
                                        placeholder="Description"
                                    />
                                </div>
                            </div>

                            <div className="Location w-full h-fit flex flex-row items-center justify-between gap-2">
                                <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                    Location
                                </div>

                                <div
                                    className="w-fit max-w-2/3 h-fit flex flex-row items-center justify-end gap-2
                                    px-3 py-1.5 border-0.5 border-gray-300 rounded-lg focus-within:outline-usc-gold-light
                                    focus-within:outline-2">
                                    <input
                                        required
                                        type="text"
                                        name="location"
                                        title="Location"
                                        form="create-club-form"
                                        className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none"
                                        placeholder="Location"
                                    />
                                </div>
                            </div>

                            <div className="Links w-full h-fit flex flex-col items-start justify-start gap-2">
                                <div className="w-full h-fit text-gray-900 text-2xl font-bold">
                                    Links
                                </div>

                                <div className="w-full h-fit flex flex-col items-start justify-start gap-2 pl-8">
                                    <div className="Website w-full h-fit flex flex-row items-center justify-between gap-2">
                                        <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                            Website
                                        </div>

                                        <div
                                            className="w-fit max-w-2/3 h-fit flex flex-row items-center justify-end gap-2
                                            focus-within:outline-usc-gold-light focus-within:outline-2 py-1 px-2 rounded-lg">
                                            <input
                                                type="text"
                                                name="website"
                                                title="Website"
                                                form="create-club-form"
                                                className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none"
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>

                                    <div className="Facebook w-full h-fit flex flex-row items-center justify-between gap-2">
                                        <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                            Linkedin
                                        </div>

                                        <div
                                            className="w-fit max-w-2/3 h-fit flex flex-row items-center justify-end gap-2
                                            focus-within:outline-usc-gold-light focus-within:outline-2 py-1 px-2 rounded-lg">
                                            <input
                                                type="text"
                                                name="linkedin"
                                                title="Linkedin"
                                                form="create-club-form"
                                                className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none"
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>

                                    <div className="Instagram w-full h-fit flex flex-row items-center justify-between gap-2">
                                        <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                            Instagram
                                        </div>

                                        <div
                                            className="w-fit max-w-2/3 h-fit flex flex-row items-center justify-end gap-2
                                            focus-within:outline-usc-gold-light focus-within:outline-2 py-1 px-2 rounded-lg">
                                            <input
                                                type="text"
                                                name="instagram"
                                                title="Instagram"
                                                form="create-club-form"
                                                className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none"
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>

                                    <div className="Discord w-full h-fit flex flex-row items-center justify-between gap-2">
                                        <div className="w-full max-w-1/3 h-fit text-gray-900 text-2xl font-bold">
                                            Discord
                                        </div>

                                        <div
                                            className="w-fit max-w-2/3 h-fit flex flex-row items-center justify-end gap-2
                                            focus-within:outline-usc-gold-light focus-within:outline-2 py-1 px-2 rounded-lg">
                                            <input
                                                type="text"
                                                name="discord"
                                                title="Discord"
                                                form="create-club-form"
                                                className="w-fit h-fit text-gray-900 text-2xl text-right focus:outline-none"
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-fit bg-usc-cardinal-red text-white text-2xl font-bold py-2 px-4 rounded-lg
                            hover:bg-usc-cardinal-light active:bg-usc-cardinal-dark transition-all duration-300">
                            Create Club
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

function Unauthenticated() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            <NavBar displayProfileCard={false} />
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-usc-cardinal-dark text-4xl font-semibold">
                    You must be logged in to create a club
                </div>
            </div>
        </div>
    );
}
