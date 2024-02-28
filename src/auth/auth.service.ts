import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserAuthDto } from './dto/userAuth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userAuthDto: UserAuthDto): Promise<any> {
    const user = await this.usersService.findOne(userAuthDto.username);

    const match = await bcrypt.compare(userAuthDto.password, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 10);

      await this.usersService.create({
        ...createUserDto,
        password: hash,
      });

      return 'User created';
    } catch (err) {
      return err;
    }
  }
}
