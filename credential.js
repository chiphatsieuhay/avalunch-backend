export const credential = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "credential:schema:event:hackathon"
    ],
    "type": [
        "VerifiableCredential",
        "AccessPassCredential"
    ],
    "credentialSubject": {
        "id": "did:key:abc",
        "type": "AccessPass",
        "eventName": "Hackathon Avax 2023",
        "passId": "abc-123-xyz",
        "name": "Patrick Nguyen",
        "startDate": "November 2, 2023",
        "endDate": "November 2, 2023",
        "location": "Ha Noi, Viet Nam"
    }
};