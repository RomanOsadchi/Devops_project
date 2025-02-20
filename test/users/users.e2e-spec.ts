import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { CreateUserDto, UpdateUserDto } from "../../src/users/zod";
import { UsersModule } from "../../src/users/users.module";
import { UsersService } from "../../src/users/users.service";

describe("Users - /users (e2e)", () => {
  const users = {
    id: 1,
    firstName: "FirstName #1",
    lastName: "LastName #1",
    isActive: true,
  };
  let usersService: UsersService;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: process.env.DB_HOST || "127.0.0.1",
          port: Number(process.env.DB_PORT) || 3306,
          username: process.env.DB_USERNAME || "root",
          password: process.env.DB_ROOT_PASSWORD || "root",
          database: process.env.DB_DATABASE || "root",
          autoLoadEntities: true,
          synchronize: true,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    usersService = moduleFixture.get<UsersService>(UsersService);
  });

  it("Create [POST /users]", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send(users as CreateUserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(users);
      });
  });

  it("Update [PATCH /users]", async () => {
    const testUser = {
      firstName: "John",
      lastName: "Doe",
      isActive: true,
    };
    const update = {
      firstName: "Bruce",
    };
    const newUser = await usersService.create(testUser);
    return await request(app.getHttpServer())
      .patch(`/users/${newUser.id}`)
      .send(update as UpdateUserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(users);
      });
  });

  it("Get all users [GET /users]", () => {
    return request(app.getHttpServer())
      .get("/users")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it("Get one user [GET /users/:id]", () => {
    return request(app.getHttpServer())
      .get("/users/2")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it("Delete one user [DELETE /users/:id]", () => {
    return request(app.getHttpServer()).delete("/users/1").expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
