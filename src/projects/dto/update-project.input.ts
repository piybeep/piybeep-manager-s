import { CreateProjectInput } from './create-project.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
// import { Status } from '../entities/project.entity';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
	@Field()
	id: string;

	// @Field(() => Status, { nullable: true })
	// status?: Status;

	@Field({ nullable: true })
	status?: string;
}

