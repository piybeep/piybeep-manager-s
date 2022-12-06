import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

