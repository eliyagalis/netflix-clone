export interface IPlan {
    plan_name:string,
    price:number,
    billing_interval:'monthly'|'annual',
    description:string
}
export interface IFullPlan extends IPlan{
    id:string
}