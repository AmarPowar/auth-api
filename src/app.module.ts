import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProtectedController } from './profile/profile.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProtectedController],
  providers: [],
})
export class AppModule {}
