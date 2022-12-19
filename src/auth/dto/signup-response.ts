import { PartialType, ObjectType } from '@nestjs/graphql';
import { LoginResponse } from './login-response';

@ObjectType()
export class SignupResponse extends PartialType(LoginResponse) {}
