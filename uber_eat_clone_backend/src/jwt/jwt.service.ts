import { Inject, Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: JwtModuleOptions,
  ) {}

  createToken(payload: any) {
    const token = jsonwebtoken.sign(payload, this.options.privateKey);
    return { token };
  }

  verifyToken(token: string) {
    try {
      return jsonwebtoken.verify(token, this.options.privateKey);
    } catch (ex) {
      return null;
    }
  }
}
