import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput {
	@Field(() => Int)
	id: number;

	@Field({ nullable: true })
	username?: string;

	@Field({ nullable: true })
	email?: string;
}
