import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Snippet} from './entities/snippet.entity';
import {CreateSnippetDto} from './dto/create-snippet.dto';
import {TagsService} from '../tags/tags.service';
import {UpdateSnippetDto} from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet)
    private snippetsRepository: Repository<Snippet>,
    private tagsService: TagsService,
  ) {
  }
  
  /**
   * 创建新代码片段
   * @param userId 用户ID
   * @param createSnippetDto 代码片段创建DTO
   * @returns 创建的代码片段
   */
  async create(userId: number, createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    // 创建代码片段
    const snippet = this.snippetsRepository.create({
      ...createSnippetDto,
      userId,
      tagIds: createSnippetDto.tagIds || [],
    });
    
    // 保存代码片段
    await this.snippetsRepository.save(snippet);
    
    // 获取标签并关联
    if (createSnippetDto.tagIds && createSnippetDto.tagIds.length > 0) {
      snippet.tags = await this.tagsService.findByIds(createSnippetDto.tagIds);
    }
    
    return snippet;
  }
  
  /**
   * 更新代码片段
   * @param userId 用户ID
   * @param updateSnippetDto
   * @returns 更新代码片段
   */
  async update(userId: number, updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
    // 更新代码片段
    const snippet = await this.snippetsRepository.findOne({
      where: {id: updateSnippetDto.id, userId},
    });
    if (!snippet) {
      throw new NotFoundException(`ID为${updateSnippetDto.id}的代码片段不存在`);
    }
    snippet.title = updateSnippetDto.title;
    snippet.content = updateSnippetDto.content;
    snippet.description = updateSnippetDto.description;
    snippet.language = updateSnippetDto.language;
    snippet.tagIds = updateSnippetDto.tagIds;
    snippet.userId = userId;
    
    await this.snippetsRepository.save(snippet);
    
    // 获取标签并关联
    if (updateSnippetDto.tagIds && updateSnippetDto.tagIds.length > 0) {
      snippet.tags = await this.tagsService.findByIds(updateSnippetDto.tagIds);
    }
    return snippet;
  }
  
  /**
   * 获取用户的所有代码片段
   * @param userId 用户ID
   * @returns 代码片段列表
   */
  async findAllByUser(userId: number): Promise<Snippet[]> {
    const snippets = await this.snippetsRepository.find({
      where: {userId},
      order: {createdAt: 'DESC'},
    });
    
    // 为每个片段加载标签
    for (const snippet of snippets) {
      if (snippet.tagIds && snippet.tagIds.length > 0) {
        snippet.tags = await this.tagsService.findByIds(snippet.tagIds);
      } else {
        snippet.tags = [];
      }
    }
    
    return snippets;
  }
  
  /**
   * 获取单个代码片段
   * @param userId 用户ID
   * @param id 代码片段ID
   * @returns 代码片段
   */
  async findOne(userId: number, id: number): Promise<Snippet> {
    const snippet = await this.snippetsRepository.findOne({
      where: {id, userId},
    });
    
    if (!snippet) {
      throw new NotFoundException(`ID为${id}的代码片段不存在`);
    }
    
    // 加载标签
    if (snippet.tagIds && snippet.tagIds.length > 0) {
      snippet.tags = await this.tagsService.findByIds(snippet.tagIds);
    } else {
      snippet.tags = [];
    }
    
    return snippet;
  }
  
  /**
   * 删除代码片段
   * @param userId 用户ID
   * @param id 代码片段ID
   */
  async remove(userId: number, id: number): Promise<void> {
    const result = await this.snippetsRepository.delete({id, userId});
    
    if (result.affected === 0) {
      throw new NotFoundException(`ID为${id}的代码片段不存在`);
    }
  }
}
