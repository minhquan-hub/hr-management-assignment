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

  async addMember(id: string, memberId: string): Promise<TeamDto | undefined> {
    try {
      const team = await Team.findById(id, { isDeleted: false });
      if (!team) {
        logger.warn(
          `The warning is at addMember method of TeamService: Team with id ${id} not found`
        );
        throw new Error(`Team with id ${id} not found`);
      }
      const memberList = team?.member;

      memberList?.push(memberId);
      const teamDto = await this.customizeMemberAfterUpdate(
        team._id,
        memberList
      );

      return teamDto;
    } catch (error) {
      console.error(error);
      logger.error(`The error is at addMember method of TeamService: ${error}`);
    }
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

  async getAllLeader(): Promise<UserDto[] | undefined> {
    try {
      const leaderList = await User.find({
        isDeleted: false,
        role: "leader",
        status: "available",
      });

      let userDtoList: UserDto[] = [];

      if (!leaderList) {
        logger.warn(
          `The warning is at getAllLeader method of TeamService: All the leader is unavailable`
        );
        throw new Error(`All the leader is unavailable`);
      }

      for (let leader of leaderList) {
        const {
          _id,
          fullName,
          userName,
          age,
          gender,
          phone,
          email,
          city,
          role,
        } = leader;

        userDtoList.push({
          id: _id,
          fullName: fullName,
          userName: userName,
          age: age,
          gender: gender,
          phone: phone,
          email: email,
          city: city,
          role: role,
        });
      }
      return userDtoList;
    } catch (error) {
      console.error(error);
      logger.error(
        `The error is at getAllLeader method of TeamService: ${error}`
      );
    }
  }

  async getAllMemberByTeamId(teamId: string): Promise<UserDto[] | undefined> {
    try {
      let userDtoList: UserDto[] = [];
      const team = await Team.findById(teamId);
      if (!team) {
        logger.warn(
          `The warning is at getAllMemberByTeamId method of TeamService: TeamId with id ${teamId} not found`
        );
        throw new Error(`Team with teamId ${teamId} not found`);
      }

      const memberList = team.member;
      for (let member of memberList) {
        console.log(member);
        const user = await User.findById(member);

        const userDto: UserDto = {
          id: user?._id,
          fullName: user?.fullName,
          userName: user?.userName,
          age: user?.age,
          gender: user?.gender,
          phone: user?.phone,
          email: user?.email,
          city: user?.city,
          role: user?.role,
        };

        userDtoList.push(userDto);
      }

      return userDtoList;
    } catch (error) {
      console.error(error);
      logger.error(
        `The error is at getAllMemberByTeamId method of TeamService: ${error}`
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
      console.log(`updateTeamLeader: ${teamLeaderId}`);
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

  async removeMember(
    id: string,
    memberId: string
  ): Promise<TeamDto | undefined> {
    try {
      const team = await Team.findById(id, { isDeleted: false });
      if (!team) {
        logger.warn(
          `The warning is at addMember method of TeamService: Team with id ${id} not found`
        );
        throw new Error(`Team with id ${id} not found`);
      }

      const memberList = team?.member;
      const index = memberList.indexOf(memberId);
      memberList.splice(index, 1);

      const teamDto = await this.customizeMemberAfterUpdate(
        team._id,
        memberList
      );

      return teamDto;
    } catch (error) {
      console.error(error);
      logger.error(
        `The error is at removeMember method of TeamService: ${error}`
      );
    }
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
      role: teamLeader?.role,
    };

    return teamLeaderDto;
  }

  async customizeMemberAfterUpdate(
    id: string,
    memberList: string[]
  ): Promise<TeamDto> {
    const teamUpdate = await Team.findByIdAndUpdate(id, {
      member: memberList,
    });

    const teamAfterUpdate = await Team.findByIdAndUpdate(teamUpdate?._id);

    if (!teamAfterUpdate) {
      logger.warn(
        `The warning is at addMember method of TeamService: TeamUpdate with id ${id} not updated`
      );
      throw new Error(`Team with id ${id} not updated`);
    }

    const teamLeaderDto = await this.getTeamLeader(
      teamAfterUpdate.teamLeaderId
    );

    if (!teamLeaderDto) {
      logger.warn(
        `The warning is at addMember method of TeamService: Team leader with id ${teamAfterUpdate.teamLeaderId} not found`
      );
      throw new Error(
        `Team leader with id ${teamAfterUpdate.teamLeaderId} not found`
      );
    }

    const teamDto: TeamDto = {
      id: teamAfterUpdate._id,
      name: teamAfterUpdate.name,
      member: teamAfterUpdate.member,
      teamLeader: teamLeaderDto,
    };

    return teamDto;
  }
}
