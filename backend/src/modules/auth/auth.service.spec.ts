import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<Partial<UsersService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  const mockAdminUser = {
    id: 'user-uuid-1',
    email: 'admin@cadservice.com',
    passwordHash: '',
    name: 'Admin User',
    role: UserRole.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    // Hash a known password for testing
    mockAdminUser.passwordHash = await bcrypt.hash('admin123', 10);

    usersService = {
      findByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return user when credentials are valid and user is ADMIN', async () => {
      usersService.findByEmail!.mockResolvedValue(mockAdminUser as any);

      const result = await authService.validateUser(
        'admin@cadservice.com',
        'admin123',
      );

      expect(result).toBeDefined();
      expect(result?.email).toBe('admin@cadservice.com');
      expect(result?.role).toBe(UserRole.ADMIN);
    });

    it('should return null when password is incorrect', async () => {
      usersService.findByEmail!.mockResolvedValue(mockAdminUser as any);

      const result = await authService.validateUser(
        'admin@cadservice.com',
        'wrong-password',
      );

      expect(result).toBeNull();
    });

    it('should return null when user does not exist', async () => {
      usersService.findByEmail!.mockResolvedValue(null);

      const result = await authService.validateUser(
        'nonexistent@email.com',
        'any-password',
      );

      expect(result).toBeNull();
    });

    it('should return null when user is not ADMIN', async () => {
      const nonAdminUser = {
        ...mockAdminUser,
        role: 'USER' as UserRole,
      };
      usersService.findByEmail!.mockResolvedValue(nonAdminUser as any);

      const result = await authService.validateUser(
        'admin@cadservice.com',
        'admin123',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', () => {
      const result = authService.login(mockAdminUser as any);

      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('mocked-jwt-token');
    });

    it('should sign JWT with correct payload', () => {
      authService.login(mockAdminUser as any);

      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockAdminUser.email,
        sub: mockAdminUser.id,
        role: mockAdminUser.role,
      });
    });
  });
});
