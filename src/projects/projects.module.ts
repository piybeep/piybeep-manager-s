import { Module, forwardRef } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ServersModule } from '../servers/servers.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Project]),
		forwardRef(() => ServersModule),
	],
	providers: [ProjectsResolver, ProjectsService],
	exports: [ProjectsService],
})
export class ProjectsModule {}


