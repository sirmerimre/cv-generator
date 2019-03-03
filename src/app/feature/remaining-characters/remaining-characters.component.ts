import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-remaining-characters',
  template: `
    <div>
      <span style="opacity: 0.5; font-size: 12px">(remaining characters) </span>{{maxLength - textToCheck.length}} / {{maxLength}}
    </div>`,
})
export class RemainingCharactersComponent {

  @Input()
  set textToCheck(text: string) {
    this._textToCheck = text;
  }

  @Input()
  set maxLength(length: number) {
    this._maxLength = length;
  }

  _textToCheck: string;
  _maxLength: number;

  get textToCheck(): string {
    return this._textToCheck;
  }

  get maxLength(): number {
    return this._maxLength;
  }

}
