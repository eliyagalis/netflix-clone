import { EventEmitter } from 'events';
import { injectable } from 'inversify';
import { IEventBus } from "../interfaces/KafkasInterfaces";
import { EventTypes } from '../utils/eventTypes-enum';


@injectable()
export class EventBus implements IEventBus {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(20);
  }

  public publish<T>(eventType: EventTypes, data: T): void {
    this.emitter.emit(eventType, data);
    console.log(`event published: ${eventType}`, data);
  }

  public subscribe<T>(eventType: EventTypes, listener: (data: T) => void): void {
    this.emitter.on(eventType, listener);
    console.log(`listener added for event : ${eventType}`);
  }

  public unsubscribe<T>(eventType: EventTypes, listener: (data: T) => void): void {
    this.emitter.removeListener(eventType, listener);
    console.log(`listener removed for event : ${eventType}`);
  }
}