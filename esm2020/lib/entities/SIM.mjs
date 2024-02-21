// SIM entity represents a physical SIM (Subscriber Identity Module) card used in an IoT device to access the internet via a cellular provider
export class SIM {
    constructor(iCCID, iMSI, mSISDN) {
        if (iCCID !== undefined) {
            this.iccid = iCCID;
        }
        if (iMSI !== undefined) {
            this.imsi = iMSI;
        }
        if (mSISDN !== undefined) {
            this.msisdn = mSISDN;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lNLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXB1bHNlLWxpYi9zcmMvbGliL2VudGl0aWVzL1NJTS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSw4SUFBOEk7QUFDOUksTUFBTSxPQUFPLEdBQUc7SUFXWCxZQUFZLEtBQWMsRUFBRSxJQUFhLEVBQUUsTUFBZTtRQUN2RCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUFFO1FBQ2hELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDN0MsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FBRTtJQUN2RCxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4vLyBTSU0gZW50aXR5IHJlcHJlc2VudHMgYSBwaHlzaWNhbCBTSU0gKFN1YnNjcmliZXIgSWRlbnRpdHkgTW9kdWxlKSBjYXJkIHVzZWQgaW4gYW4gSW9UIGRldmljZSB0byBhY2Nlc3MgdGhlIGludGVybmV0IHZpYSBhIGNlbGx1bGFyIHByb3ZpZGVyXG5leHBvcnQgY2xhc3MgU0lNIHtcbiBcbiAgICAvLyBUaGUgdW5pcXVlIHNlcmlhbCBudW1iZXIsIGludGVncmF0ZWQgY2lyY3VpdCBjYXJkIGlkZW50aWZpY2F0aW9uIFxuICAgIHB1YmxpYyBpY2NpZDogc3RyaW5nO1xuIFxuICAgIC8vIFRoZSBpbnRlcm5hdGlvbmFsIG1vYmlsZSBzdWJzY3JpYmVyIGlkZW50aXR5IG51bWJlciBcbiAgICBwdWJsaWMgaW1zaTogc3RyaW5nO1xuIFxuICAgIC8vIE1vYmlsZSBTdWJzY3JpYmVyIElTRE4gTnVtYmVyICh0aGUgYWN0dWFsIHBob25lIG51bWJlciB3aXRoIHRoZSBjb3VudHJ5IHByZWZpeCkgXG4gICAgcHVibGljIG1zaXNkbjogc3RyaW5nO1xuIFxuICAgICBjb25zdHJ1Y3RvcihpQ0NJRD86IHN0cmluZywgaU1TST86IHN0cmluZywgbVNJU0ROPzogc3RyaW5nKSB7IFxuICAgICAgICBpZiAoaUNDSUQgIT09IHVuZGVmaW5lZCkgeyB0aGlzLmljY2lkID0gaUNDSUQ7IH1cbiAgICAgICAgaWYgKGlNU0kgIT09IHVuZGVmaW5lZCkgeyB0aGlzLmltc2kgPSBpTVNJOyB9XG4gICAgICAgIGlmIChtU0lTRE4gIT09IHVuZGVmaW5lZCkgeyB0aGlzLm1zaXNkbiA9IG1TSVNETjsgfVxuICAgIH1cblxufVxuXG5cbiJdfQ==