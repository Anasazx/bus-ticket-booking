import { Address } from './address.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: Address;
  profileImageUrl?: string;
}