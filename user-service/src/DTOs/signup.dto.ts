import LoginRequestDTO from "./login.dto";

export default interface SignupRequestDTO extends LoginRequestDTO {
  name: string;
}