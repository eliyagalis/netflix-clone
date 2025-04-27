import React, { useState } from 'react';
import { typography } from '../../data/typography';
import { strings } from '../../data/strings';
import { colors } from '../../data/colors';
import Button from '../../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import PlanformCard from '../../components/planform-page/PlanformCard';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setPlan } from '../../store/slices/plansSubSlices';
import { nextStep } from '../../store/slices/loginSteps';


const Planform = () => {

    const [selectedPlan, setSelectedPlan] = useState<string>(
        "Premium"
    );

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const step = useAppSelector((state) => state.step);

    const validPlans: string[] = [
        strings.signup.plans.planform.basic.title,
        strings.signup.plans.planform.standard.title,
        strings.signup.plans.planform.premium.title
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validPlans.includes(selectedPlan)) {
            dispatch(setPlan(selectedPlan));
            dispatch(nextStep());
            navigate('/signup/paymentPicker');
        }
    };

    const plans = [
        strings.signup.plans.planform.basic,
        strings.signup.plans.planform.standard,
        strings.signup.plans.planform.premium
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[560px] md:max-w-[1100px]"
        >
            <h3 className={`${typography.xxsmall} font-medium mt-3`}>
                STEP {step.step} OF 3
            </h3>
            <h1 className={`${typography.large} font-semibold my-2`}>
                Choose the plan that’s right for you
            </h1>

            <PlanformCard
                plans={plans}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
            />

            {Object.values(strings.signup.plans.note).map((n) => (
                <p
                    key={n}
                    className={`${typography.xxsmall} my-2 ${colors.text.lightGray}`}
                >
                    {n}
                </p>
            ))}

            <div className="w-full flex">
                <Button type="submit" className={`${typography.large} w-full max-w-100 h-16 my-6 mx-auto`}>
                    Next
                </Button>
            </div>
        </form>
    );
};

export default Planform;
