import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersResolver } from './servers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Server])],
	providers: [ServersResolver, ServersService],
})
export class ServersModule {}

