import { ITeamService } from "./../interfaces/iteam_service";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { NextFunction, Response, Request, application } from "express";
import logger from "../ultils/logger";
import { TYPES } from "../config/types";
import TeamService from "../services/team_service";

@controller("/team")
export default class TeamController {
  private _teamService: ITeamService;
  constructor(@inject(TYPES.Team) TeamService: ITeamService) {
    this._teamService = TeamService;
  }

  @httpPost("/")
  async addTeam(req: Request, res: Response) {
    try {
      const teamCreateDto = req.body;
      const team = await this._teamService.addTeam(teamCreateDto);
      return res.status(StatusCodes.OK).json(team);
    } catch (error) {
      logger.error(
        `The error is at addUser method of TeamController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpPut("/add-member/:id")
  async addMember(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const memberId = req.body.memberId;
      const team = await this._teamService.addMember(id, memberId);
      logger.info(`Add member: ${team}`);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "Add member successfully", isSuccess: true });
    } catch (error) {
      logger.error(
        `The error is at addUser method of TeamController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpGet("/")
  async getAllTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teamList = await this._teamService.getAllTeam();
      return res.status(StatusCodes.OK).json(teamList);
    } catch (error) {
      logger.error(
        `The error is at getAllTeam method of TeamController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpPut("/update-team-name/:id")
  async updateTeamName(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const teamName = req.body.teamName;
      const team = await this._teamService.updateTeamName(id, teamName);
      logger.info(`Updated team: ${team}`);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "Updated teamName successfully", isSuccess: true });
    } catch (error) {
      logger.error(
        `The error is at updateTeamName method of TeamController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpPut("/update-team-leader/:id")
  async updateTeamLeader(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const teamLeaderId = req.body.teamLeaderId;
      const team = await this._teamService.updateTeamLeader(id, teamLeaderId);
      logger.info(`Updated team leader: ${team}`);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "Updated teamLeader successfully", isSuccess: true });
    } catch (error) {
      logger.error(
        `The error is at updateTeamLeader method of TeamController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpPut("/remove-member/:id")
  async removeMember(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const memberId = req.params.memberId;
      const team = await this._teamService.removeMember(id, memberId);
      logger.info(`Remove member: ${team}`);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "Remove member successfully", isSuccess: true });
    } catch (error) {
      logger.error(
        `The error is at removeMember method of TeamController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  async deleteTeam(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const team = await this._teamService.deleteTeam(id);
      logger.info(`Delete team: ${team}`);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "Delete team successfully", isSuccess: true });
    } catch (error) {
      logger.error(
        `The error is at deleteTeam method of TeamController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }
}
