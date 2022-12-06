import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServerInput } from './dto/create-server.input';
import { UpdateServerInput } from './dto/update-server.input';
import { Server } from './entities/server.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ServersService {
	constructor(
		@InjectRepository(Server)
		private readonly serverRepository: Repository<Server>,
		private readonly projectService: ProjectsService,
	) {}

	getProject(projectId: number) {
		return this.projectService.findOne(projectId);
	}

	create(createServerInput: CreateServerInput) {
		return this.serverRepository.save(createServerInput);
	}

	findAll(options?: FindManyOptions<Server>) {
		return this.serverRepository.find(options);
	}

	findOne(id: number) {
		return this.serverRepository.findOneBy({ id });
	}

	update(id: number, updateServerInput: UpdateServerInput) {
		return this.serverRepository.update(id, updateServerInput);
	}

	remove(id: number) {
		return this.serverRepository.delete(id);
	}
}




