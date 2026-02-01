export class Task {
    constructor({type,payload={},retries=0}){
        this.type = type;
        this.payload = payload;
        this.retries = retries;
    }
}