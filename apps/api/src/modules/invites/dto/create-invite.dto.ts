import { IsEnum, IsEmail, IsString } from 'class-validator';
import { UserRole } from '@p2p/shared';

export class CreateInviteDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsEnum(UserRole, { message: 'Role must be a valid user role' })
  role: UserRole;

  @IsString()
  frontendUrl?: string;
}
