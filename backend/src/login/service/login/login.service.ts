import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUser } from 'src/login/dto/user.dto';
import { User } from 'src/login/entity/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class LoginService {

	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async findUser (user : LoginUser ): Promise<User | undefined> {
		return await this.findUserByEmail(user.email);
	}

	async findUserByEmail (user_email: string): Promise<User | undefined> {
		return await this.userRepository.findOne({where: {email: user_email}});
	}

	async findUserById (id: string): Promise<User | undefined> {
		return await this.userRepository.findOne({where: {userId: id}});
	}

	async registerToken (userId: string) {
	}

	async unregisterToken (userId: string) {
	}
}
