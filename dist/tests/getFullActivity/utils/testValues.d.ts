import ClientModel from '../../../models/ClientModel';
export declare const TEST_CLIENT: ClientModel;
export declare const TEST_FORBIDDEN_CLIENT: ClientModel;
export declare const TEST_ALLOWED_CLIENT: ClientModel;
export declare const TEST_OUTSIDE_ORG_CLIENT: ClientModel;
export declare const TEST_OUTSIDE_STORE_CLIENT: ClientModel;
export declare const TEST_ACTIVITY_ID = "http://www.example.org/fullActivityTest";
export declare const TEST_IMMUTABLE_ACTIVITY_ID = "http://www.example.org/fullActivityTest/immutable";
export declare const TEST_BASE_ACTIVITY: {
    objectType: string;
    id: string;
    definition: {
        name: {};
        description: {};
        extensions: {};
    };
};
export declare const TEST_ACTIVITY: {
    definition: {
        name: {
            'en-GB': string;
        };
        description: {
            'en-GB': string;
        };
        extensions: {
            'http://www.example.org/test_extension': number;
        };
        moreInfo: string;
        type: string;
    };
    objectType: string;
    id: string;
};
export declare const TEST_MERGE_ACTIVITY: {
    definition: {
        name: {
            'en-US': string;
        };
        description: {
            'en-US': string;
        };
        extensions: {
            'http://www.example.org/test_merge_extension': number;
        };
        moreInfo: string;
        type: string;
    };
    objectType: string;
    id: string;
};
export declare const TEST_IMMUTABLE_ACTIVITY: {
    id: string;
    definition: {
        name: {
            'en-US': string;
        };
        description: {
            'en-US': string;
        };
        extensions: {
            'http://www.example.org/test_merge_extension': number;
        };
        moreInfo: string;
        type: string;
    };
    objectType: string;
};
export declare const TEST_MERGED_ACTIVITY: {
    definition: {
        name: {
            'en-US': string;
            'en-GB': string;
        };
        description: {
            'en-US': string;
            'en-GB': string;
        };
        extensions: {
            'http://www.example.org/test_merge_extension': number;
            'http://www.example.org/test_extension': number;
        };
        moreInfo: string;
        type: string;
    };
    objectType: string;
    id: string;
};
