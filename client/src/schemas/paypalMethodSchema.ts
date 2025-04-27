import { z } from "zod";

export const agreeToTermsPaypalDetails = z.object({
    agreeToTerms:z.boolean().refine(val=>val===true,{message:"To continue you must read and agree"}) //z.literal(true, {
                                                                                                    //     errorMap: () => ({ message: "To continue you must read and agree" }),
  });
 export type PaypalOptionFormData = z.infer<typeof agreeToTermsPaypalDetails>;