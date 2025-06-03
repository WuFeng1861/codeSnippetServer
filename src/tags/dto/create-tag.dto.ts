import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: '标签名称', example: 'JavaScript' })
  @IsString({ message: '标签名称必须是字符串' })
  @IsNotEmpty({ message: '标签名称不能为空' })
  @Length(1, 50, { message: '标签名称长度必须在1到50个字符之间' })
  name: string;
}