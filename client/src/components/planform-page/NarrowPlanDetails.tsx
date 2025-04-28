import { typography } from "../../data/typography";
import { Plan } from "./PlanformCard";

const NarrowPlanDetails: React.FC<{ plan: Plan }> = ({ plan }) => {
    if (!plan) return null;

    return (
    <ul className="text-gray-600 list">
        <li className="list-row flex py-2 w-full">
            <div className="w-full flex justify-between flex-row items-center">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Monthly price</p>
                <p className={`font-medium ${typography.small}`}>{plan?.monthlyPrice}</p>
            </div>
        </li>
        <li className="list-row flex py-2 w-full">
            <div className="w-full flex justify-between flex-row items-center">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Video and sound quality</p>
                <p className={`font-medium ${typography.small}`}>{plan.quality}</p>
            </div>
        </li>
        <li className="list-row flex py-2 w-full">
            <div className="w-full flex justify-between flex-row items-center">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Resolution</p>
                <p className={`font-medium ${typography.small}`}>{plan.resolution}</p>
            </div>
        </li>
        {plan.spatialAudio && (
            <li className="list-row flex py-2 w-full">
                <div className="w-full flex justify-between flex-row items-center">
                    <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Spatial Audio</p>
                    <p className={`font-medium ${typography.small}`}>Included</p>
                </div>
            </li>
        )}
        <li className="list-row flex py-2 w-full">
            <div className="w-full flex justify-between flex-row items-center">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Supported devices</p>
                <p className={`font-medium ${typography.small}`}>{plan.supportedDevices}</p>
            </div>
        </li>
        <li className="list-row flex py-2 w-full">
            <div className="w-full flex justify-between flex-row items-center">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Devices your household can watch at the same time</p>
                <p className={`font-medium ${typography.small}`}>{plan.sameTimeDevices}</p>
            </div>
        </li>
        <li className="list-row flex py-2 w-full">
            <div className="w-full flex justify-between flex-row items-center">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Download devices</p>
                <p className={`font-medium ${typography.small}`}>{plan.downloadDevices}</p>
            </div>
        </li>
    </ul>
    )};

export default NarrowPlanDetails;