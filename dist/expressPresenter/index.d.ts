import { Router } from 'express';
import Config from './Config';
export interface Result {
    readonly aboutRouter: Router;
    readonly fullActivitiesRouter: Router;
    readonly statementsRouter: Router;
}
declare const _default: (config: Config) => Result;
export default _default;
