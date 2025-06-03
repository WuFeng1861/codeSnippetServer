import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * 创建新用户
   * @param createUserDto 用户创建DTO
   * @returns 创建的用户（不含密码）
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名或邮箱是否已存在
    const existingUser = await this.usersRepository.findOne({ 
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email }
      ]
    });
    
    if (existingUser) {
      throw new ConflictException('用户名或邮箱已被使用');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // 创建新用户
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  /**
   * 通过ID查找用户
   * @param id 用户ID
   * @returns 用户信息
   */
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`ID为${id}的用户不存在`);
    }
    return user;
  }

  /**
   * 通过用户名查找用户
   * @param username 用户名
   * @returns 用户信息
   */
  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
  
  /**
   * 通过邮箱查找用户
   * @param email 电子邮箱
   * @returns 用户信息
   */
  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}