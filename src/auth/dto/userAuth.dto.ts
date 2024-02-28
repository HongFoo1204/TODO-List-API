import { IsNotEmpty } from 'class-validator';

export class UserAuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
