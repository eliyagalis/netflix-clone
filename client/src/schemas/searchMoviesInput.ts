import { z } from "zod";

export const searchMoviesSchema = z.object({
    textInput:z.string().min(1, { message:""}).refine((val)=> !/[<>'";]/.test(val),{message:""})
  });
 export type searchMoviesFormData = z.infer<typeof searchMoviesSchema>;