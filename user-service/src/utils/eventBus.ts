import { EventEmitter } from 'events';
import { injectable } from 'inversify';

export enum EventTypes {
  PAYMENT_SUCCESS = 'payment.success',
  SUBSCRIPTION_CANCELED = 'subscription.canceled',
  SUBSCRIPTION_UPDATED = 'subscription.updated'
}

export interface PaymentSuccessEvent {
  userId: string;
  subscriptionId: string;
  planId: string;
  timestamp: string;
}

export interface SubscriptionCanceledEvent {
  userId: string;
  subscriptionId: string;
  timestamp: string;
}

export interface SubscriptionUpdatedEvent {
  userId: string;
  subscriptionId: string;
  planId: string;
  status: string;
  timestamp: string;
}

@injectable()
export class EventBus {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    // Increase max listeners if needed
    this.emitter.setMaxListeners(20);
  }

  public publish(eventType: EventTypes, data: any): void {
    this.emitter.emit(eventType, data);
    console.log(`Event published: ${eventType}`, data);
  }

  public subscribe(eventType: EventTypes, listener: (data: any) => void): void {
    this.emitter.on(eventType, listener);
    console.log(`Listener added for event: ${eventType}`);
  }

  public unsubscribe(eventType: EventTypes, listener: (data: any) => void): void {
    this.emitter.removeListener(eventType, listener);
    console.log(`Listener removed for event: ${eventType}`);
  }
}