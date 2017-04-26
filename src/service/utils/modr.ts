export type Path = string[];
export type Modifier = (data: any, path: Path) => any;
export type Schema = { [key: string]: Modifier };

export const defaultValue = (value: any): Modifier => {
  return (data) => {
    return data === undefined ? value : data;
  };
};

export const overrideValue = (value: any): Modifier => {
  return () => {
    return value;
  };
};

export const keepValue: Modifier = (data) => data;

export const modifyType = (type: any, modifier: Modifier): Modifier => {
  return (data, path) => {
    return (
      data !== undefined && data !== null && data.constructor === type ?
      modifier(data, path) :
      data
    );
  };
};

export const modifySchema = (schema: Schema) => {
  return modifyType(Object, (data, path) => {
    return Object.keys(schema).reduce((newData, key) => {
      const value = schema[key](data[key], [...path, key]);
      return {
        ...newData,
        ...(value === undefined ? {} : { [key]: value }),
      };
    }, data);
  });
};

export const modifyStrictSchema = (schema: Schema) => {
  return modifyType(Object, (data, path) => {
    return Object.keys(schema).reduce((newData, key) => {
      const value = schema[key](data[key], [...path, key]);
      return {
        ...newData,
        ...(value === undefined ? {} : { [key]: value }),
      };
    }, {});
  });
};

export const modifyCollection = (modifier: (index: number) => Modifier) => {
  return modifyType(Array, (data, path) => {
    return data.map((elem: any, index: number) => {
      return modifier(index)(elem, [...path, index.toString()]);
    });
  });
};

export const composeModifiers = (modifiers: Modifier[]): Modifier => {
  return (data, path) => {
    return modifiers.reduce((result: any, modifier: Modifier) => {
      return modifier(result, path);
    }, data);
  };
};
