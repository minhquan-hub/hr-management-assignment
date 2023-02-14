import { TeamDto } from "./../dtos/team/team_dto";
import { injectable } from "inversify";
import { TeamCreateDto } from "../dtos/team/team_create_dto";
import { TeamUpdateDto } from "../dtos/team/team_update_dto";
import { ITeamService } from "../interfaces/iteam_service";
import { ITeam } from "../models/interface_model/team_interface_model";
import Team from "../models/team_model";
import logger from "../ultils/logger";
import User from "../models/user_model";
import { UserDto } from "../dtos/user/user_dto";

@injectable()
export default class TeamService implements ITeamService {
  async addTeam(teamCreateDto: TeamCreateDto): Promise<TeamDto | undefined> {
    try {
      const { name, member, teamLeaderId } = teamCreateDto;
      const newTeam: ITeam = new Team({ name, member, teamLeaderId });

      const team: ITeam = await newTeam.save();

      const teamLeader = await User.findById(team.teamLeader).catch(
        () => undefined
      );

      const userDto: UserDto = {
        id: teamLeader?._id,
        fullName: teamLeader?.fullName,
        userName: teamLeader?.userName,
        age: teamLeader?.age,
        gender: teamLeader?.gender,
        phone: teamLeader?.phone,
        email: teamLeader?.email,
        city: teamLeader?.city,
      };

      const teamDto: TeamDto = {
        id: team._id,
        name: team.name,
        member: team.member,
        teamLeader: userDto,
      };

      return teamDto;
    } catch (error) {
      console.error(error);
      logger.error(`The error is at addTeam method of TeamService: ${error}`);
    }
  }
  updateTeam(
    id: string,
    teamUpdateDto: TeamUpdateDto
  ): Promise<TeamDto | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteTeam(id: string): Promise<ITeam | undefined> {
    throw new Error("Method not implemented.");
  }
}
