import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
  ) { }

  async googleLogin(dto: any) {
    const { email, name, picture } = dto.user;

    const user = await this.validateUser(
      {
        email,
        name,
        picture
      }
    )

    const tokens = await this.issueTokens(user.id)
    
    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Erro de atualização com token');

    const user = await this.userService.findOne(result.id);
    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: Partial<User>) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    };
  }

  private async validateUser(dto: AuthDto) {
    let userExists = await this.userService.findByEmail(dto.email)


    if (!userExists) {
      userExists = await this.userService.create({
        email: dto.email,
        name: dto.name,
        picture: dto.picture
      })
    }


    return userExists
  }

}
