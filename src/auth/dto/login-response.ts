import { Account } from '../../accounts/entities/account.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
	@Field()
	access_token: string;

	@Field()
	account: Account;
}
