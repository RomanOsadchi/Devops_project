import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./zod";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
