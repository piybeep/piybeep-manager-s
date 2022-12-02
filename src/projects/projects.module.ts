import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/entities/project.entity';
import { ProjectService } from './services/project/project.service';
import { ProjectResolver } from './resolvers/project/project.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectService, ProjectResolver],
})
export class ProjectsModule {}
