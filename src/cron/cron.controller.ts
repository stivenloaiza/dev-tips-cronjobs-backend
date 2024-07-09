import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CronService } from './cron.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { Cron } from './entities/cron.entity';

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
  create(@Body() createCronDto: CreateCronDto) {
    return this.cronService.create(createCronDto);
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
  findAll() {
    return this.cronService.findAll();
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
  findOne(@Param('id') id: string) {
    return this.cronService.findOne(id);
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
  update(@Param('id') id: string, @Body() updateCronDto: UpdateCronDto) {
    return this.cronService.update(id, updateCronDto);
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
  softDelete(@Param('id') id: string) {
    return this.cronService.softDelete(id);
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
  remove(@Param('id') id: string) {
    return this.cronService.remove(id);
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
  restore(@Param('id') id: string) {
    return this.cronService.restore(id);
  }
}
