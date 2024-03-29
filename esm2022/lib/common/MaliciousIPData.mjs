// MaliciousIPData is a data structure representing malicious IP and its statistics
export class MaliciousIPData {
    constructor(iP, totalEvents, totalDevices, totalMaliciousIPs) {
        if (iP !== undefined) {
            this.ip = iP;
        }
        if (totalEvents !== undefined) {
            this.totalEvents = totalEvents;
        }
        if (totalDevices !== undefined) {
            this.totalDevices = totalDevices;
        }
        if (totalMaliciousIPs !== undefined) {
            this.totalMaliciousIPs = totalMaliciousIPs;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFsaWNpb3VzSVBEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXB1bHNlLWxpYi9zcmMvbGliL2NvbW1vbi9NYWxpY2lvdXNJUERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsbUZBQW1GO0FBQ25GLE1BQU0sT0FBTyxlQUFlO0lBY3ZCLFlBQVksRUFBVyxFQUFFLFdBQW9CLEVBQUUsWUFBcUIsRUFBRSxpQkFBMEI7UUFDN0YsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FBRTtRQUN2QyxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztTQUFFO1FBQ2xFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQUU7UUFDckUsSUFBSSxpQkFBaUIsS0FBSyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7U0FBRTtJQUN4RixDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4vLyBNYWxpY2lvdXNJUERhdGEgaXMgYSBkYXRhIHN0cnVjdHVyZSByZXByZXNlbnRpbmcgbWFsaWNpb3VzIElQIGFuZCBpdHMgc3RhdGlzdGljc1xuZXhwb3J0IGNsYXNzIE1hbGljaW91c0lQRGF0YSB7XG4gXG4gICAgLy8gVGhlIG1hbGljaW91cyBJUCBcbiAgICBwdWJsaWMgaXA6IHN0cmluZztcbiBcbiAgICAvLyBUb3RhbCByZWxhdGVkIGV2ZW50cyBcbiAgICBwdWJsaWMgdG90YWxFdmVudHM6IG51bWJlcjtcbiBcbiAgICAvLyBUb3RhbCByZWxhdGVkIGRldmljZXMgXG4gICAgcHVibGljIHRvdGFsRGV2aWNlczogbnVtYmVyO1xuIFxuICAgIC8vIFRvdGFsIHN1c3BpY2lvdXMgSVBzIFxuICAgIHB1YmxpYyB0b3RhbE1hbGljaW91c0lQczogbnVtYmVyO1xuIFxuICAgICBjb25zdHJ1Y3RvcihpUD86IHN0cmluZywgdG90YWxFdmVudHM/OiBudW1iZXIsIHRvdGFsRGV2aWNlcz86IG51bWJlciwgdG90YWxNYWxpY2lvdXNJUHM/OiBudW1iZXIpIHsgXG4gICAgICAgIGlmIChpUCAhPT0gdW5kZWZpbmVkKSB7IHRoaXMuaXAgPSBpUDsgfVxuICAgICAgICBpZiAodG90YWxFdmVudHMgIT09IHVuZGVmaW5lZCkgeyB0aGlzLnRvdGFsRXZlbnRzID0gdG90YWxFdmVudHM7IH1cbiAgICAgICAgaWYgKHRvdGFsRGV2aWNlcyAhPT0gdW5kZWZpbmVkKSB7IHRoaXMudG90YWxEZXZpY2VzID0gdG90YWxEZXZpY2VzOyB9XG4gICAgICAgIGlmICh0b3RhbE1hbGljaW91c0lQcyAhPT0gdW5kZWZpbmVkKSB7IHRoaXMudG90YWxNYWxpY2lvdXNJUHMgPSB0b3RhbE1hbGljaW91c0lQczsgfVxuICAgIH1cblxufVxuXG5cbiJdfQ==