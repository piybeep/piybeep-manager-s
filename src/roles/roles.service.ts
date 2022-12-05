import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>,
	) {}

	create(createRoleInput: CreateRoleInput) {
		return this.roleRepository.save(createRoleInput);
	}

	findAll() {
		return this.roleRepository.find();
	}

	findOne(id: number) {
		return this.roleRepository.findOneByOrFail({ id });
	}

	update(id: number, updateRoleInput: UpdateRoleInput) {
		return this.roleRepository.update(id, updateRoleInput);
	}

	async remove(id: number) {
		await this.roleRepository.delete({ id });
		return id;
	}
}

