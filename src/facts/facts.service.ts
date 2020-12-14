import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
var sleep = require('sleep');

@Injectable()
export class FactsService {
    
    private content: string[];

    constructor() {
        this.content = JSON.parse(fs.readFileSync(__dirname + "/templates/facts.json").toString("UTF-8"))
    }


    random() : string {
        let index = Math.floor(Math.random() * this.content.length)
        return this.content[index]
    }
    
}
