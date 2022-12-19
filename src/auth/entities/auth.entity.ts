import {
	Column,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Account } from '../../accounts/entities/account.entity';

@Entity('auth')
@ObjectType()
export class Auth {
	@PrimaryGeneratedColumn()
	@Field((type) => Int)
	id: number;

	@Column()
	@Field()
	token: string;

	@Column()
	@Field((type) => Int)
	accountId: number;

	@OneToOne((type) => Account)
	@Field((type) => Account)
	account: Account;

	@CreateDateColumn()
	@Field((type) => Date)
	createdAt: Date;

	@UpdateDateColumn()
	@Field((type) => Date)
	updatedAt: Date;
}
