import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('accounts')
export class AccountEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
	id: number;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;

	@Field()
	@Column()
	username: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	email: string;
}

