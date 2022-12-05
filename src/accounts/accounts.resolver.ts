import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { AccountEntity } from './entities/account.entity';
import { CreateAccountInput } from './inputs/create-account.input';
import { UpdateAccountInput } from './inputs/update-account.input';

@Resolver('Account')
export class AccountsResolver {
	constructor(private readonly accountService: AccountsService) {}

	@Query(() => [AccountEntity])
	async getAllAccounts(): Promise<AccountEntity[]> {
		return await this.accountService.findAll();
	}

	@Query(() => AccountEntity)
	async getOneAccount(@Args('id') id: number): Promise<AccountEntity> {
		return await this.accountService.findOne(id);
	}

	@Mutation(() => Number)
	async removeAccount(@Args('id') id: number): Promise<number> {
		return await this.accountService.remove(id);
	}

	@Mutation(() => AccountEntity)
	async createAccount(
		@Args('createAccount') createAccount: CreateAccountInput,
	): Promise<AccountEntity> {
		return await this.accountService.create(createAccount);
	}

	@Mutation(() => AccountEntity)
	async updateAccount(
		@Args('updateAccount') updateAccount: UpdateAccountInput,
	): Promise<AccountEntity> {
		return await this.accountService.update(updateAccount);
	}
}

