import { forwardRef, Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersResolver } from './servers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Server]),
		forwardRef(() => ProjectsModule),
	],
	providers: [ServersResolver, ServersService],
})
export class ServersModule {}

