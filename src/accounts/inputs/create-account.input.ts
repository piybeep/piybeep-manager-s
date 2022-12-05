import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
	@Field()
	username: string;

	@Field({ nullable: true })
	email?: string;

	@Field((type) => Int, { nullable: true })
	roleId?: number;
}
