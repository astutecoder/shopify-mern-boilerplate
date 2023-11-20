import { IUserReqBody } from '../interfaces/user.interface';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUserReqBody;
    }
  }
}
