import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { Repository } from "typeorm";

const userArray = [
  {
    firstName: "firstName #1",
    lastName: "lastName #1",
  },
  {
    firstName: "firstName #2",
    lastName: "lastName #2",
  },
];

const oneUser = {
  firstName: "firstName #1",
  lastName: "lastName #1",
};

describe("UserService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create()", () => {
    it("should successfully insert a user", () => {
      const oneUser = {
        firstName: "firstName #1",
        lastName: "lastName #1",
      };

      expect(
        service.create({
          firstName: "firstName #1",
          lastName: "lastName #1",
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe("update()", () => {
    it("should successfully update a user", async () => {
      const testUser = {
        firstName: "John",
        lastName: "Doe",
        isActive: true,
      };
      const newUser = await service.create(testUser);
      const newName = "Bruce";
      const response = await service.update(newUser.id, {
        firstName: newName,
      });
      expect(response.firstName).toEqual(newName);
      expect((await service.findOne(newUser.id)).firstName).toEqual(newName);
    });
  });

  describe("findAll()", () => {
    it("should return an array of users", async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe("findOne()", () => {
    it("should get a single user", () => {
      const repoSpy = jest.spyOn(repository, "findOneBy");
      expect(service.findOne(1)).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe("remove()", () => {
    it("should call remove with the passed value", async () => {
      const newUser = await service.create(oneUser);
      const removeSpy = jest.spyOn(repository, "delete");
      const retVal = await service.remove(newUser.id);
      expect(removeSpy).toBeCalledWith(newUser.id);
      expect(retVal).toBeUndefined();
    });
  });
});
