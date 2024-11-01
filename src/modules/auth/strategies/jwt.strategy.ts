import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService, // Use o serviço para buscar usuário
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Token expirado resulta em erro de Unauthorized
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { id: number }) {
    // Verifique se o usuário existe com base no ID do token
    const user = await this.userService.findOne(payload.id);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    return user; // O usuário é injetado no request automaticamente
  }
}
