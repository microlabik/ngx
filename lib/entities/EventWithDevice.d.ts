import { GeoData } from '../common/GeoData';
import { EventOccurrence } from '../entities/EventOccurrence';
import { BaseEntity } from '../entities/BaseEntity';
import { StringKeyValue } from '../common/StringKeyValue';
import { EventCategoryCode } from '../enums/EventCategoryCode';
import { TrafficDirectionCode } from '../enums/TrafficDirectionCode';
import { EventTypeCode } from '../enums/EventTypeCode';
import { SeverityTypeCode } from '../enums/SeverityTypeCode';
import { EventStatusCode } from '../enums/EventStatusCode';
import { Indicator } from '../common/Indicator';
import { RuleTypeCode } from '../enums/RuleTypeCode';
import { Device } from '../entities/Device';
export declare class EventWithDevice extends BaseEntity {
    accountId: string;
    streamId: string;
    deviceId: string;
    startTime: number;
    endTime: number;
    type: EventTypeCode;
    severity: SeverityTypeCode;
    score: number;
    probability: number;
    status: EventStatusCode;
    indicators: Indicator[];
    ruleType: RuleTypeCode;
    ruleId: string;
    targetIp: string;
    targetLocation: GeoData;
    description: string;
    tags: string[];
    labels: StringKeyValue[];
    category: EventCategoryCode;
    recommendedAction: string;
    occurrences: EventOccurrence[];
    trafficDirection: TrafficDirectionCode;
    confidenceScore: number;
    device: Device;
}
