import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateSnippetDto {
  @ApiProperty({ description: '代码片段ID', example: 1 })
  id: number;
  
  @ApiProperty({ description: '代码片段标题', example: '快速排序算法' })
  @IsString({ message: '标题必须是字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(1, 100, { message: '标题长度必须在1到100个字符之间' })
  title: string;
  
  @ApiProperty({ description: '代码片段内容', example: 'function quickSort(arr) { ... }' })
  @IsString({ message: '代码内容必须是字符串' })
  @IsNotEmpty({ message: '代码内容不能为空' })
  content: string;
  
  @ApiProperty({ description: '代码片段简介', example: '一个高效的排序算法实现', required: false })
  @IsString({ message: '简介必须是字符串' })
  @IsOptional()
  @Length(0, 255, { message: '简介长度不能超过255个字符' })
  description?: string;
  
  @ApiProperty({ description: '编程语言', example: 'javascript' })
  @IsString({ message: '编程语言必须是字符串' })
  @IsNotEmpty({ message: '编程语言不能为空' })
  @Length(1, 50, { message: '编程语言名称长度必须在1到50个字符之间' })
  language: string;
  
  @ApiProperty({ description: '标签ID列表', example: [1, 2, 3], type: [Number], required: false })
  @IsArray({ message: '标签ID必须是数组' })
  @IsOptional()
  tagIds?: number[];
}
