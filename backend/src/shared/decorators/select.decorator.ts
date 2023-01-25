import { Query } from '@nestjs/common';
import { ParseSelectPipe } from '@shared/pipes';

export function Select(): ParameterDecorator {
  return Query('select', ParseSelectPipe);
}
