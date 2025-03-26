import CustomInput from './CustomInput'
import RoundedButton from './RoundedButton'

const LandingForm = () => {
    return (
        <form className="w-full flex flex-wrap justify-center items-start gap-x-2 mt-1 mb-10">
            <div className="relative flex-1 min-w-60 max-w-120 basis-full sm:basis-auto pb-2">
                <CustomInput required placeholder="Email address" error="Enter valid email address" rounded />
            </div>

            <div className="flex-grow-0 flex-shrink-0 w-auto basis-full sm:basis-auto">
                <RoundedButton
                    link={"/signup"}
                    additional="text-2xl h-auto px-6 py-4 text-white w-full sm:w-auto max-w-120"
                >
                    Get Started
                    <i className="fa-solid fa-chevron-right"></i>
                </RoundedButton>
            </div>
        </form>
    )
}

export default LandingForm