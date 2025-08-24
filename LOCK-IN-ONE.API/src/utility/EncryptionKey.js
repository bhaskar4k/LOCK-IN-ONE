function GetOrganizationPasswordEncryptionKey (key) { 
    return key.slice(0, 64);
}

function GetOrganizationJwtTokenEncryptionKey (key) { 
    return key.slice(10, 74);
}


export default {
    GetOrganizationPasswordEncryptionKey,
    GetOrganizationJwtTokenEncryptionKey
}