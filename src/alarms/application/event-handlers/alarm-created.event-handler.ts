import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { SerializedEventPayload } from 'src/share/domain/value-objects/interfaces/serializable-event';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-meterialized-alarm.repository';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmCreatedEvent>>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmCreatedEvent>) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);

    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity.value,
      triggeredAt: new Date(event.alarm.triggeredAt),
      isAcknowledged: event.alarm.isAcknowledged,
      items: event.alarm.items,
    });
  }
}
