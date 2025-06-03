import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'johndoe' })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(3, 50, { message: '用户名长度必须在3到50个字符之间' })
  username: string;

  @ApiProperty({ description: '电子邮箱', example: 'john@example.com' })
  @IsEmail({}, { message: '请提供有效的电子邮箱' })
  @IsNotEmpty({ message: '电子邮箱不能为空' })
  email: string;

  @ApiProperty({ description: '密码', example: 'Password123!' })
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 100, { message: '密码长度必须在8到100个字符之间' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: '密码太弱，必须包含大小写字母和数字或特殊字符',
  // })
  password: string;
}
