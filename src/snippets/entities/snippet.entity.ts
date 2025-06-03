import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity('snippets')
export class Snippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  content: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ length: 50 })
  language: string;

  @Column()
  userId: number; // 存储用户ID而不使用外键

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('simple-array', { nullable: true })
  tagIds: number[]; // 存储标签ID数组

  // 关联关系（没有外键约束）
  @ManyToOne(() => User, user => user.snippets)
  user: User;

  // 标签关联（运行时使用，但不在数据库层面创建外键约束）
  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'snippet_tags',
    joinColumn: { name: 'snippet_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}