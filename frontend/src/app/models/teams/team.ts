import { User } from '../users/user';
export interface Team {
  id: string;
  name: string;
  member: string[];
  teamLeader: User;
}
