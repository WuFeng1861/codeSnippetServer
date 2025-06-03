import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {UpdateSnippetDto} from './dto/update-snippet.dto';

@ApiTags('代码片段')
@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建代码片段', description: '用户创建新的代码片段' })
  create(@GetUser() user: User, @Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(user.id, createSnippetDto);
  }
  
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新代码片段', description: '用户更新代码片段' })
  update(@GetUser() user: User, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetsService.update(user.id, updateSnippetDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取我的代码片段', description: '获取当前用户的所有代码片段' })
  findAllByUser(@GetUser() user: User) {
    return this.snippetsService.findAllByUser(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取单个代码片段', description: '获取当前用户的特定代码片段' })
  findOne(@GetUser() user: User, @Param('id') id: string) {
    return this.snippetsService.findOne(user.id, +id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除代码片段', description: '删除当前用户的特定代码片段' })
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.snippetsService.remove(user.id, +id);
  }
}
