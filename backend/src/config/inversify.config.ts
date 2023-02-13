import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "./types";
import { IUserService } from "../interfaces/iuser_service";
import UserService from "../services/user_service";

type T = any;

const container = new Container();

container.bind<IUserService>(TYPES.User).to(UserService).inRequestScope();

export default container;
