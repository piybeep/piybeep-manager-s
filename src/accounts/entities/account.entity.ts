import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';
import { Auth } from '../../auth/entities/auth.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('accounts')
export class Account {
	@Field((type) => Int)
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

	@Column()
	@Field((type) => Int)
	roleId: number;

	@ManyToOne(() => Role, (role) => role.accounts)
	@Field((type) => Role)
	role: Role;

	@OneToMany(() => Auth, (auth) => auth.account)
	@Field((type) => [Auth], { nullable: true })
	auth?: Auth[];
}

