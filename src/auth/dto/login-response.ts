import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from '../../accounts/entities/account.entity';

@ObjectType()
export class LoginResponse {
	@Field()
	access_token: string;

	@Field((type) => Account)
	account: Account;
}
