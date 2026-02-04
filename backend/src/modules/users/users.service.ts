import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Method to create an initial admin if needed
  async createAdmin(
    email: string,
    passwordPlain: string,
    fullName: string,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(passwordPlain, salt);

    return this.prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: UserRole.ADMIN,
      },
    });
  }
}
