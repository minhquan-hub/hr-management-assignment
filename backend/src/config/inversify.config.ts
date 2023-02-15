import express from "express";
import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "./types";
import { IUserService } from "../interfaces/iuser_service";
import UserService from "../services/user_service";
import AuthService from "../services/auth_service";
import { IAuthService } from "../interfaces/iauth_service";
import {
  verifyAdmin,
  verifyAdminAndLeader,
  verifyLeader,
  verifyLogin,
} from "../middleware/auth_middleware";
import TeamService from "../services/team_service";
import { ITeamService } from "../interfaces/iteam_service";

type T = any;

const container = new Container();

container.bind<IUserService>(TYPES.User).to(UserService).inRequestScope();
container.bind<IAuthService>(TYPES.Auth).to(AuthService).inRequestScope();
container.bind<ITeamService>(TYPES.Team).to(TeamService).inRequestScope();
container
  .bind<express.RequestHandler>("verifyLogin")
  .toConstantValue(verifyLogin);
container
  .bind<express.RequestHandler>("verifyAdmin")
  .toConstantValue(verifyAdmin);
container
  .bind<express.RequestHandler>("verifyLeader")
  .toConstantValue(verifyLeader);
container
  .bind<express.RequestHandler>("verifyAdminAndLeader")
  .toConstantValue(verifyAdminAndLeader);

export default container;
