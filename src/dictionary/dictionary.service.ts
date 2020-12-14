import { Injectable } from '@nestjs/common';
var sleep = require('sleep');

@Injectable()
export class DictionaryService {

    private objects: Object;

    constructor() {
        this.objects = {}
    }

    set(id: string, value: any) {
        this.objects[id] = value
    }

    get(id: string) {
        return this.objects[id]
    }

    getSlow(id: string) {
        sleep.msleep(1000)
        return this.objects[id]
    }

}
