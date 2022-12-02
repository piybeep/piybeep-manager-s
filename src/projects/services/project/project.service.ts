import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from 'src/entities/project.entity';
import { CreateProjectInput } from '../../inputs/create-project.input';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async createProject(
    projectInput: CreateProjectInput,
  ): Promise<ProjectEntity> {
    return await this.projectRepository.save({...projectInput})
  }

  async getAllProjects(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find()
  }
}
