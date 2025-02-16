import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import {
  ZodValidationPipe,
  CreateUserSchema,
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

  @Get()
  @ApiResponse({ status: 200, description: "User founded", type: [UserModel] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "User founded", type: UserModel })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
