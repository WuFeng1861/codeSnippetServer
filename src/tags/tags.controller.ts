import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('标签')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建标签', description: '用户创建新的代码片段标签' })
  create(@GetUser() user: User, @Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(user.id, createTagDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有可见标签', description: '获取所有未被隐藏的标签' })
  findAllVisible() {
    return this.tagsService.findAllVisible();
  }

  @Get('my-tags')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取我的标签', description: '获取当前用户创建的所有标签' })
  findAllByUser(@GetUser() user: User) {
    return this.tagsService.findAllByUser(user.id);
  }

  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新标签可见性', description: '更新标签在全局列表中的可见性' })
  updateVisibility(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.updateVisibility(user.id, +id, updateTagDto);
  }
}