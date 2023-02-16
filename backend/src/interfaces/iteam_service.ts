import { TeamCreateDto } from "../dtos/team/team_create_dto";
import { TeamDto } from "../dtos/team/team_dto";
import { TeamUpdateDto } from "../dtos/team/team_update_dto";
import { UserDto } from "../dtos/user/user_dto";
import { ITeam } from "../models/interface_model/team_interface_model";

export interface ITeamService {
  addTeam(teamCreateDto: TeamCreateDto): Promise<TeamDto | undefined>;
  addMember(id: string, memberId: string): Promise<TeamDto | undefined>;
  getAllTeam(): Promise<TeamDto[] | undefined>;
  getAllLeader(): Promise<UserDto[] | undefined>;
  getAllMemberByTeamId(teamId: string): Promise<UserDto[] | undefined>;
  updateTeamName(id: string, teamName: string): Promise<TeamDto | undefined>;
  updateTeamLeader(
    id: string,
    teamLeaderId: string
  ): Promise<TeamDto | undefined>;
  removeMember(id: string, memberId: string): Promise<TeamDto | undefined>;
  updateTeam(
    id: string,
    teamUpdateDto: TeamUpdateDto
  ): Promise<TeamDto | undefined>;
  deleteTeam(id: string): Promise<ITeam | undefined>;
}
