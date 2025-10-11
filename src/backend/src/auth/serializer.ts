import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Serializer extends PassportSerializer {
  deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
    done(null, payload);
  }

  serializeUser(user: any, done: (err: any, id?: any) => void): void {
    done(null, user);
  }
}
