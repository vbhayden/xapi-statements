import { S3 } from 'aws-sdk';
declare const _default: {
    llClientInfoEndpoint: string;
    lang: string;
    defaultTimeout: number;
    repoFactory: {
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
    };
    service: {
        enableConflictChecks: boolean;
        enableAttachmentValidation: boolean;
        enableVoidingChecks: boolean;
        enableStatementCreation: boolean;
        enableAttachmentCreation: boolean;
        enableVoiding: boolean;
        enableReferencing: boolean;
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
    };
    mongo: {
        url: string;
    };
};
export default _default;
