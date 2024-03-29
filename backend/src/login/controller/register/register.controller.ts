import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { RegisterService } from 'src/login/service/register/register.service';
import { HashService } from 'src/login/service/hash/hash.service';

@Controller('register')
export class RegisterController {

	constructor(private readonly registerService: RegisterService,
			   private readonly hashService: HashService) {}

	@Get()
	async returnDummy(): Promise<User> {
		const new_user: CreateUser =  {
			name: 'a',
			password: "aaaaaaaaaaaaaas",
			secondName: "something",
			nickname: "panckage",
			email: "email@a.com",
		}
		const user = this.registerService.createUser(new_user);
		return user;
	}

	@Post()
	async registerUser(@Body() userRegistrationData: CreateUser) {

		const userExists = this.registerService.findOne(userRegistrationData);

		if (!userExists) {
			throw new ConflictException('This account already exists!');
		}

		userRegistrationData['password'] = 
			await this.hashService.hashPassword(userRegistrationData['password'],
												10);

		const user = await this.registerService.createUser(userRegistrationData);

		const {password, ...result} = user;
		return result;
	}
}
