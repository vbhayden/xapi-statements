export declare type Modifier = (data: any) => any;
export declare type Schema = {
    [key: string]: Modifier;
};
export declare const defaultValue: (value: () => any) => Modifier;
export declare const overrideValue: (value: any) => Modifier;
export declare const keepValue: Modifier;
export declare const modifyType: (type: any, modifier: Modifier) => Modifier;
export declare const modifySchema: (schema: Schema) => Modifier;
export declare const modifyRestrictedSchema: (schema: Schema) => Modifier;
export declare const modifyCollection: (modifier: (index: number) => Modifier) => Modifier;
export declare const composeModifiers: (modifiers: Modifier[]) => Modifier;
