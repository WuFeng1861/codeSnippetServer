import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({ description: '是否隐藏标签', example: true })
  @IsBoolean({ message: '隐藏状态必须是布尔值' })
  isHidden: boolean;
}