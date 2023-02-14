import { TeamCreateDto } from "../dtos/team/team_create_dto";
import { TeamDto } from "../dtos/team/team_dto";
import { TeamUpdateDto } from "../dtos/team/team_update_dto";
import { ITeam } from "../models/interface_model/team_interface_model";

export interface ITeamService {
  addTeam(teamCreateDto: TeamCreateDto): Promise<TeamDto | undefined>;
  updateTeam(
    id: string,
    teamUpdateDto: TeamUpdateDto
  ): Promise<TeamDto | undefined>;
  deleteTeam(id: string): Promise<ITeam | undefined>;
}
