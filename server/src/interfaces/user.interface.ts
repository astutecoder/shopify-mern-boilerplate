export interface IUser {
  shop: string;
  password: string;
  installedAt: Date;
  passwordUpdatedAt: Date;
  uninstalledAt: Date;
}

export type IUserReqBody = Pick<IUser, 'shop' | 'password'>;
