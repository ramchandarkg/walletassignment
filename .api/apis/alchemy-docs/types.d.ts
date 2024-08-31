import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type GetBalanceBodyParam = FromSchema<typeof schemas.GetBalance.body>;
export type GetBalanceMetadataParam = FromSchema<typeof schemas.GetBalance.metadata>;
export type GetBalanceResponse200 = FromSchema<typeof schemas.GetBalance.response['200']>;
