import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	ResolveField,
	Parent,
} from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Server } from '../servers/entities/server.entity';
import { FindOptionsOrderValue, In } from 'typeorm';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Project)
export class ProjectsResolver {
	constructor(private readonly projectsService: ProjectsService) {}

	@ResolveField((returns) => Server)
	servers(@Parent() project: Project) {
		return this.projectsService.getServers(project.id);
	}

	@Mutation(() => Project)
	@UseGuards(GqlAuthGuard)
	createProject(
		@Args('createProjectInput') createProjectInput: CreateProjectInput,
	) {
		return this.projectsService.create(createProjectInput);
	}

	@Query(() => [Project], { name: 'projects' })
	@UseGuards(GqlAuthGuard)
	findAll(
		@Args('statusFilter', { nullable: true, type: () => [String] })
		statusFilter?: String[],
		@Args('statusSort', { nullable: true, type: () => Boolean })
		statusSort?: FindOptionsOrderValue,
	) {
		return this.projectsService.findAll({
			where: {
				status: statusFilter ? In(statusFilter) : null,
			},
			order: { status: statusSort ? 1 : -1, updatedAt: 1 },
		});
	}

	@Query(() => Project, { name: 'project' })
	@UseGuards(GqlAuthGuard)
	findOne(@Args('id') id: string) {
		return this.projectsService.findOne(id);
	}

	@Mutation(() => Project)
	@UseGuards(GqlAuthGuard)
	updateProject(
		@Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
	) {
		return this.projectsService.update(
			updateProjectInput.id,
			updateProjectInput,
		);
	}

	@Mutation(() => Project)
	@UseGuards(GqlAuthGuard)
	removeProject(@Args('id') id: string) {
		return this.projectsService.remove(id);
	}
}

