import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';

describe('DogsController', () => {
  let controller: DogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a dog', () => {
    const dog = { id: 1, name: 'Buddy', age: 3 };
    expect(controller.createDog(dog)).toBe('Dog created successfully');
  });

  it('should get all dogs', () => {
    const dog = { id: 1, name: 'Buddy', age: 3 };
    controller.createDog(dog);
    expect(controller.getAllDogs()).toEqual([dog]);
  });

  it('should get a dog by id', () => {
    const dog = { id: 1, name: 'Buddy', age: 3 };
    controller.createDog(dog);
    expect(controller.getDogById('1')).toEqual(dog); // Passing ID as string since it's converted in the controller
  });

  it('should update a dog', () => {
    const dog = { id: 1, name: 'Buddy', age: 3 };
    controller.createDog(dog);
    const updatedDog = { id: 1, name: 'Buddy', age: 4 };
    expect(controller.updateDog('1', updatedDog)).toBe('Dog updated successfully'); // Passing ID as string
    expect(controller.getDogById('1')).toEqual(updatedDog); // Ensure it is updated
  });

  it('should delete a dog', () => {
    const dog = { id: 1, name: 'Buddy', age: 3 };
    controller.createDog(dog);
    expect(controller.deleteDog('1')).toBe('Dog deleted successfully'); // Passing ID as string
    expect(() => controller.getDogById('1')).toThrow(); // Ensure it is deleted
  });
});
