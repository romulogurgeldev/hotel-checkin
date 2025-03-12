import { Person } from './person';

export interface CheckIn {
  id?: number;
  person: Person;
  entryDate: string;
  exitDate: string;
  vehicleAdded: boolean;
  totalAmount?: number;
}