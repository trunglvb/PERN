export type IPricing = {
  id: number;
  expiredDay: number;
  imageUrl: string;
  isDisplayImmedialy: boolean;
  levelShowDescription: number;
  name: string;
  price: number;
  priority: number;
  requireScore: string;
  requireScoreNextLevel: string;
  updatedAt?: Date;
  createdAt?: Date;
};
