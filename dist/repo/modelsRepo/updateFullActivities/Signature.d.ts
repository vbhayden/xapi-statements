import Member from 'jscommons/dist/utils/Member';
import LanguageMap from '../../../models/LanguageMap';
import ClientModel from '../../../models/ClientModel';
export interface Update {
    readonly activityId: string;
    readonly name: LanguageMap;
    readonly description: LanguageMap;
    readonly extensions: LanguageMap;
    readonly moreInfo?: string;
    readonly type?: string;
}
export interface Opts {
    readonly updates: Update[];
    readonly client: ClientModel;
}
declare type Signature = Member<Opts, void>;
export default Signature;
