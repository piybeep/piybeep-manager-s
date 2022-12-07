import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAccountInput } from './create-account.input';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
	@Field(() => Int)
	id: number;

	@Field((type) => Int)
	roleId?: number;
}

