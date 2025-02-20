import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  NotFoundException,
} from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import {
  ZodValidationPipe,
  CreateUserSchema,
  UpdateUserSchema,
  UserModel,
  CreateUserDto,
} from "./zod";

import { ApiResponse, ApiBody } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UserModel })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: UserModel,
  })
  create(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  @ApiBody({ type: UserModel })
  @ApiResponse({
    status: 200,
    description: "User created successfully",
    type: UserModel,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdateUserSchema)) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: "User founded", type: [UserModel] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "User founded", type: UserModel })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.remove(id);
  }
}
