import { useState } from "react";
import CustomInput from "../components/shared/CustomInput";
import { useNavigate } from "react-router-dom";
import { EmailFormData, EmailFormData2, emailValidationSchema, emailValidationSchema2 } from "../schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { strings } from "../data/strings";

const LandingForm = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    }= useForm<EmailFormData2>({
        resolver: zodResolver(emailValidationSchema2),
        mode: "onBlur",
        reValidateMode: "onChange",
    })

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!validation(email)) return;
    //     navigate("/signup");
    // };

    const validation = (value: string) => {
        const result = emailValidationSchema.safeParse(value);
        if (!result.success) {
            setError(result.error.errors[0].message);
            return false;
        }
        setError("");
        return true;
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (touched) validation(e.target.value);
    }

    const onSubmit = (data: EmailFormData2)=> {

    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="w-full flex flex-wrap justify-center items-start gap-x-2 mb-10"
        >
            <div className="relative flex-1 min-w-60 max-w-120 basis-full sm:basis-auto pb-2">
                <CustomInput
                    placeholder="Email address"
                    rounded
                    data={email}
                    error={error}
                    // onChange={handleValueChange}
                    // onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    //     setTouched(true);
                    //     validation(e.target.value);
                    // }} 
                    {...register("email")}
                />
            </div>

            <div className="flex-grow-0 flex-shrink-0 w-auto basis-full sm:basis-auto">
                <button type="submit" className="btn border-none rounded-full bg-[rgb(229,9,20)] text-2xl h-auto px-6 py-4 text-white w-full sm:w-auto max-w-120 shadow hover:bg-[rgb(200,0,10)]">
                    {strings.landing.form.button}
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </form>
    );
};

export default LandingForm;
