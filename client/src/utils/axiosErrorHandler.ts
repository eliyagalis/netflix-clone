import axios from "axios";

export const getErrorMessage = (error: any): string => {
  const isAxiosError = error?.isAxiosError === true;

  if (isAxiosError) {
    return (
      (error.response?.data as { message?: string })?.message ||  
      error.message ||
      "An error occurred"
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
