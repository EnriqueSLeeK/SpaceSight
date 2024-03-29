import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm'


@Injectable()
export class RegisterService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async createUser(userInfo: CreateUser): Promise<User> {
		const user = this.userRepository.create(userInfo);
		await this.userRepository.insert(user);
		return user;
	}

	async findOne(userInfo: CreateUser): Promise<User | undefined> {
		return await this.userRepository.findOne({where: { email: userInfo.email }});
	}

}
