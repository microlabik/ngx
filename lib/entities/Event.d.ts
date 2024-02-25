import { TrafficDirectionCode } from '../enums/TrafficDirectionCode';
import { EventTypeCode } from '../enums/EventTypeCode';
import { SeverityTypeCode } from '../enums/SeverityTypeCode';
import { Indicator } from '../common/Indicator';
import { RuleTypeCode } from '../enums/RuleTypeCode';
import { StringKeyValue } from '../common/StringKeyValue';
import { EventStatusCode } from '../enums/EventStatusCode';
import { GeoData } from '../common/GeoData';
import { EventCategoryCode } from '../enums/EventCategoryCode';
import { EventOccurrence } from '../entities/EventOccurrence';
import { BaseEntity } from '../entities/BaseEntity';
export declare class Event extends BaseEntity {
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
    occurrencesCount: boolean;
}
