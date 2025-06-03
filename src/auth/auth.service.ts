import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * 验证用户
   * @param username 用户名
   * @param password 密码
   * @returns 验证通过的用户
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 用户登录
   * @param user 用户对象
   * @returns 包含token的对象
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    };
  }

  /**
   * 用户注册
   * @param createUserDto 用户创建DTO
   * @returns 创建的用户
   */
  async register(createUserDto: CreateUserDto) {
    // 创建新用户
    const user = await this.usersService.create(createUserDto);
    
    // 移除密码字段
    const { password, ...result } = user;
    
    // 生成JWT令牌
    const payload = { username: user.username, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }
}