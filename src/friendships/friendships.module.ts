import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { UsersService } from 'src/users/users.service';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports: [HttpModule],
  controllers: [FriendshipsController],
  providers: [FriendshipsService, UsersService],
})
export class FriendshipsModule {}
