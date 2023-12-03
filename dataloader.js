import {
    CONTEXT_V1 as odrlCtx,
    CONTEXT_URL_V1 as odrlCtxUrl
} from '@digitalbazaar/odrl-context';
import {
    CONTEXT_V1 as vcExamplesV1Ctx,
    CONTEXT_URL_V1 as vcExamplesV1CtxUrl
} from '@digitalbazaar/credentials-examples-context';
import dataIntegrityContext from '@digitalbazaar/data-integrity-context';
import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {Ed25519Signature2018} from '@digitalbazaar/ed25519-signature-2018';
import multikeyContext from '@digitalbazaar/multikey-context';
import jsigs from 'jsonld-signatures';
import jsonld from 'jsonld';
import * as vc from '@digitalbazaar/vc';

const remoteDocuments = new Map();
remoteDocuments.set(vcExamplesV1CtxUrl, vcExamplesV1Ctx);
remoteDocuments.set(odrlCtxUrl, odrlCtx);
remoteDocuments.set(
    dataIntegrityContext.constants.CONTEXT_URL,
    dataIntegrityContext.contexts.get(
        dataIntegrityContext.constants.CONTEXT_URL));
remoteDocuments.set(
    multikeyContext.constants.CONTEXT_URL,
    multikeyContext.contexts.get(
        multikeyContext.constants.CONTEXT_URL));

const {extendContextLoader} = jsigs;
const {defaultDocumentLoader} = vc;

export const dataloader = extendContextLoader(async url => {
    console.log('url', url);
    const remoteDocument = remoteDocuments.get(url);
    if (remoteDocument) {
        return {
            contextUrl: null,
            document: jsonld.clone(remoteDocument),
            documentUrl: url
        };
    }
    return defaultDocumentLoader(url);
});

console.log('dataloader', dataloader);