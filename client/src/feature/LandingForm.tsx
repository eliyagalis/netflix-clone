import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailFormData, emailValidationSchema } from "../schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../components/shared/CustomInput";
import { strings } from "../data/strings";
import Button from "../components/shared/Button";
import { colors } from "../data/colors";
import { typography } from "../data/typography";

const LandingForm = () => {
  const navigate = useNavigate();
  const [hasBlurred, setHasBlurred] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailValidationSchema),
    mode: "onChange",
  });

  const {
    onBlur,
    ...emailFieldProps
  } = register("email");

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    setHasBlurred(true);
    await trigger("email");
  };

  const onSubmit = (data: EmailFormData) => {
    console.log("Success", data);
    // Logic
    navigate("/signup");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap justify-center items-start gap-x-2 mb-10"
    >
      <div className="relative flex-1 min-w-60 max-w-120 basis-full sm:basis-auto pb-2">
        <CustomInput
          placeholder="Email address"
          rounded
          error={hasBlurred ? errors.email?.message : undefined}
          success={hasBlurred && !errors.email}
          onBlur={handleBlur}
          {...emailFieldProps}
        />
      </div>

      <div className="flex-grow-0 flex-shrink-0 w-auto basis-full sm:basis-auto">
        <Button color={colors.primary} rounded type="submit" fontSize={typography.small} className="btn border-none h-auto px-6 py-4 w-full sm:w-auto max-w-120">
          <div className={`text-[${colors.primary.text}] flex items-center gap-2`}>
            {strings.landing.form.button}
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </Button>
      </div>
    </form>
  );
};

export default LandingForm;
