import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Server } from '../../servers/entities/server.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('project')
@ObjectType()
export class Project {
	@PrimaryGeneratedColumn()
	@Field((type) => Int)
	id: number;

	@Column()
	@Field()
	name: string;

	@CreateDateColumn()
	@Field()
	createdAt: Date;

	@UpdateDateColumn()
	@Field()
	updatedAt: Date;

	@OneToMany(() => Server, (server) => server.project)
	@Field((type) => [Server], { nullable: true })
	servers?: any;
}

