export interface Ticket {
  _id?: string;
  travelId: string;
  ownerId: string;
  nameOnTicket: string;
  isCancelled: boolean;
  createdAt: string;
}