import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiService } from './api/api.service';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';

@Module({
	imports: [
		ApiModule],

	controllers: [AppController, ApiController],

	providers: [AppService, ApiService],

})

export class AppModule {}