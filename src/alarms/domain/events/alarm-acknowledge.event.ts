import { AutowiredEvent } from 'src/share/decorators/autowired-event.decorator';
import { Alarm } from '../alarm';

@AutowiredEvent
export class AlarmAcknowledgeEvent {
  constructor(public readonly alarmId: string) {}
}
