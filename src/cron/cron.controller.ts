import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiParam, ApiQuery, ApiBody, ApiTags } from '@nestjs/swagger';
import { CronService } from './cron.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { Cron } from './entities/cron.entity';

@ApiTags('Cron')
@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new Cron Job' })
  @ApiResponse({
    status: 201,
    description: 'The Cron Job has been successfully created.',
    type: Cron,
  })
  @ApiBody({ type: CreateCronDto })
  @ApiBadRequestResponse({
    description: 'Invalid data or Cron Job already exists with the same name.',
  })
  async create(@Body() createCronDto: CreateCronDto) {
    try {
      const newCron = await this.cronService.create(createCronDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Cron job created successfully',
        newCron,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Cron Jobs' })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
    description: 'Search term for filtering Cron Jobs by name or description',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieved all Cron Jobs successfully.',
    type: [Cron],
  })
  async findAll() {
    try {
      const crons = await this.cronService.findAll();
      return {
        status: HttpStatus.OK,
        message: 'Cron jobs retrieved successfully',
        crons,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a Cron Job by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the Cron Job to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved the Cron Job successfully.',
    type: Cron,
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format or Cron Job not found.',
  })
  async findOne(@Param('id') id: string) {
    try {
      const cron = await this.cronService.findOne(id);
      return {
        status: HttpStatus.OK,
        message: 'Cron job retrieved successfully',
        cron,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Cron Job by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the Cron Job to update' })
  @ApiResponse({
    status: 200,
    description: 'Updated the Cron Job successfully.',
    type: Cron,
  })
  @ApiBody({ type: UpdateCronDto })
  @ApiBadRequestResponse({
    description: 'Invalid ID format, data, or Cron Job not found.',
  })
  async update(@Param('id') id: string, @Body() updateCronDto: UpdateCronDto) {
    try {
      const updatedCron = await this.cronService.update(id, updateCronDto);
      return {
        status: HttpStatus.OK,
        message: 'Cron job updated successfully',
        updatedCron,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a Cron Job by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the Cron Job to soft delete' })
  @ApiResponse({
    status: 204,
    description: 'Soft deleted the Cron Job successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format or Cron Job not found.',
  })
  async softDelete(@Param('id') id: string) {
    try {
      await this.cronService.softDelete(id);
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'Cron job soft deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id/permanently')
  @ApiOperation({ summary: 'Permanently delete a Cron Job by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the Cron Job to delete permanently' })
  @ApiResponse({
    status: 204,
    description: 'Deleted the Cron Job permanently successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format or Cron Job not found.',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.cronService.remove(id);
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'Cron job permanently deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restore a deleted Cron Job by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the Cron Job to restore' })
  @ApiResponse({
    status: 200,
    description: 'Restored the Cron Job successfully.',
    type: Cron,
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format or Cron Job not found.',
  })
  async restore(@Param('id') id: string) {
    try {
      const restoredCron = await this.cronService.restore(id);
      return {
        status: HttpStatus.OK,
        message: 'Cron job restored successfully',
        restoredCron,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
