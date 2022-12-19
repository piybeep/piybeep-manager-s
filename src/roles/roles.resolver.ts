import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	Parent,
	ResolveField,
} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Account } from '../accounts/entities/account.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Role)
export class RolesResolver {
	constructor(private readonly rolesService: RolesService) {}

	@ResolveField((returns) => [Account])
	accounts(@Parent() role: Role) {
		return this.rolesService.getAccounts(role.id);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Role)
	createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
		return this.rolesService.create(createRoleInput);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => [Role], { name: 'roles' })
	findAll() {
		return this.rolesService.findAll();
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => Role, { name: 'role' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.rolesService.findOne(id);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Role)
	updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
		return this.rolesService.update(updateRoleInput.id, updateRoleInput);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Role)
	removeRole(@Args('id', { type: () => Int }) id: number) {
		return this.rolesService.remove(id);
	}
}

