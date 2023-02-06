import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LanguagesModule } from './languages/languages.module';
import { CompetencesModule } from './competences/competences.module';
import { PresentationsModule } from './presentations/presentations.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, '*', '.entity.{ts,js}')],
      synchronize: true,
    }),
    UsersModule,
    LanguagesModule,
    CompetencesModule,
    PresentationsModule,
    FriendshipsModule,
    ProfilesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
