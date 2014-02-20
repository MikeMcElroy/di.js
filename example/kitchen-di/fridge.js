import {Inject} from 'di/annotations';
import {Electricity} from './electricity';
import {Contents} from './fridge/contents';

@Inject(Electricity, Contents)
export class Fridge {
  constructor(electricity, contents) {
    this.electricity = electricity;
    this.contents = contents;
  }

  getEggs() {
    return '' + this.contents.eggs + ' eggs';
  }
}
