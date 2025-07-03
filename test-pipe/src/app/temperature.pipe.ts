import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number | string | null, inputType: 'C' | 'F', outputType?: 'C' | 'F') {
    if (!value) {
      return value;
    }
    let val: number;
    if (typeof value === 'string')
      val = parseFloat(value);
    else
      val = value;

    let output: number;
    if (inputType === 'F' && outputType === 'C') {
      output = (val - 32) * (5 / 9);
    } else if (inputType === 'C' && outputType === 'F') {
      output = val * (9 / 5) + 32;
    } else {
      output = val;
    }
    let sympol: '°C' | '°F';
    if (!outputType) {
      sympol = inputType === 'C' ? '°C' : '°F';
    } else {
      sympol = outputType === 'C' ? '°C' : '°F';
    }
    return `${output.toFixed(2)} ${sympol}`;
  }
}
