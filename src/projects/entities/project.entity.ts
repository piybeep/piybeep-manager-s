import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Server } from '../../servers/entities/server.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

// export enum Status {
// 	'IN_PLANS' = 'В планах',
// 	'IN_QUEUE' = 'В очереди',
// 	'IN_DEVELOPMENT_PRIORITY' = 'В разработке (приоритет)',
// 	'IN_DEVELOPMENT_DESIGN' = 'В разработке (дизайн)',
// 	'IN_DEVELOPMENT' = 'В разработке',
// 	'FROZEN' = 'В заморозке',
// 	'SUPPORT' = 'Поддержка',
// 	'COMPLITED' = 'Завершено',
// }

// registerEnumType(Status, {
// 	name: 'Status',
// });

@Entity('project')
@ObjectType()
export class Project {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column()
	@Field()
	name: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	link?: string;

	// @Column({
	// 	type: 'enum',
	// 	enum: Status,
	// 	default: Status['IN_PLANS'],
	// })
	// @Field(() => Status)
	// status: Status;

	@Column({ default: 'В планах' })
	@Field({ defaultValue: 'В планах' })
	status: string;

	@CreateDateColumn()
	@Field()
	createdAt: Date;

	@UpdateDateColumn()
	@Field()
	updatedAt: Date;

	@OneToMany(() => Server, (server) => server.project)
	@Field((type) => [Server], { nullable: true })
	servers?: Server[];
}

