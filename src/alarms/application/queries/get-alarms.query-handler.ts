import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';
import { FindAlarmRepository } from '../ports/find-alarm.repository';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly findAlarmRepository: FindAlarmRepository) {}

  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.findAlarmRepository.findAll();
  }
}
