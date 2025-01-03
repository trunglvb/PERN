import { IPricing } from './pricing.type';

export type IUser = {
  id: number;
  email: string;
  fullname: string;
  phone: null;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  password: string;
  avatar: string;
  balance?: string;
  score: string;
  resetPwdToken?: string;
  resetPwdExpire?: Date;
  idPricing?: number;
  createdAt?: Date;
  updatedAt?: Date;
  rPricing: IPricing;
};

export type IAddUserBody = Pick<IUser, 'email' | 'fullname' | 'avatar' | 'password'>;
