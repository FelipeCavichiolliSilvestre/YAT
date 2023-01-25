type NumberWhere = {
  eq?: number;
  lt?: number;
  gt?: number;
  gte?: number;
  lte?: number;
};

type StringWhere = {
  endsWith?: string;
  contains?: string;
  startsWith?: string;
};

export type Where<Entity> = {
  [K in keyof Entity]?: Entity[K] extends string
    ? StringWhere | string
    : Entity[K] extends number
    ? NumberWhere | number
    : Entity[K] extends boolean
    ? boolean
    : Entity[K] extends Array<any>
    ? never
    : Entity[K] extends Date
    ? Date
    : Where<Entity[K]>;
};
