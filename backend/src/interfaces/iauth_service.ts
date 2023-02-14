import { AuthDto } from "../dtos/auth/auth_dto";
import { LoginRequestDto } from "../dtos/auth/login_request_dto";

export interface IAuthService {
  loginUser(loginRequestDto: LoginRequestDto): Promise<AuthDto | undefined>;
}
