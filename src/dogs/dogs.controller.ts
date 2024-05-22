import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';

interface Dog {
  id: number;
  name: string;
  age: number;
}

@Controller('dogs')
export class DogsController {
  private dogs: Dog[] = [];

  @Get()
  getAllDogs(): Dog[] {
    return this.dogs;
  }

  @Post()
  createDog(@Body() dog: Dog): string {
    this.dogs.push(dog);
    return 'Dog created successfully!';
  }

  @Get(':id')
  getDogById(@Param('id') id: string): Dog {
    const dogId = parseInt(id, 10);  // Convert ID to a number
    const dog = this.dogs.find(d => d.id === dogId);
    if (!dog) {
      throw new HttpException('-Dog not found-', HttpStatus.NOT_FOUND);
    }
    return dog;
  }

  @Put(':id')
  updateDog(@Param('id') id: string, @Body() updatedDog: Dog): string {
    const dogId = parseInt(id, 10);  // Convert ID to a number
    const dogIndex = this.dogs.findIndex(d => d.id === dogId);
    if (dogIndex === -1) {
      throw new HttpException('-Dog not found-', HttpStatus.NOT_FOUND);
    }
    this.dogs[dogIndex] = updatedDog;
    return 'Dog updated successfully';
  }

  @Delete(':id')
  deleteDog(@Param('id') id: string): string {
    const dogId = parseInt(id, 10);  // Convert ID to a number
    const dogIndex = this.dogs.findIndex(d => d.id === dogId);
    if (dogIndex === -1) {
      throw new HttpException('-Dog not found-', HttpStatus.NOT_FOUND);
    }
    this.dogs.splice(dogIndex, 1);
    return 'Dog deleted successfully!';
  }
}
