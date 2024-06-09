import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { SerializedEventPayload } from 'src/share/domain/value-objects/interfaces/serializable-event';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-meterialized-alarm.repository';
import { AlarmAcknowledgeEvent } from 'src/alarms/domain/events/alarm-acknowledge.event';

@EventsHandler(AlarmCreatedEvent)
export class AlarmAcknowledgeEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmAcknowledgeEvent>>
{
  private readonly logger = new Logger(AlarmAcknowledgeEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmAcknowledgeEvent>) {
    this.logger.log(`Alarm acknowledge event: ${JSON.stringify(event)}`);

    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarmId,
      isAcknowledged: true,
    });
  }
}
