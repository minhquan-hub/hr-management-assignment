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

      const teamLeaderDto = await this.getTeamLeader(team.teamLeaderId);

      const teamDto: TeamDto = {
        id: team._id,
        name: team.name,
        member: team.member,
        teamLeader: teamLeaderDto,
      };

      return teamDto;
    } catch (error) {
      console.error(error);
      logger.error(`The error is at addTeam method of TeamService: ${error}`);
    }
  }

  addMember(memberId: string): Promise<TeamDto | undefined> {
    throw new Error("Method not implemented.");
  }

  async getAllTeam(): Promise<TeamDto[] | undefined> {
    try {
      const teamList = await Team.find({ isDeleted: false });
      let teamDtoList: TeamDto[] = [];

      for (let team of teamList) {
        const { _id, name, member, teamLeaderId } = team;

        const teamLeaderDto = await this.getTeamLeader(teamLeaderId);

        teamDtoList.push({
          id: _id,
          name: name,
          member: member,
          teamLeader: teamLeaderDto,
        });
      }

      return teamDtoList;
    } catch (error) {
      console.error(error);
      logger.error(
        `The error is at getAllTeam method of TeamService: ${error}`
      );
    }
  }

  async updateTeamName(
    id: string,
    teamName: string
  ): Promise<TeamDto | undefined> {
    try {
      const option = { new: true };
      const team = await Team.findByIdAndUpdate(id, { name: teamName }, option);
      if (team) {
        const { _id, name, member, teamLeaderId } = team;
        const teamLeaderDto = await this.getTeamLeader(teamLeaderId);
        const teamDto: TeamDto = {
          id: _id,
          name: name,
          member: member,
          teamLeader: teamLeaderDto,
        };
        return teamDto;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      logger.error(
        `The error is at updateTeamName method of TeamService: ${error}`
      );
    }
  }

  async updateTeamLeader(
    id: string,
    teamLeaderId: string
  ): Promise<TeamDto | undefined> {
    try {
      const option = { new: true };
      const team = await Team.findByIdAndUpdate(
        id,
        { teamLeaderId: teamLeaderId },
        option
      );
      if (team) {
        const { _id, name, member, teamLeaderId } = team;
        const teamLeaderDto = await this.getTeamLeader(teamLeaderId);
        const teamDto: TeamDto = {
          id: _id,
          name: name,
          member: member,
          teamLeader: teamLeaderDto,
        };
        return teamDto;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      logger.error(
        `The error is at updateTeamLeader method of TeamService: ${error}`
      );
    }
  }

  removeMember(id: string, memberId: string): Promise<TeamDto | undefined> {
    throw new Error("Method not implemented.");
  }

  updateTeam(
    id: string,
    teamUpdateDto: TeamUpdateDto
  ): Promise<TeamDto | undefined> {
    throw new Error("Method not implemented.");
  }

  async deleteTeam(id: string): Promise<ITeam | undefined> {
    try {
      const option = { new: true };

      const teamDelete = await Team.findByIdAndUpdate(
        id,
        {
          $set: { isDeleted: true },
        },
        option
      );

      if (teamDelete === null) {
        return undefined;
      }

      return teamDelete;
    } catch (error) {
      console.log("Error: " + error);
      logger.error(
        `The error is at deleteTeam method of TeamService: ${error}`
      );
      return undefined;
    }
  }

  async getTeamLeader(id: string): Promise<UserDto> {
    const teamLeader = await User.findById(id).catch(() => undefined);

    const teamLeaderDto: UserDto = {
      id: teamLeader?._id,
      fullName: teamLeader?.fullName,
      userName: teamLeader?.userName,
      age: teamLeader?.age,
      gender: teamLeader?.gender,
      phone: teamLeader?.phone,
      email: teamLeader?.email,
      city: teamLeader?.city,
    };

    return teamLeaderDto;
  }
}
