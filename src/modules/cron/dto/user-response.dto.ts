export class SubscriptionDto {
  frequency: string;
  level: string;
  technology: string[];
  type: string[];
}

export class UserDto {
  name: string;
  email: string;
  subscribed: boolean;
  subscriptions: SubscriptionDto;
}
