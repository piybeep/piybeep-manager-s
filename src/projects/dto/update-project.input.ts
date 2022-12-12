import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
// import { Status } from '../entities/project.entity';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
	@Field(() => Int)
	id: number;

	// @Field(() => Status, { nullable: true })
	// status?: Status;

	@Field({ nullable: true })
	status?: string;
}

