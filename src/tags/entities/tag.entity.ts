import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  userId: number; // 存储用户ID而不使用外键

  @Column({ default: false })
  isHidden: boolean; // 是否在全局标签列表中隐藏

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // 关联关系（没有外键约束）
  @ManyToOne(() => User, user => user.tags)
  user: User;
}