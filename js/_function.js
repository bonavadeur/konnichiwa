$(document).ready(function() {
    var rsa = forge.pki.rsa;
    var pki = forge.pki;

    // var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
    // var publicKey = keypair.publicKey;
    // var privateKey = keypair.privateKey;
    // console.log(pki.publicKeyToPem(publicKey));

    publicKey = `
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzaBQnc4VuSKxpYyxO1i
    TyHCMxHtx4BK5sg020aR2bj7LfDd2QaBeFxXc/XC0xDRjoyYNqTOrWE29hLrk+i9
    1Ypc1RGN25toIlE/W8GoWQiyDD0xXcPMraRY/VyF8XYncc1K/eDNdJjs+Oku0CxS
    hDa7pKVVv5NPHM/aoWv0PffB3are06j/uEKY70xf59DA6icGdiZfcyDflOm4f5Dl
    XJJ9rLqMVrzxinkX0nDYYY4jk9sbEkxWk71Vof6pGcsBqa8iIW8sDEZzOy2m4YpU
    ODlNukElIPRgKtKCEUrQdqa8z32/AASruM5Ld2Wi2y4cc1Xg7CV/Ki3rNv+hXSNf
    LwIDAQAB
    -----END PUBLIC KEY-----`;

    privateKey = `
    -----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAuzaBQnc4VuSKxpYyxO1iTyHCMxHtx4BK5sg020aR2bj7LfDd
    2QaBeFxXc/XC0xDRjoyYNqTOrWE29hLrk+i91Ypc1RGN25toIlE/W8GoWQiyDD0x
    XcPMraRY/VyF8XYncc1K/eDNdJjs+Oku0CxShDa7pKVVv5NPHM/aoWv0PffB3are
    06j/uEKY70xf59DA6icGdiZfcyDflOm4f5DlXJJ9rLqMVrzxinkX0nDYYY4jk9sb
    EkxWk71Vof6pGcsBqa8iIW8sDEZzOy2m4YpUODlNukElIPRgKtKCEUrQdqa8z32/
    AASruM5Ld2Wi2y4cc1Xg7CV/Ki3rNv+hXSNfLwIDAQABAoIBACOSA5VBWa8I1WVN
    /G92OwuV+nQBoBAbzB91QrW2/tdDUlY0QbKOjeL0iJk7xLydoXNYO0OGpM5EflDa
    32/G9Oqx01mYcD+dk3eRwFwKu5XPFSVGKy8JmMYVR+M7xSdPr8brnqgGIoNY2w2g
    IIjlIviD/bsWvugbcRikVYH+JPXw3WWZzSnVWBffa2W5/Mho0h8lCH+dl2SLc1il
    ArPBBKwG8rqkuzWKg6P/EQGyZDGB36VIXehHf+xWm2eHIncEGKzf5QJ/a10b6Aoi
    Z5Nni0yJh/lDMZF9cGO4UVQtccCzzB18FDyjORFvr5NSWFljU954LyCqtrzLmg1Y
    TdT1QmECgYEA9Va0POCQXDmVCbzVxpMJSxDAN8/y7+PKZFDrH+OzX8UHSn+JnImp
    vQ363uZ/x1efbw+PST+XvKOUB6khFr931jrFxctxpb+RR5p/mQbcHzfDqkrVfULP
    H+LC3j7QG67ywnZsIQ05UAaWamdYg9S4Bpv6+iY39LETx7etFG/pp90CgYEAw1ks
    r9reDBLgenM8kjWpOk+sjO3zJdUuBhPhFj/ZZrtoB0/n343M3n+P9vPuUFzImzSc
    BCNZj+igOQpUXIbDBETgmt4/BzwHYfGMtqWoEOYLdiXrOjvAD/w5pA8Hs2uRLOWG
    BwfwqH2nc8qv32FWpTk27nxfCd3K+CO+3zf/GHsCgYAdDLcqvixZvze2f3WQnbhr
    +v/HnAfX/9DnL+2nSP7kSCAk4hUZQ/OlPxKFciWPJQDr1ZvRwIXnADd28L/KQcGe
    zDa+xOggCB7bq5+QLw/BYoj4kQPWYSLFU8RfLHDX1k9IV11WTIqMvzrwPmxsr7Na
    lP2SwRO/FXiSHV2RHe88wQKBgFF1He02luDx/ikRZHCTb72g+5LIpltgSZC/OVzN
    wxnTi82AxG+z8XnWN3ICxZ09E2mkxmnzU6Vum2EtrX/nsepVzlLF2gJqRanRz5tZ
    +HsTcjQSG8RspeoEgwSmP8/RSvgtvXWxGekofGsMWcoMDNVYxk8sDXVPxxMx1KW/
    89+BAoGBAKRBx/1XT68gM4CFp20uiQTW3vFIa+Xp3XaLM6dEcssK7DMc5tkKQzeo
    ZRPzGZ2Z5XnSjANMzckGQiyq4y8VsTlpMNifFT9yGoX4LOUjBHQFAmto+m4ESXHf
    mJUa7ub4D4SQyK+IDEwyqCC230szr+1GZkAbJIkJootWeESHyiRG
    -----END RSA PRIVATE KEY-----`;

    publicKey = pki.publicKeyFromPem(publicKey);
    privateKey = pki.privateKeyFromPem(privateKey);
    // console.log(publicKey);
    // console.log(privateKey);

    // cert = {
    //     id: "Arisu",
    //     publicKey: `
    //     -----BEGIN PUBLIC KEY-----
    //     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzaBQnc4VuSKxpYyxO1i
    //     TyHCMxHtx4BK5sg020aR2bj7LfDd2QaBeFxXc/XC0xDRjoyYNqTOrWE29hLrk+i9
    //     1Ypc1RGN25toIlE/W8GoWQiyDD0xXcPMraRY/VyF8XYncc1K/eDNdJjs+Oku0CxS
    //     hDa7pKVVv5NPHM/aoWv0PffB3are06j/uEKY70xf59DA6icGdiZfcyDflOm4f5Dl
    //     XJJ9rLqMVrzxinkX0nDYYY4jk9sbEkxWk71Vof6pGcsBqa8iIW8sDEZzOy2m4YpU
    //     ODlNukElIPRgKtKCEUrQdqa8z32/AASruM5Ld2Wi2y4cc1Xg7CV/Ki3rNv+hXSNf
    //     LwIDAQAB
    //     -----END PUBLIC KEY-----`,
    //     outdate: "2023-5-24 12:00:00.000000"
    // };
    // cert = JSON.stringify(cert);
    // console.log(cert);

    // bytes = "konnichiwa";

    // var encrypted = publicKey.encrypt(bytes);
    // // console.log(forge.util.encode64(encrypted));

    // var decrypted = privateKey.decrypt(encrypted);
    // // console.log(decrypted.toString("utf8"));

    // var md = forge.md.sha256.create();
    // md.update('konnichiwa');
    // console.log(md.digest().toHex());

    // encrypted = rsa.encrypt(message, CAPrivateKey);

    message = "hello";
    e = forge.pki.rsa.encrypt(message, privateKey);
    console.log(forge.util.encode64(e));
    d = forge.pki.rsa.decrypt(e, publicKey);
    console.log(e.toString("utf8"));

    // var md = forge.md.sha1.create();
    // md.update('hello', 'utf8');
    // var signature = privateKey.sign(md);
    // var verified = publicKey.verify(md.digest().bytes(), signature);
    // console.log(forge.util.encode64(signature));
    // console.log(verified);
});