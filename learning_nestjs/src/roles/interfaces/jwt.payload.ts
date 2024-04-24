import { Role } from '@prisma/client';
import internal from 'stream';

export interface jwtPayload{
    sub: number;
    email: string;
    roles:Role [];

}