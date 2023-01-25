import { Constructor } from '@shared/types';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

interface Config {
  isArray?: boolean;
}

export function OptionalBooleanType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => Boolean)(target, key);
    IsOptional()(target, key);
    IsBoolean({ each: config?.isArray })(target, key);
  };
}

export function BooleanType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => Boolean)(target, key);
    IsBoolean({ each: config?.isArray })(target, key);
  };
}

export function OptionalStringType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => String)(target, key);
    IsOptional()(target, key);
    IsString({ each: config?.isArray })(target, key);
  };
}

export function StringType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => String)(target, key);
    IsString({ each: config?.isArray })(target, key);
  };
}

export function OptionalNumberType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => Number)(target, key);
    IsOptional()(target, key);
    IsNumber({}, { each: config?.isArray })(target, key);
  };
}

export function NumberType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => Number)(target, key);
    IsNumber({}, { each: config?.isArray })(target, key);
  };
}

export function OptionalNumberStringType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => String)(target, key);
    IsOptional()(target, key);
    IsNumberString({ each: config?.isArray })(target, key);
  };
}

export function NumberStringType(config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => String)(target, key);
    IsNumberString({ each: config?.isArray })(target, key);
  };
}

export function OptionalNestedType(
  typeFunction: Constructor<any>,
  config?: Config,
): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => typeFunction)(target, key);
    IsOptional()(target, key);
    ValidateNested({ each: config?.isArray })(target, key);
  };
}

export function NestedType(
  typeFunction: Constructor<any>,
  config?: Config,
): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    Type(() => typeFunction)(target, key);
    ValidateNested({ each: config?.isArray })(target, key);
  };
}

export function RegexType(rgx: RegExp, config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    StringType(config)(target, key);
    Matches(rgx)(target, key);
  };
}

export function OptionalRegexType(
  rgx: RegExp,
  config?: Config,
): PropertyDecorator {
  return (target: any, key: string) => {
    OptionalStringType(config)(target, key);
    Matches(rgx)(target, key);
  };
}

export function EnumType(entity: object, config?: Config): PropertyDecorator {
  return (target: any, key: string) => {
    Expose()(target, key);
    IsEnum(entity, { each: config?.isArray })(target, key);
  };
}

export function OptionalEnumType(
  entity: object,
  config?: Config,
): PropertyDecorator {
  return (target: any, key: string) => {
    EnumType(entity, config)(target, key);
    IsOptional()(target, key);
  };
}
