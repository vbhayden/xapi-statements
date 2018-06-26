import { S3 } from 'aws-sdk';
declare const _default: {
    llClientInfoEndpoint: string;
    lang: string;
    defaultTimeout: number;
    redis: {
        url: string;
        prefix: string;
    };
    sentinel: {
        db: number;
        name: string;
        prefix: string;
        password: string;
        sentinels: {
            host: string;
            port: number;
        }[];
    };
    repoFactory: {
        eventsRepoName: string;
        authRepoName: string;
        modelsRepoName: string;
        storageRepoName: string;
    };
    winston: {
        console: {
            level: string;
        };
        cloudWatch: {
            enabled: boolean;
            level: string;
            logGroupName: string;
            logStreamName: string;
            awsConfig: {
                accessKeyId: string;
                secretAccessKey: string;
                region: string;
            };
        };
    };
    express: {
        port: number;
        customRoute: string;
        customRouteText: string;
        morganDirectory: string;
        bodyParserLimit: string;
        allowUndefinedMethod: boolean;
        allowFormBody: boolean;
    };
    service: {
        enableConflictChecks: boolean;
        enableAttachmentValidation: boolean;
        enableVoidingChecks: boolean;
        enableStatementCreation: boolean;
        enableAttachmentCreation: boolean;
        enableVoiding: boolean;
        enableNullRemoval: boolean;
        enableReferencing: boolean;
        enableActivityUpdates: boolean;
        awaitUpdates: boolean;
    };
    storage: {
        local: {
            storageDir: string;
        };
        s3: {
            bucketName: string;
            subFolder: string;
            awsConfig: S3.ClientConfiguration;
        };
        google: {
            bucketName: string;
            keyFileName: string;
            projectId: string;
            subFolder: string;
        };
    };
    mongo: {
        dbName: string;
        url: string;
    };
};
export default _default;
