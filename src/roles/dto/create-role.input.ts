import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
	@Field()
	name: string;

	@Field({ defaultValue: 1 })
	level?: number;
}

