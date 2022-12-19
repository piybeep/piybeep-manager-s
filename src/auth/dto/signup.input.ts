import { PartialType, InputType, Field } from '@nestjs/graphql';
import { LoginInput } from './login.input';

@InputType()
export class SignupInput extends PartialType(LoginInput) {
	@Field({ nullable: true })
	email?: string;
}
