import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServerInput {
	@Field()
	name: string;

	@Field()
	ip: string;

	@Field((type) => Int)
	projectId: string;
}

