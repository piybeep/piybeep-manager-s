import {
	Resolver,
	Query,
	Args,
	Mutation,
	ResolveField,
	Parent,
	Int,
} from '@nestjs/graphql';

import { AccountsService } from './accounts.service';

import { Account } from './entities/account.entity';
import { Role } from '../roles/entities/role.entity';

import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';

@Resolver(() => Account)
export class AccountsResolver {
	constructor(private readonly accountService: AccountsService) {}

	@ResolveField((returns) => Role)
	role(@Parent() account: Account) {
		return this.accountService.getRole(account.roleId);
	}

	@Query((returns) => [Account])
	async accounts(): Promise<Account[]> {
		return await this.accountService.findAll();
	}

	@Query((returns) => Account)
	async account(
		@Args('id', { type: () => Int }) id: number,
	): Promise<Account> {
		return await this.accountService.findOne(id);
	}

	@Mutation((returns) => Account)
	async createAccount(
		@Args('createAccount') createAccount: CreateAccountInput,
	): Promise<Account> {
		return await this.accountService.create(createAccount);
	}

	@Mutation((returns) => Account)
	async updateAccount(
		@Args('updateAccount') updateAccount: UpdateAccountInput,
	): Promise<Account> {
		return await this.accountService.update(updateAccount);
	}

	@Mutation((returns) => Number)
	async removeAccount(@Args('id') id: number): Promise<number> {
		return await this.accountService.remove(id);
	}
}

