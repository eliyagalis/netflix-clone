import React from "react";

type CollapseQuestionProps = {
    title: string;
    subtitle1: string;
    subtitle2?: string;
}

const CollapseQuestion:React.FC<CollapseQuestionProps> = ({title, subtitle1, subtitle2}) => {

    return (
        <div>
            <div className="collapse bg-[rgb(45,45,45)] rounded-2xl my-4 border-0 hover:bg-[rgb(60,60,60)] transition-all duration-300 collapse-plus">
                <input type="checkbox" />
                <div className="collapse-title p-5 text-xl font-semibold border-2 rounded-2xl border-[rgb(70,70,70)] text-white duration-300">
                    {title}
                </div>
                
                <div className="collapse-content text-xl rounded-t-full">
                    <div className="p-4">
                        {subtitle1}
                        {subtitle2 && 
                            <div>
                                <br />
                                {subtitle2}                    
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollapseQuestion