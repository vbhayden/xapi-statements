import Extensions from '../../models/Extensions';
import LanguageMap from '../../models/LanguageMap';
interface GetFullActivityResult {
    readonly id: string;
    readonly name: LanguageMap;
    readonly description: LanguageMap;
    readonly extensions: Extensions;
    readonly type?: string;
    readonly moreInfo?: string;
}
export default GetFullActivityResult;
