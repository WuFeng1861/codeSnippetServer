import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  /**
   * 创建新标签
   * @param userId 用户ID
   * @param createTagDto 标签创建DTO
   * @returns 创建的标签
   */
  async create(userId: number, createTagDto: CreateTagDto): Promise<Tag> {
    // 先判断是否存在同用户的同名标签
    const existTag = await this.tagsRepository.findOne({
      where: { name: createTagDto.name, userId },
    })
    if (existTag) {
      throw new NotFoundException(`ID为${userId}的用户已存在同名标签`);
    }
    const tag = this.tagsRepository.create({
      ...createTagDto,
      userId,
    });
    
    return this.tagsRepository.save(tag);
  }

  /**
   * 获取用户的所有标签
   * @param userId 用户ID
   * @returns 标签列表
   */
  async findAllByUser(userId: number): Promise<Tag[]> {
    return this.tagsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 获取所有非隐藏的标签
   * @returns 非隐藏的标签列表
   */
  async findAllVisible(): Promise<Tag[]> {
    return this.tagsRepository.find({
      where: { isHidden: false },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 更新标签的隐藏状态
   * @param userId 用户ID
   * @param id 标签ID
   * @param updateTagDto 标签更新DTO
   * @returns 更新后的标签
   */
  async updateVisibility(userId: number, id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({
      where: { id, userId },
    });
    
    if (!tag) {
      throw new NotFoundException(`ID为${id}的标签不存在`);
    }
    
    Object.assign(tag, updateTagDto);
    
    return this.tagsRepository.save(tag);
  }

  /**
   * 通过ID列表查找标签
   * @param ids 标签ID列表
   * @returns 标签列表
   */
  async findByIds(ids: number[]): Promise<Tag[]> {
    if (!ids || ids.length === 0) return [];
    return this.tagsRepository.findByIds(ids);
  }
}
