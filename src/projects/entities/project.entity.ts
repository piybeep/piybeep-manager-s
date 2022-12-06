import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Server } from '../../servers/entities/server.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
@ObjectType()
export class Project {
	@PrimaryGeneratedColumn()
	@Field((type) => Int)
	id: number;

	@Column()
	@Field()
	name: string;

	@OneToMany(() => Server, (server) => server.project)
	@Field((type) => [Server], { nullable: true })
	servers?: any;
}

