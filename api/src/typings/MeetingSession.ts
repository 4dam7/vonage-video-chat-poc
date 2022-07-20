export interface MeetingSession {
  id: string;
  name: string;
  sessionId: string;

  scheduledAt: number;

  clientFirstName: string;
  clientLastName: string;
  sellerFirstName: string;
  sellerLastName: string;
}
