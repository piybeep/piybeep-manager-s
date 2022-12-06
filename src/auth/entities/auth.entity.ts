import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@ObjectType()
@Entity('auth')
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

	@ManyToOne(() => Account, (account) => account.auth)
	@Field((type) => Account)
	account: Account;
}

