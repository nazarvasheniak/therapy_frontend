import { Injectable, EventEmitter } from '@angular/core';
import { Specialist } from '../models';

@Injectable()
export class StorageService {
    private selectedSpecialist = new EventEmitter<Specialist>(null);

    constructor () {
        
    }

    setSpecialist(specialist: Specialist) {
        this.selectedSpecialist.emit(specialist);
    }

    getSpecialist() {
        return this.selectedSpecialist;
    }
    
    resetSpecialist() {
        this.selectedSpecialist.emit(null);
    }
}