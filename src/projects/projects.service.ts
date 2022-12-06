import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
	) {}

	create(createProjectInput: CreateProjectInput) {
		return this.projectRepository.save(createProjectInput);
	}

	findAll(options?: FindManyOptions<Project>) {
		return this.projectRepository.find(options);
	}

	findOne(id: number) {
		return this.projectRepository.findOneBy({ id });
	}

	update(id: number, updateProjectInput: UpdateProjectInput) {
		return this.projectRepository.update(id, updateProjectInput);
	}

	remove(id: number) {
		return this.projectRepository.delete(id);
	}
}

