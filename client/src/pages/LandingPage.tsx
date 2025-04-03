import CollapseQuestion from "../components/landing-page/CollapseQuestion";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import RoundedButton from "../components/shared/RoundedButton";
import { seo } from "../seo/helmetStrings";
import HelmetHandler from "../components/shared/HelmetHandler";
import { strings } from "../data/strings";
import LandingForm from "../feature/LandingForm";
import Typography from "../components/shared/Typography";
import { sizes } from "../data/sizes";
import LandingBackground from "../components/landing-page/LandingBackground";
import LandingPoster from "../components/landing-page/LandingPoster";
import CarouselFeature from "../components/landing-page/CarouselFeature";
import PlanCard from "../components/landing-page/PlanCard";
import ReasonsCard from "../components/landing-page/ReasonsCard";

const LandingPage = () => {

    return (
        <div className={`bg-[rgb(15,15,15)] w-full min-h-screen`}>
            <HelmetHandler page={seo.landing} />
            <div className="relative max-w-460 mx-auto">
                <Header>
                    <RoundedButton color="(rgb(255,255,255))" hover="(rgb(206,206,206))" navLink="/login" rounded>
                        Sign In
                    </RoundedButton>
                </Header>
            </div>


            <LandingBackground />
            <LandingPoster />

            <div className="relative z-50 w-8/10 max-w-350 mx-auto">

                <Typography className="font-bold text-white" size={sizes.large}>{strings.landing.carousel.headline}</Typography>
                <CarouselFeature />

                <Typography className="font-medium text-white" size={sizes.medium}>{strings.landing.plans.headline}</Typography>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {strings.landing.plans.cards.map((card) => (
                        <PlanCard key={card.id} title={card.title} subtitle={card.subtitle} type={card.id as 1 | 2 | 3} bulletPoints={card.bulletPoints} price={card.price} navigate="/signup"/>
                    ))}
                </div>
                <br />

                <Typography className="font-bold text-white" size={sizes.large}>{strings.landing.reasons.headline}</Typography>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    {strings.landing.reasons.cards.map((card) => (
                        <ReasonsCard key={card.id} title={card.title} subtitle={card.subtitle} type={card.id as 1 | 2 | 3 | 4 } />
                    ))}
                </div>
                <br />

                <Typography className="my-3 font-bold text-white" size={sizes.large}>{strings.landing.faq.headline}</Typography>
                <>
                    {strings.landing.faq.collapse.map((c) => (
                        <CollapseQuestion key={c.id} title={c.title} subtitle1={c.subtitle1} subtitle2={c?.subtitle2} />
                    ))}
                </>
                <br />

                <Typography className=" my-3 text-center text-white" size={sizes.small}>
                    {strings.landing.poster.inputText}
                </Typography>
                <LandingForm />
                <br />
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage