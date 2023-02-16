import { User } from '../user/user';
export interface Team {
  id: string;
  name: string;
  member: string[];
  teamLeader: User;
}
