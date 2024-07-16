

export class SubscriptionDto {
    frequency: string;
    levels: string;
    technology: string[];
    type: string[];
}

export class UserDto {
    name: string;
    email: string;
    subscribed: boolean;
    subscription: SubscriptionDto;
}
