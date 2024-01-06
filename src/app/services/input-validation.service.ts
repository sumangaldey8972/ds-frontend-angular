import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputValidationService {
  public validateInput(
    inputValue: string,
    regex: string,
    maxInputLength: number
  ): string {
    const newRegex = new RegExp(regex, 'ig');
    if (inputValue.length > maxInputLength) {
      inputValue = inputValue.slice(0, maxInputLength);
    }
    return inputValue.replace(newRegex, '');
  }
}
