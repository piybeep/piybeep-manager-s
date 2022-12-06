import {
	Resolver,
	Query,
	Args,
	Mutation,
	ResolveField,
	Parent,
	Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AccountsService } from './accounts.service';

import { Account } from './entities/account.entity';
import { Role } from '../roles/entities/role.entity';

import { UpdateAccountInput } from './dto/update-account.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Account)
export class AccountsResolver {
	constructor(private readonly accountService: AccountsService) {}

	@ResolveField((returns) => Role)
	role(@Parent() account: Account) {
		return this.accountService.getRole(account.roleId);
	}

	@Query((returns) => [Account])
	@UseGuards(JwtAuthGuard)
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

