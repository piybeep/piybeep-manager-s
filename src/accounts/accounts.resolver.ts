import {
	Resolver,
	Query,
	Args,
	Mutation,
	ResolveField,
	Parent,
} from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { AccountEntity } from './entities/account.entity';
import { CreateAccountInput } from './inputs/create-account.input';
import { UpdateAccountInput } from './inputs/update-account.input';
import { Int } from '@nestjs/graphql';
import { Role } from '../roles/entities/role.entity';

@Resolver('Accounts')
export class AccountsResolver {
	constructor(private readonly accountService: AccountsService) {}

	@Query((returns) => [AccountEntity])
	async getAllAccounts(): Promise<AccountEntity[]> {
		return await this.accountService.findAll();
	}

	@Query((returns) => AccountEntity)
	async getOneAccount(
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

	// @ResolveField((returns) => Role)
	// role(@Parent() account: AccountEntity): Promise<Role> {
	// 	return this.accountService.getRole(account.roleId);
	// }

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
