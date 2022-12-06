import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { AccountEntity } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Int } from '@nestjs/graphql';

@Resolver('Accounts')
export class AccountsResolver {
	constructor(private readonly accountService: AccountsService) {}

	@Query((returns) => [AccountEntity])
	async accounts(): Promise<AccountEntity[]> {
		return await this.accountService.findAll();
	}

	@Query((returns) => AccountEntity)
	async account(
		@Args('id', { type: () => Int }) id: number,
	): Promise<AccountEntity> {
		return await this.accountService.findOne(id);
	}

	@Mutation((returns) => AccountEntity)
	async createAccount(
		@Args('createAccount') createAccount: CreateAccountInput,
	): Promise<AccountEntity> {
		return await this.accountService.create(createAccount);
	}

	@Mutation((returns) => AccountEntity)
	async updateAccount(
		@Args('updateAccount') updateAccount: UpdateAccountInput,
	): Promise<AccountEntity> {
		return await this.accountService.update(updateAccount);
	}

	@Mutation((returns) => Number)
	async removeAccount(@Args('id') id: number): Promise<number> {
		return await this.accountService.remove(id);
	}
}

