import { BaseEntity } from '../entities/BaseEntity';
export declare class UsageRecord extends BaseEntity {
    source: string;
    accountId: string;
    streamId: string;
    deviceId: string;
    deviceIp: string;
    startTime: number;
    endTime: number;
    srcPortsList: string;
    srcPortsCount: number;
    dstPortsList: string;
    dstPortsCount: number;
    endpointsList: string;
    endpointsCount: number;
    packetsIn: number;
    packetsOut: number;
    bytesIn: number;
    bytesOut: number;
    srcAckFlags: number;
    dstAckFlags: number;
    srcSynFlags: number;
    dstSynFlags: number;
    srcRstFlags: number;
    dstRstFlags: number;
    labels: string[];
    zPacketsIn: number;
    zPacketsOut: number;
    zBytesIn: number;
    zBytesOut: number;
    zPortsCount: number;
    zEndpointsCount: number;
}
