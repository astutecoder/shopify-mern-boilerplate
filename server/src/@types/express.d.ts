export {};

declare global {
  namespace Express {
    export interface Request {
      user?: { token: string; shop: string };
    }
  }
}
