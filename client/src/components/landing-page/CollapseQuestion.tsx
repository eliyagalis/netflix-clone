import React, { Fragment } from "react";
import { sizes } from "../../data/sizes";

type CollapseQuestionProps = {
    title: string;
    subtitle1: string;
    subtitle2?: string;
}

const CollapseQuestion:React.FC<CollapseQuestionProps> = ({title, subtitle1, subtitle2}) => {

    return (
        <div>
            <div className="collapse rounded-2xl border-0 text-white collapse-plus">
                <input type="checkbox" />
                <div className="collapse-title bg-[rgb(39,39,39)] p-5 text-xl font-semibold border-2 rounded-2xl border-[rgb(48,48,48)] hover:bg-[rgb(45,45,45)] transition-all duration-300 ">
                    {title}
                </div>
                <div className={`my-1 collapse-content ${sizes.small} font-semibold rounded-2xl bg-[rgb(45,45,45)] transition-all duration-300 `}>
                    <div className="p-4">
                        {subtitle1}
                        {subtitle2 && 
                            <Fragment>
                            <br />
                            <br />
                                {subtitle2}
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollapseQuestion