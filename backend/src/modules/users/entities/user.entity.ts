export interface UserEntity {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  verified: boolean;
  verificationCode: string | null;
  verificationCodeDate: Date | null;
}
