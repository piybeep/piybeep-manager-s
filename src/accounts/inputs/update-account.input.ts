import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput {
	@Field(() => ID)
	id: number;

	@Field({ nullable: true })
	username?: string;

	@Field({ nullable: true })
	email?: string;
}

