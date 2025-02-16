import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const CreateUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    isActive: z.boolean().default(true),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export class UserModel implements CreateUserDto {
    @ApiProperty({ description: 'First name of the user' })
    firstName: string;

    @ApiProperty({ description: 'Last name of the user' })
    lastName: string;

    @ApiProperty({ description: 'Is the user active', default: true })
    isActive: boolean;
}
