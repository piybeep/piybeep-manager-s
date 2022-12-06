import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

	@Column()
	@Field((type) => Int)
	projectId: number;

	@ManyToOne(() => Project, (project) => project.servers)
	@Field((type) => Project)
	project: Project;
}

