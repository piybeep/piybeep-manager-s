import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServerInput } from './dto/create-server.input';
import { UpdateServerInput } from './dto/update-server.input';
import { Server } from './entities/server.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServersService {
	constructor(
		@InjectRepository(Server)
		private readonly serverRepository: Repository<Server>,
	) {}

	create(createServerInput: CreateServerInput) {
		return this.serverRepository.save(createServerInput);
	}

	findAll() {
		return this.serverRepository.find();
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

