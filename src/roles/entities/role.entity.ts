import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity('roles')
@ObjectType()
export class Role {
	@PrimaryGeneratedColumn()
	@Field((type) => Int)
	id: number;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field((type) => Int)
	level: number;

	@OneToMany(() => Account, (account) => account.role)
	@Field((type) => [Account], { nullable: true })
	accounts?: Account[];
}


