import { UserDto } from "./../user/user_dto";
export interface TeamDto {
  id: string;
  name: string;
  member: string[];
  teamLeader: UserDto;
}
