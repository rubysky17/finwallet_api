import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/user.entity';

export const Roles = (...roles: UserRole[]) => {
    return SetMetadata('roles', roles)
}; 