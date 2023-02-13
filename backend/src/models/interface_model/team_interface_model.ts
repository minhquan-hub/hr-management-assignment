import { Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  member: string[];
  teamLeader: string;
}
