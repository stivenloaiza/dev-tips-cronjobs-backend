import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Queries from Users')
@Controller('queries-users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Fetches all the users from the database.' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID', description: 'Fetches a user from the database by their ID.' })
  @ApiResponse({ status: 200, description: 'Return user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }
}
