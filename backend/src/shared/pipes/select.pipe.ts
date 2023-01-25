import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ParseArrayPipe,
} from '@nestjs/common';

@Injectable()
export class ParseSelectPipe extends ParseArrayPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value == undefined) return undefined;

    const selectArray = await super.transform(value, metadata);

    const select = {};
    for (let i = 0; i < selectArray.length; i++) {
      const element = selectArray[i];
      select[element] = true;
    }

    return select;
  }
}
