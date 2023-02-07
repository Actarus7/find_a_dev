import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [FriendshipsController],
  providers: [FriendshipsService, UsersService]
})
export class FriendshipsModule {}
