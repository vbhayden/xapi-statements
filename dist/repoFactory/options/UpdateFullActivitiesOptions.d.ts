import LanguageMap from '../../models/LanguageMap';
import ClientModel from '../../models/ClientModel';
export interface Update {
    readonly activityId: string;
    readonly name: LanguageMap;
    readonly description: LanguageMap;
    readonly extensions: LanguageMap;
    readonly moreInfo?: string;
    readonly type?: string;
}
interface UpdateFullActivitiesOptions {
    readonly updates: Update[];
    readonly client: ClientModel;
}
export default UpdateFullActivitiesOptions;
