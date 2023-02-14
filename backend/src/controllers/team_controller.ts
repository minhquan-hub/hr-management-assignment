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
  async addTeam(req: Request, res: Response, next: NextFunction) {
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
}
