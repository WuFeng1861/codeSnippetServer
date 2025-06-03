import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Snippet } from '../../snippets/entities/snippet.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  @Exclude() // 排除密码，不在响应中返回
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 关联关系（没有外键约束）
  @OneToMany(() => Snippet, snippet => snippet.user, { cascade: true })
  snippets: Snippet[];

  @OneToMany(() => Tag, tag => tag.user, { cascade: true })
  tags: Tag[];
}