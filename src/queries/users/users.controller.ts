import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiResponse({ status: 404, description: 'users not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })

  async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return user' })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })

  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }
}
