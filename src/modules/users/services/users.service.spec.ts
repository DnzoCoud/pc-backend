import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { USER_REPOSITORY } from '../users.constants';
import { AUDIT_SERVICE } from 'src/modules/audit/audit.constants';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../models/user.entity';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UpdateProfileDto } from '../dto/update-profile.dto';

describe('UserService', () => {
  let service: UserService;

  const repositoryMock = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    existsByEmail: jest.fn(),
    save: jest.fn(),
  };

  const auditServiceMock = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,

        {
          provide: USER_REPOSITORY,
          useValue: repositoryMock,
        },

        {
          provide: AUDIT_SERVICE,
          useValue: auditServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const dto: CreateUserDto = {
        name: 'Daniel',
        email: 'daniel@test.com',
        phoneNumber: '3001234567',
        password: 'Password123',
      };

      repositoryMock.existsByEmail.mockResolvedValue(false);

      repositoryMock.save.mockResolvedValue({
        id: 'user-id',
        name: 'Daniel',
        email: 'daniel@test.com',
        phoneNumber: '3001234567',
        passwordHash: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(dto);

      expect(repositoryMock.existsByEmail).toHaveBeenCalledWith(dto.email);

      expect(repositoryMock.save).toHaveBeenCalled();

      expect(auditServiceMock.publish).toHaveBeenCalled();

      expect(result.id).toBe('user-id');
    });

    it('should throw when email already exists', async () => {
      const dto: CreateUserDto = {
        name: 'Daniel',
        email: 'daniel@test.com',
        phoneNumber: '3001234567',
        password: 'Password123',
      };

      repositoryMock.existsByEmail.mockResolvedValue(true);

      await expect(service.create(dto)).rejects.toThrow(
        UserAlreadyExistsException,
      );

      expect(repositoryMock.save).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return user', async () => {
      const user: UserEntity = {
        id: 'user-id',
        name: 'Daniel',
        email: 'daniel@test.com',
        phoneNumber: '3001234567',
        passwordHash: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.findById.mockResolvedValue(user);

      const result = await service.findById('user-id');

      expect(repositoryMock.findById).toHaveBeenCalledWith('user-id');

      expect(auditServiceMock.publish).toHaveBeenCalled();

      expect(result.id).toBe(user.id);
    });

    it('should throw when user does not exist', async () => {
      repositoryMock.findById.mockResolvedValue(null);

      await expect(service.findById('user-id')).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const user: UserEntity = {
        id: 'user-id',
        name: 'Daniel',
        email: 'daniel@test.com',
        phoneNumber: '3001234567',
        passwordHash: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const dto: UpdateProfileDto = {
        name: 'Daniel Updated',
      };

      repositoryMock.findById.mockResolvedValue(user);

      repositoryMock.save.mockImplementation((entity) =>
        Promise.resolve(entity),
      );

      const result = await service.updateProfile(user.id, dto);

      expect(repositoryMock.save).toHaveBeenCalled();

      expect(auditServiceMock.publish).toHaveBeenCalled();

      expect(result.name).toBe(dto.name);
    });

    it('should throw when user does not exist', async () => {
      repositoryMock.findById.mockResolvedValue(null);

      await expect(service.updateProfile('user-id', {})).rejects.toThrow(
        UserNotFoundException,
      );
    });

    it('should throw when email already exists', async () => {
      const user: UserEntity = {
        id: 'user-id',
        name: 'Daniel',
        email: 'old@test.com',
        phoneNumber: '3001234567',
        passwordHash: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repositoryMock.findById.mockResolvedValue(user);

      repositoryMock.findByEmail.mockResolvedValue({
        id: 'another-user',
      });

      await expect(
        service.updateProfile(user.id, {
          email: 'new@test.com',
        }),
      ).rejects.toThrow(UserAlreadyExistsException);
    });
  });
});
