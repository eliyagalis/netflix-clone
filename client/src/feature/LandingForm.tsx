import { useNavigate } from "react-router-dom";
import { EmailFormData, emailValidationSchema } from "../schemas/authSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../components/shared/CustomInput";
import { strings } from "../data/strings";
import Button from "../components/shared/Button";
import { colors } from "../data/colors";
import { typography } from "../data/typography";

const LandingForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailValidationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: EmailFormData) => {
    console.log("Success", data);
    // Logic
    navigate("/signup/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap justify-center items-start gap-x-2 mb-10"
    >
      <div className="relative flex-1 min-w-60 max-w-120 basis-full sm:basis-auto pb-5">
        <CustomInput
          type="email"
          placeholder="Email address"
          rounded
          className="blackInput"
          error={errors.email?.message}
          success={touchedFields.email && !errors.email &&  !!watch("email")}
          {...register("email")}
        />
      </div>

      <div className="flex-grow-0 flex-shrink-0 w-auto basis-full sm:basis-auto">
        <Button
          rounded
          type="submit"
          fontSize={typography.small}
          className="btn border-none h-auto px-6 py-4 w-full sm:w-auto max-w-120"
        >
          <div className={`text-[${colors.buttons.primary.text}] flex items-center gap-2`}>
            {strings.landing.form.button}
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </Button>
      </div>
    </form>
  );
};

export default LandingForm;
