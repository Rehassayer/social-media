import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      // Add the user property here
      // Replace 'number' with 'string' if your IDs are UUIDs
      user?: {
        id: number;
      };
    }
  }
}
