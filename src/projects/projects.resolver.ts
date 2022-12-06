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

@Resolver(() => Project)
export class ProjectsResolver {
	constructor(private readonly projectsService: ProjectsService) {}

	@ResolveField((returns) => Server)
	servers(@Parent() project: Project) {
		return this.projectsService.getServers(project.id);
	}

	@Mutation(() => Project)
	createProject(
		@Args('createProjectInput') createProjectInput: CreateProjectInput,
	) {
		return this.projectsService.create(createProjectInput);
	}

	@Query(() => [Project], { name: 'projects' })
	findAll() {
		return this.projectsService.findAll();
	}

	@Query(() => Project, { name: 'project' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.projectsService.findOne(id);
	}

	@Mutation(() => Project)
	updateProject(
		@Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
	) {
		return this.projectsService.update(
			updateProjectInput.id,
			updateProjectInput,
		);
	}

	@Mutation(() => Project)
	removeProject(@Args('id', { type: () => Int }) id: number) {
		return this.projectsService.remove(id);
	}
}

