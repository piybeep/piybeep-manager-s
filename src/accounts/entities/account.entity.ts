import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('accounts')
export class AccountEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
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
	email?: string;

	@Field(type => Int)
	@Column()
	roleId?: number

	@ManyToOne(() => Role, (role) => role.account)
	@Field((type) => [Role], { nullable: true })
	role?: Role;
}
