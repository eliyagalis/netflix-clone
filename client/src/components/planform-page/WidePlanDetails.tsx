import { typography } from "../../data/typography";
import { Plan } from "./PlanformCard";

const WidePlanDetails: React.FC<{ plan: Plan }> = ({ plan }) => (
    <ul className="text-gray-600 list">
        <li className="list-row py-1">
            <div className="list-col-grow">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Monthly price</p>
                <p className={`font-medium ${typography.xsmall}`}>{plan.monthlyPrice}</p>
            </div>
        </li>
        <li className="list-row py-1">
            <div className="list-col-grow">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Video and sound quality</p>
                <p className={`font-medium ${typography.xsmall}`}>{plan.quality}</p>
            </div>
        </li>
        <li className="list-row py-1">
            <div className="list-col-grow">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Resolution</p>
                <p className={`font-medium ${typography.xsmall}`}>{plan.resolution}</p>
            </div>
        </li>
        {plan.spatialAudio && (
            <li className="list-row py-1">
                <div className="list-col-grow">
                    <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Spatial Audio</p>
                    <p className={`font-medium ${typography.xsmall}`}>Included</p>
                </div>
            </li>
        )}
        <li className="list-row py-1">
            <div className="list-col-grow">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Supported devices</p>
                <p className={`font-medium ${typography.xsmall}`}>{plan.supportedDevices}</p>
            </div>
        </li>
        <li className="list-row py-1">
            <div className="list-col-grow">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Devices your household can watch at the same time</p>
                <p className={`font-medium ${typography.xsmall}`}>{plan.sameTimeDevices}</p>
            </div>
        </li>
        <li className="list-row py-1">
            <div className="list-col-grow">
                <p className={`font-medium ${typography.xxsmall} text-[#767676]`}>Download devices</p>
                <p className={`font-medium ${typography.xsmall}`}>{plan.downloadDevices}</p>
            </div>
        </li>
    </ul>
);

export default WidePlanDetails;