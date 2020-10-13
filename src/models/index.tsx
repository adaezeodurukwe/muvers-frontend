export interface Ticket {
  plan: string;
  status: string;
  time: Date;
  note: string;
  user: User
}

interface User {
  firstName: string;
  email: string;
}