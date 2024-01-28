import { BaseEntity } from '../entities/BaseEntity';
// SessionRecord represents network statistics for a session
// The unique Id of session record is based on the template: [window_start_time]-[device_id]-[session_id]
// The createdOn field represents the first communication time of the device within this time window
// The updatedOn field represents the last communication time of the device within this time window
export class SessionRecord extends BaseEntity {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvblJlY29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1wdWxzZS1saWIvc3JjL2xpYi9lbnRpdGllcy9TZXNzaW9uUmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUlwRCw0REFBNEQ7QUFDNUQseUdBQXlHO0FBQ3pHLG9HQUFvRztBQUNwRyxtR0FBbUc7QUFDbkcsTUFBTSxPQUFPLGFBQWMsU0FBUSxVQUFVO0NBcUU1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VFbnRpdHkgfSBmcm9tICcuLi9lbnRpdGllcy9CYXNlRW50aXR5JztcblxuXG5cbi8vIFNlc3Npb25SZWNvcmQgcmVwcmVzZW50cyBuZXR3b3JrIHN0YXRpc3RpY3MgZm9yIGEgc2Vzc2lvblxuLy8gVGhlIHVuaXF1ZSBJZCBvZiBzZXNzaW9uIHJlY29yZCBpcyBiYXNlZCBvbiB0aGUgdGVtcGxhdGU6IFt3aW5kb3dfc3RhcnRfdGltZV0tW2RldmljZV9pZF0tW3Nlc3Npb25faWRdXG4vLyBUaGUgY3JlYXRlZE9uIGZpZWxkIHJlcHJlc2VudHMgdGhlIGZpcnN0IGNvbW11bmljYXRpb24gdGltZSBvZiB0aGUgZGV2aWNlIHdpdGhpbiB0aGlzIHRpbWUgd2luZG93XG4vLyBUaGUgdXBkYXRlZE9uIGZpZWxkIHJlcHJlc2VudHMgdGhlIGxhc3QgY29tbXVuaWNhdGlvbiB0aW1lIG9mIHRoZSBkZXZpY2Ugd2l0aGluIHRoaXMgdGltZSB3aW5kb3dcbmV4cG9ydCBjbGFzcyBTZXNzaW9uUmVjb3JkIGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gXG4gICAgLy8gSW5kaWNhdGlvbiB0byB0aGUgc291cmNlIGxvY2F0aW9uIG9mIHRoZSByZWNvcmQgXG4gICAgcHVibGljIHNvdXJjZTogc3RyaW5nO1xuIFxuICAgIC8vIFNlc3Npb24gSWQgaXMgYSB1bmlxdWUgaWRlbnRpZmllciB3aXRoaW4gdGhlIHRpbWUgd2luZG93IFxuICAgIHB1YmxpYyBzZXNzaW9uSWQ6IHN0cmluZztcbiBcbiAgICAvLyBBY2NvdW50IElkIFxuICAgIHB1YmxpYyBhY2NvdW50SWQ6IHN0cmluZztcbiBcbiAgICAvLyBTdHJlYW0gSWQgXG4gICAgcHVibGljIHN0cmVhbUlkOiBzdHJpbmc7XG4gXG4gICAgLy8gRGV2aWNlIElkIFxuICAgIHB1YmxpYyBkZXZpY2VJZDogc3RyaW5nO1xuIFxuICAgIC8vIERldmljZSBJUCAodGVtcG9yYXJ5IElQIHRoYXQgd2FzIGFsbG9jYXRlZCB0byB0aGlzIGRldmljZSBpbiB0aGUgdGltZSB0aGlzIHJlY29yZCB3YXMgY3JlYXRlZCkgXG4gICAgcHVibGljIGRldmljZUlwOiBzdHJpbmc7XG4gXG4gICAgLy8gU3RhcnQgd2luZG93IHRpbWUgW0Vwb2NoIG1pbGxpc2Vjb25kcyBUaW1lc3RhbXBdIFxuICAgIHB1YmxpYyBzdGFydFRpbWU6IG51bWJlcjtcbiBcbiAgICAvLyBFbmQgd2luZG93IHRpbWUgW0Vwb2NoIG1pbGxpc2Vjb25kcyBUaW1lc3RhbXBdIFxuICAgIHB1YmxpYyBlbmRUaW1lOiBudW1iZXI7XG4gXG4gICAgLy8gU291cmNlIElQIFxuICAgIHB1YmxpYyBzcmNJUDogc3RyaW5nO1xuIFxuICAgIC8vIFNvdXJjZSBwb3J0IFxuICAgIHB1YmxpYyBzcmNQb3J0OiBudW1iZXI7XG4gXG4gICAgLy8gRGVzdGluYXRpb24gSVAgXG4gICAgcHVibGljIGRzdElQOiBzdHJpbmc7XG4gXG4gICAgLy8gRGVzdGluYXRpb24gUG9ydCBcbiAgICBwdWJsaWMgZHN0UG9ydDogbnVtYmVyO1xuIFxuICAgIC8vIFByb3RvY29sIFxuICAgIHB1YmxpYyBwcm90b2NvbDogc3RyaW5nO1xuIFxuICAgIC8vIE51bWJlciBvZiBpbmNvbWluZyBwYWNrZXRzICh0byB0aGUgZGV2aWNlKSBcbiAgICBwdWJsaWMgcGFja2V0c0luOiBudW1iZXI7XG4gXG4gICAgLy8gTnVtYmVyIG9mIG91dGdvaW5nIHBhY2tldHMgKGZyb20gdGhlIGRldmljZSkgXG4gICAgcHVibGljIHBhY2tldHNPdXQ6IG51bWJlcjtcbiBcbiAgICAvLyBUb3RhbCBudW1iZXIgb2YgaW5jb21pbmcgYnl0ZXMgKHRvIHRoZSBkZXZpY2UpIFxuICAgIHB1YmxpYyBieXRlc0luOiBudW1iZXI7XG4gXG4gICAgLy8gVG90YWwgbnVtYmVyIG9mIG91dGdvaW5nIGJ5dGVzIChmcm9tIHRoZSBkZXZpY2UpIFxuICAgIHB1YmxpYyBieXRlc091dDogbnVtYmVyO1xuIFxuICAgIC8vIExpc3Qgb2YgbGFiZWxzIFxuICAgIHB1YmxpYyBsYWJlbHM6IHN0cmluZ1tdO1xuIFxuICAgIC8vIE5vcm1hbGl6ZWQgKHotc2NvcmUpIHZhbHVlcyBOb3JtYWxpemVkIE51bWJlciBvZiBpbmNvbWluZyBwYWNrZXRzICh0byB0aGUgZGV2aWNlKSBcbiAgICBwdWJsaWMgelBhY2tldHNJbjogbnVtYmVyO1xuIFxuICAgIC8vIE5vcm1hbGl6ZWQgTnVtYmVyIG9mIG91dGdvaW5nIHBhY2tldHMgKGZyb20gdGhlIGRldmljZSkgXG4gICAgcHVibGljIHpQYWNrZXRzT3V0OiBudW1iZXI7XG4gXG4gICAgLy8gTm9ybWFsaXplZCBUb3RhbCBudW1iZXIgb2YgaW5jb21pbmcgYnl0ZXMgKHRvIHRoZSBkZXZpY2UpIFxuICAgIHB1YmxpYyB6Qnl0ZXNJbjogbnVtYmVyO1xuIFxuICAgIC8vIE5vcm1hbGl6ZWQgVG90YWwgbnVtYmVyIG9mIG91dGdvaW5nIGJ5dGVzIChmcm9tIHRoZSBkZXZpY2UpIFxuICAgIHB1YmxpYyB6Qnl0ZXNPdXQ6IG51bWJlcjtcbiBcbiBcbn1cblxuXG4iXX0=