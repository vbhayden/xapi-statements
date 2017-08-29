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
    };
    objectType: string;
    id: string;
};
