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
import { FindOptionsOrderValue } from 'typeorm';

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
	findAll(
		@Args('projectId', { type: () => Int, nullable: true })
		projectId?: number,
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



