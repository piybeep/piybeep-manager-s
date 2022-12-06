import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('server')
@ObjectType()
export class Server {
	@PrimaryGeneratedColumn()
	@Field((type) => Int)
	id: number;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	ip: string;

	@CreateDateColumn()
	@Field()
	createdAt: Date;

	@UpdateDateColumn()
	@Field()
	updatedAt: Date;

	@Column()
	@Field((type) => Int)
	projectId: number;

	@ManyToOne(() => Project, (project) => project.servers)
	@Field((type) => Project)
	project: Project;
}

