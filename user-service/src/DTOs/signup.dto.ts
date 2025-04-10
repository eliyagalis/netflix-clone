import LoginRequestDTO from "./login.dto";

export default interface SignupRequestDTO extends LoginRequestDTO {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}