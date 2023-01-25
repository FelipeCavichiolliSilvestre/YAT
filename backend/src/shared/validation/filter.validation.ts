import {
  OptionalBooleanType,
  OptionalNumberType,
  OptionalStringType,
} from '@lib/decorators';

export class StringFiltering {
  @OptionalStringType()
  eq?: string;

  @OptionalStringType()
  endsWith?: string;

  @OptionalStringType()
  contains?: string;

  @OptionalStringType()
  startsWith?: string;
}

export class NumberFiltering {
  @OptionalNumberType()
  eq?: number;

  @OptionalNumberType()
  lt?: number;

  @OptionalNumberType()
  lte?: number;

  @OptionalNumberType()
  gt?: number;

  @OptionalNumberType()
  gte?: number;
}

export class BooleanFiltering {
  @OptionalBooleanType()
  eq?: boolean;

  @OptionalBooleanType()
  not?: boolean;
}
