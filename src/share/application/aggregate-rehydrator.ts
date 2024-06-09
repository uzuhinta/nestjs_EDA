import { Injectable, Type } from '@nestjs/common';
import { EventStore } from './ports/event-store';
import { EventPublisher } from '@nestjs/cqrs';
import { VersionedAggregatedRoot } from '../domain/value-objects/aggregate-root';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly eventStore: EventStore,
    private readonly evenPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregatedRoot>(
    aggregateId: string,
    AggregateCls: Type<T>,
  ): Promise<T> {
    const events = await this.eventStore.getEventsByStreamId(aggregateId);

    const AggregateClsWithDispatcher =
      this.evenPublisher.mergeClassContext(AggregateCls);
    const aggregate = new AggregateClsWithDispatcher(aggregateId);

    aggregate.loadFromHistory(events);
    return aggregate;
  }
}
