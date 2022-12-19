import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Account } from '../../accounts/entities/account.entity';

@Entity('session')
@ObjectType()
export class Session {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	ip?: string;

	@Column({
		comment: 'time to life in minutes',
		default: 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30 /*month*/,
	})
	@Field((type) => Int, {
		defaultValue: 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30 /*month*/,
		description: 'time to life in minutes',
	})
	ttl: number;

	@CreateDateColumn()
	@Field((type) => Date)
	createdAt: Date;

	@Column()
	@Field((type) => Int)
	accountId: number;

	@ManyToOne(() => Account)
	@Field((type) => Account)
	account: Account;
}
