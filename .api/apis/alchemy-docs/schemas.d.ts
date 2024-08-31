declare const GetBalance: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "integer";
                readonly default: 1;
            };
            readonly jsonrpc: {
                readonly type: "string";
                readonly default: "2.0";
            };
            readonly method: {
                readonly default: "getBalance";
                readonly type: "string";
            };
            readonly params: {
                readonly type: "array";
                readonly prefixItems: {
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "Base-58 Encoded String - Pubkey of account to query.";
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly commitment: {
                                readonly type: "string";
                                readonly default: "processed";
                                readonly description: "Configures the commitment level of the blocks queried.\nAccepts one of the following strings: [\"finalized\", \"confirmed\", \"processed\"]\n";
                                readonly enum: readonly ["finalized", "confirmed", "processed"];
                            };
                            readonly minContextSlot: {
                                readonly type: "number";
                                readonly default: 165768577;
                                readonly description: "Set the minimum slot that the request can be evaluated at.";
                            };
                        };
                    }];
                };
                readonly items: {
                    readonly oneOf: readonly [{
                        readonly type: "string";
                        readonly description: "Base-58 Encoded String - Pubkey of account to query.";
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly commitment: {
                                readonly type: "string";
                                readonly default: "processed";
                                readonly description: "Configures the commitment level of the blocks queried.\nAccepts one of the following strings: [\"finalized\", \"confirmed\", \"processed\"]\n\nDefault: `processed`";
                                readonly enum: readonly ["finalized", "confirmed", "processed"];
                            };
                            readonly minContextSlot: {
                                readonly type: "number";
                                readonly default: 165768577;
                                readonly description: "Set the minimum slot that the request can be evaluated at.";
                            };
                        };
                    }];
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly apiKey: {
                    readonly type: "string";
                    readonly default: "docs-demo";
                    readonly description: "<style>\n  .custom-style {\n    color: #048FF4;\n  }\n</style>\nFor higher throughput, <span class=\"custom-style\"><a href=\"https://alchemy.com/?a=docs-demo\" target=\"_blank\">create your own API key</a></span>\n";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["apiKey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: readonly ["object", "null"];
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                };
                readonly jsonrpc: {
                    readonly type: "string";
                };
                readonly result: {
                    readonly type: "object";
                    readonly properties: {
                        readonly context: {
                            readonly type: "object";
                            readonly properties: {
                                readonly slot: {
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly minimum: -9223372036854776000;
                                    readonly maximum: 9223372036854776000;
                                };
                            };
                        };
                        readonly value: {
                            readonly type: "number";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetBalance };
