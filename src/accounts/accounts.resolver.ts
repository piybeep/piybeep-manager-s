import {
	Resolver,
	Query,
	Args,
	Mutation,
	ResolveField,
	Parent,
	Int,
	Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { Role } from '../roles/entities/role.entity';
import { UpdateAccountInput } from './dto/update-account.input';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Account)
export class AccountsResolver {
	constructor(private readonly accountService: AccountsService) {}

	@ResolveField((returns) => Role)
	role(@Parent() account: Account) {
		return this.accountService.getRole(account.roleId);
	}

	@UseGuards(GqlAuthGuard)
	@Query((returns) => [Account])
	async accounts(): Promise<Account[]> {
		return await this.accountService.findAll();
	}

	@UseGuards(GqlAuthGuard)
	@Query((returns) => Account)
	async account(
		@Context() context: any,
		@Args('id', { type: () => Int, nullable: true }) id?: number,
	): Promise<Account> {
		const _id = id ?? context.req?.user?.id;

		return await this.accountService.findOne(_id);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation((returns) => Account)
	async updateAccount(
		@Args('updateAccount') updateAccount: UpdateAccountInput,
	): Promise<Account> {
		return await this.accountService.update(updateAccount);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation((returns) => Number)
	async removeAccount(@Args('id') id: number): Promise<number> {
		return await this.accountService.remove(id);
	}
}

