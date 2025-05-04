import { EventTypes } from "src/utils/eventTypes-enum";

export interface IPaymentSuccessEvent {
  userId: string;
  subscriptionId: string;
}

export interface ISubscriptionCanceledEvent {
  userId: string;
}
export type EventData=IPaymentSuccessEvent|ISubscriptionCanceledEvent;

export interface IEventBus{
  publish(eventType: EventTypes, data:any ):void,
  subscribe(eventType: EventTypes, listener: (data:any) => void): void,
  unsubscribe(eventType: EventTypes, listener: (data:any ) => void): void
}