import { AggregateRoot } from '@nestjs/cqrs';
import { Version } from './version';

const VERSION = Symbol('version');

export class VersionedAggregatedRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  get version(): Version {
    return this[VERSION];
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }
}
