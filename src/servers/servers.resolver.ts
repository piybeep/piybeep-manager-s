import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	Parent,
	ResolveField,
} from '@nestjs/graphql';
import { ServersService } from './servers.service';
import { Server } from './entities/server.entity';
import { CreateServerInput } from './dto/create-server.input';
import { UpdateServerInput } from './dto/update-server.input';
import { Project } from '../projects/entities/project.entity';

@Resolver(() => Server)
export class ServersResolver {
	constructor(private readonly serversService: ServersService) {}

	@ResolveField((returns) => Project)
	project(@Parent() server: Server) {
		return this.serversService.getProject(server.projectId);
	}

	@Mutation(() => Server)
	createServer(
		@Args('createServerInput') createServerInput: CreateServerInput,
	) {
		return this.serversService.create(createServerInput);
	}

	@Query(() => [Server], { name: 'servers' })
	findAll() {
		return this.serversService.findAll();
	}

	@Query(() => Server, { name: 'server' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.serversService.findOne(id);
	}

	@Mutation(() => Server)
	updateServer(
		@Args('updateServerInput') updateServerInput: UpdateServerInput,
	) {
		return this.serversService.update(
			updateServerInput.id,
			updateServerInput,
		);
	}

	@Mutation(() => Server)
	removeServer(@Args('id', { type: () => Int }) id: number) {
		return this.serversService.remove(id);
	}
}

