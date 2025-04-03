import { useState } from "react";
import CustomInput from "../components/shared/CustomInput";
import z from "zod";
import { useNavigate } from "react-router-dom";


const LandingForm = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const emailSchema = z.string().email("Enter a valid email address");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = emailSchema.safeParse(email);

        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        setError("");
        navigate("/signup");
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="w-full flex flex-wrap justify-center items-start gap-x-2 mb-10"
        >
            <div className="relative flex-1 min-w-60 max-w-120 basis-full sm:basis-auto pb-2">
                <CustomInput
                    placeholder="Email address"
                    error="Invalid email"
                    rounded
                    data={email}
                    setData={setEmail}
                />
            </div>

            <div className="flex-grow-0 flex-shrink-0 w-auto basis-full sm:basis-auto">
                <button type="submit" className="btn border-none rounded-full bg-[rgb(229,9,20)] text-2xl h-auto px-6 py-4 text-white w-full sm:w-auto max-w-120 shadow hover:bg-[rgb(200,0,10)]">
                    Get Started
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </form>
    );
};

export default LandingForm;
