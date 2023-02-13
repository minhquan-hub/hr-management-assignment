import { model, Schema, Model, Document } from "mongoose";
import { ITeam } from "./interface_model/team_interface_model";

const TeamSchema: Schema = new Schema({
  name: { type: "string", required: true },
  member: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  teamLeader: { type: Schema.Types.ObjectId, required: true },
});

const Team = model<ITeam>("Team", TeamSchema);
export default Team;
