import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

type Status =
  | 'В планах'
  | 'В очереди'
  | 'В разработке (приоритет)'
  | 'В разработке (дизайн)'
  | 'В разработке'
  | 'В заморозке'
  | 'Поддержка'
  | 'Завершено';

@ObjectType()
@Entity('projects')
export class ProjectEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link: string;

  @Field({ defaultValue: 'В планах' })
  @Column({ default: 'В планах' })
  status: string;
}
