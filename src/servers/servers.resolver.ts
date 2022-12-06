import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServersService } from './servers.service';
import { Server } from './entities/server.entity';
import { CreateServerInput } from './dto/create-server.input';
import { UpdateServerInput } from './dto/update-server.input';

@Resolver(() => Server)
export class ServersResolver {
	constructor(private readonly serversService: ServersService) {}

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

