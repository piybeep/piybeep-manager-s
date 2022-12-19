import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { CreateServerInput } from './dto/create-server.input';
import { UpdateServerInput } from './dto/update-server.input';
import { Server } from './entities/server.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ServersService {
	constructor(
		@InjectRepository(Server)
		private readonly serverRepository: Repository<Server>,
		@Inject(forwardRef(() => ProjectsService))
		private readonly projectService: ProjectsService,
	) {}

	getProject(projectId: string) {
		return this.projectService.findOne(projectId);
	}

	create(createServerInput: CreateServerInput) {
		return this.serverRepository.save(createServerInput);
	}

	findAll(options?: FindManyOptions<Server>) {
		return this.serverRepository.find(options);
	}

	findOne(id: string) {
		return this.serverRepository.findOneBy({ id });
	}

	update(id: string, updateServerInput: UpdateServerInput) {
		return this.serverRepository.update(id, updateServerInput);
	}

	remove(id: string) {
		return this.serverRepository.delete(id);
	}
}

