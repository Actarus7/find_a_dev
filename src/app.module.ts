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
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Presentation } from './presentations/entities/presentation.entity';
import { Language } from './languages/entities/language.entity';
import { Friendship } from './friendships/entities/friendship.entity';
import { Competence } from './competences/entities/competence.entity';

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
      entities: [User, Profile, Presentation, Language, Friendship, Competence/* join(__dirname, '*', '.entity.{ts,js}') */],
      synchronize: true,
    }),
    UsersModule,
    LanguagesModule,
    CompetencesModule,
    PresentationsModule,
    FriendshipsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
