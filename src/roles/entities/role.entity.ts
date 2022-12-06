import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from '../../accounts/entities/account.entity';

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
	@Field()
	level: number;

	// @OneToMany(() => AccountEntity, (account) => account.role)
	// @Field((type) => AccountEntity)
	// account: AccountEntity[];
}

