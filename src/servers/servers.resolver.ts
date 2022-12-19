import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	Parent,
	ResolveField,
} from '@nestjs/graphql';
import { FindOptionsOrderValue } from 'typeorm';

import { ServersService } from './servers.service';
import { Server } from './entities/server.entity';
import { CreateServerInput } from './dto/create-server.input';
import { UpdateServerInput } from './dto/update-server.input';
import { Project } from '../projects/entities/project.entity';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Server)
export class ServersResolver {
	constructor(private readonly serversService: ServersService) {}

	@ResolveField((returns) => Project)
	project(@Parent() server: Server) {
		return this.serversService.getProject(server.projectId);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Server)
	createServer(
		@Args('createServerInput') createServerInput: CreateServerInput,
	) {
		return this.serversService.create(createServerInput);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => [Server], { name: 'servers' })
	findAll(
		@Args('projectId', { nullable: true })
		projectId?: string,
		@Args('sort', {
			type: () => Boolean,
			nullable: true,
		})
		sort?: FindOptionsOrderValue,
	) {
		return this.serversService.findAll({
			where: { projectId },
			order: { updatedAt: sort ? 1 : -1 },
		});
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => Server, { name: 'server' })
	findOne(@Args('id') id: string) {
		return this.serversService.findOne(id);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Server)
	updateServer(
		@Args('updateServerInput') updateServerInput: UpdateServerInput,
	) {
		return this.serversService.update(
			updateServerInput.id,
			updateServerInput,
		);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Server)
	removeServer(@Args('id') id: string) {
		return this.serversService.remove(id);
	}
}

