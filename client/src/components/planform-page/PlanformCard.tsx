import React, { useState } from "react";
import WidePlanDetails from "./WidePlanDetails";
import NarrowPlanDetails from "./NarrowPlanDetails";

export type Plan = {
    title: string;
    subtitle: string;
    monthlyPrice: string;
    quality: string;
    resolution: string;
    supportedDevices: string;
    sameTimeDevices: number;
    downloadDevices: number;
    spatialAudio?: boolean;
    isMostPopular?: boolean;
};

type PlanformCardProps = {
    plans: Plan[];
    selectedPlan: string;
    setSelectedPlan: (value: string) => void;
};

const PlanformCard: React.FC<PlanformCardProps> = ({
    plans,
    selectedPlan,
    setSelectedPlan
 }) => {

    return (
        <div className="w-full mx-auto">
            <div className="grid grid-cols-3 gap-2 pb-2 relative">
                {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.title;

                    return (
                        <div key={plan.title} className="flex relative">
                            {plan.isMostPopular && (
                                <div className="absolute -top-0 w-full text-center left-1/2 -translate-x-1/2 z-10">
                                    <div className={`text-[12px] ${selectedPlan === plan.title ? "bg-red-500" : "bg-[#000000b3]"} 
                                        text-white px-3 py-1 rounded-t-xl font-semibold `}>
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <label
                                htmlFor={plan.title}
                                className={`flex-1 ${plan.isMostPopular ? "pt-6" : "mt-6 "} rounded-xl border
                                    cursor-pointer transition relative h-auto
                                    ${isSelected ? "border-gray-400 shadow-xl" : "border-[#80808066]"}`}
                            >

                                <div className={
                                    `hidden md:block justify-between items-center pb-6 m-2 relative
                                    rounded-xl bg-plan-${plan.title.toLowerCase()} text-white
                                    p-3
                                    `}>
                                    <div>
                                        <h2 className="text-xl font-semibold">{plan.title}</h2>
                                        <p className="text-sm font-semibold">{plan.subtitle}</p>
                                    </div>

                                    <input type="radio" id={plan.title} name="plan"
                                        className={`hidden`} checked={isSelected}
                                        onChange={() => setSelectedPlan(plan.title)}
                                    />

                                    {selectedPlan === plan.title && (
                                        <i className="fa-solid fa-check absolute w-4 h-4 bottom-3 right-3
                                            transition-all duration-300 border-none shadow-none
                                            text-black text-xs bg-white rounded-xl
                                            flex items-center justify-center leading-none text-[10px] p-1"
                                        ></i>
                                    )}
                                </div>

                                <div className={
                                    `block md:hidden justify-between items-center pb-6 w-[100%] relative
                                    ${plan.isMostPopular ? "rounded-b-xl" : "rounded-xl"} 
                                    ${selectedPlan === plan.title ? `bg-plan-${plan.title.toLowerCase()} text-white` : `text-black`} 
                                    p-3
                                    `}>
                                    <div>
                                        <h2 className="text-xl font-semibold">{plan.title}</h2>
                                        <p className="text-sm font-semibold">{plan.subtitle}</p>
                                    </div>

                                    <input
                                        type="radio"
                                        id={plan.title}
                                        name="plan"
                                        className={`hidden`}
                                        checked={isSelected}
                                        onChange={() => setSelectedPlan(plan.title)}
                                    />

                                    {selectedPlan === plan.title && (
                                        <i className="fa-solid fa-check absolute w-4 h-4 bottom-3 right-3
                                        transition-all duration-300 border-none shadow-none
                                      text-black text-xs bg-white rounded-xl
                                        flex items-center justify-center leading-none text-[10px] p-1"
                                        ></i>
                                    )}
                                </div>

                                <div className="hidden md:block mt-4">
                                    <WidePlanDetails plan={plan} />
                                </div>
                            </label>
                        </div>

                    );
                })}
            </div>

            <div className="block md:hidden w-full my-5">
                <div>
                    {plans && <NarrowPlanDetails plan={plans.find(p => p.title === selectedPlan)!} />}
                </div>
            </div>
        </div>
    );
};

export default PlanformCard;
