import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';

import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { ServersService } from '../servers/servers.service';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
		@Inject(forwardRef(() => ServersService))
		private readonly serversService: ServersService,
	) {}

	getServers(projectId: string) {
		return this.serversService.findAll({ where: { projectId } });
	}

	create(createProjectInput: CreateProjectInput) {
		return this.projectRepository.save(createProjectInput);
	}

	findAll(options?: FindManyOptions<Project>) {
		return this.projectRepository.find(options);
	}

	findOne(id: string) {
		return this.projectRepository.findOneBy({ id });
	}

	update(id: string, updateProjectInput: UpdateProjectInput) {
		return this.projectRepository.update(id, updateProjectInput);
	}

	remove(id: string) {
		return this.projectRepository.delete(id);
	}
}

