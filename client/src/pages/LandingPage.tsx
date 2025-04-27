import CollapseQuestion from "../components/landing-page/CollapseQuestion";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Button from "../components/shared/Button";
import { seo } from "../seo/helmetStrings";
import HelmetHandler from "../components/shared/HelmetHandler";
import { strings } from "../data/strings";
import LandingForm from "../feature/landing/LandingForm";
import Typography from "../components/shared/Typography";
import { typography } from "../data/typography";
import LandingBackground from "../components/landing-page/LandingBackground";
import LandingPoster from "../components/landing-page/LandingPoster";
import PlanCard from "../components/landing-page/PlanCard";
import ReasonsCard from "../components/landing-page/ReasonsCard";
import { colors } from "../data/colors";
import LandingCarouselFeature from "../feature/landing/LandingCarouselFeature";

const LandingPage = () => {

    return (
        <div className={`${colors.background.darkGray} text-white w-full min-h-screen`}>
            <HelmetHandler page={seo.landing} />
            
            <div className="relative max-w-460 mx-auto">
                <Header isSwitch>
                    <Button navLink={strings.landing.header.login.link} color={colors.buttons.secondary} rounded>
                        {strings.landing.header.login.text}
                    </Button>
                </Header>
            </div>

            <LandingBackground />
            <LandingPoster />

            <div className="relative z-50 w-8/10 max-w-350 mx-auto">
                <Typography className="font-bold" size={typography.large}>{strings.landing.carousel.headline}</Typography>
                
                <LandingCarouselFeature />

                <Typography className="font-medium" size={typography.medium}>{strings.landing.plans.headline}</Typography>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {strings.landing.plans.cards.map((card) => (
                        <PlanCard key={card.id} title={card.title} subtitle={card.subtitle} type={card.id as 1 | 2 | 3 } bulletPoints={card.bulletPoints} price={card.price} navigate="/signup"/>
                    ))}
                </div>
                <br />

                <Typography className="font-bold" size={typography.large}>{strings.landing.reasons.headline}</Typography>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    {strings.landing.reasons.cards.map((card) => (
                        <ReasonsCard key={card.id} title={card.title} subtitle={card.subtitle} type={card.id as 1 | 2 | 3 | 4 } />
                    ))}
                </div>
                <br />

                <Typography className="my-3 font-bold" size={typography.large}>{strings.landing.faq.headline}</Typography>
                <>
                    {strings.landing.faq.collapse.map((c) => (
                        <CollapseQuestion key={c.id} title={c.title} subtitle1={c.subtitle1} subtitle2={c?.subtitle2} />
                    ))}
                </>
                <br />

                <Typography className="my-3 text-center" size={typography.small}>
                    {strings.landing.poster.inputText}
                </Typography>
                <LandingForm />
            </div>
            <Footer className="w-9/10 mx-auto"/>
        </div>
    )
}

export default LandingPage