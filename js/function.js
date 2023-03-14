$(document).ready(function() {
    var rsa = forge.pki.rsa;
    var pki = forge.pki;

    CAPublicKey = `
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvYlCO8l2Vj5rS8IUxJsW
    bWUCQzuuy5pzjNqg3bT2eTYWmfMnUL/vdQcjk4+wUx1ZxrYv5MpPSYpKKc4eDUBv
    nivyRnQNu4+eT3nusbN9C4s2Uh7z3cNi/LFf9L/aFb8rwsljOYlEwH7qP56NkYg/
    1pdjTciTlp4/leZaSXpfI5rKhu68/6EoHTbt+Qn4qpszb3LKXMfhMtMXyqeUhoD5
    piwpq3jOzzhAz4rSOxCzUraXUkeko5OmrZzDd5BVgxjlJXc7KbjjsIlFKwITzCRh
    nRyxy8ceQa5SPbuB+GZUDr/IeknyMLiVTUGQAOIMfRzrcijFENmM/0+om5HjRdwY
    vwIDAQAB
    -----END PUBLIC KEY-----`;

    CAPrivateKey = `
    -----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAvYlCO8l2Vj5rS8IUxJsWbWUCQzuuy5pzjNqg3bT2eTYWmfMn
    UL/vdQcjk4+wUx1ZxrYv5MpPSYpKKc4eDUBvnivyRnQNu4+eT3nusbN9C4s2Uh7z
    3cNi/LFf9L/aFb8rwsljOYlEwH7qP56NkYg/1pdjTciTlp4/leZaSXpfI5rKhu68
    /6EoHTbt+Qn4qpszb3LKXMfhMtMXyqeUhoD5piwpq3jOzzhAz4rSOxCzUraXUkek
    o5OmrZzDd5BVgxjlJXc7KbjjsIlFKwITzCRhnRyxy8ceQa5SPbuB+GZUDr/Iekny
    MLiVTUGQAOIMfRzrcijFENmM/0+om5HjRdwYvwIDAQABAoIBAEhnwxGr6LURq1OJ
    lP12cZ7g03hzuFa3biUE8CdCFlY/v2qYZRCIAiYm0ARzA9z8fWtX9fvk/V0Ooz5N
    K1XMo9c82pTniMd6GfQqlHD2LHLYf6vnfyncllgKOqn5EIr2OPV0kZ9NPSJ8WWhs
    XZCXCCwmMR1p3lfPpGLTWPJw+R9UPjoPrZZRrb17uT4GbuIO4IRFBN1G/sJXMm7g
    ZuRyFWn5VQz/kOo3SDxE2J+uWuzjbhtAVV53VTcgdpVa63HbfSrPIPtPO+SnkGHj
    KRHGiTpIiU2jNkUvXymMEIgbMm/ZBrX+PeQ0d/heN9jnLZSyvEfPsySp7944wJJh
    6kEtKaECgYEA6C6uZy9aG6yaDT61k2Le55FwvKQeOAfpEJVIthUefOO1T69HiOk4
    3L8gpScgQSll0RV7F1Rj18OXK+D0ie8qQ5k2PrEuSAeaoNKBE9UCkcvt5ncd5/Tn
    eYrTyRl5nT7uo4gJrHMdPqkGEqYrhhHIc26xF7U8yvzhcMoRpXAtGm0CgYEA0Pqm
    bY6EHQNuy5rhSmc2HUoihHmDS5J/JUpdYN4r8njv2NDprTJGsoRbupcemL0mH/J0
    73v3XjTai/QsyA1rWTYSe9pVcdwv0+YbstD5sq/pgxO+5AC5jNFiZ3nR5duaGy5T
    Nff9S3eLxr1q1Se3mmKlAZxEFC2don9OIZTSBFsCgYEA2UY9/N+qEjW+X+CsKMWg
    VNGcz1tB0CtO5i7dQU+YHUU1+eDML4oYpTLSiNqJa5Ei77uLWfSmDlbBk9VK4f2G
    7oVk5twFtHAxOohjNDzkz60n7sDPoq5jIzFQKWOGlCk9RplafB+pYWbpAPCx0B+6
    FpOic84tmsN08IiYZNoJyy0CgYAUFSJNQPbdOuk408d2uPhwVCGBDZRafNePI9hZ
    aMBcatbRxTHPnRdCLIoMIl2kW/j/9PLb2NPqz7V44Zw0FWYNiq64DEFN0dUezew3
    gPGeBF2yZQFhM9ig+bY1L3XGWxYyKn+AnjZPPEvIa4eKuGhig7xLrVK1hbSyWv2N
    KJoOJQKBgQDTKUqg/km/Mu70VzZ27jy+3AymCMqOKQw5Rj3F0UIdExccDDBY6rL8
    eb3P6sJ1qZvYoN0p1i8X4uw466rCFAu+Gqh+xPcavOIrIzaFmXPkbgdBW7gC88c0
    1aoL44fQBsYUNpTIda9yL6elX4QUoWk0/2IiSfvyEuQ7dvQHZ6Ew6A==
    -----END RSA PRIVATE KEY-----`;

    CAPublicKey = pki.publicKeyFromPem(CAPublicKey);
    CAPrivateKey = pki.privateKeyFromPem(CAPrivateKey);

    // const _encrypt =(key, plaintext)=>{
    //     const len = 32;
    //     const result = [];
    //     const splitCount = Math.ceil(plaintext.length / len);
    //     for (let i = 0; i < splitCount; i++) {
    //         result.push(plaintext.substring(i * len, (i + 1) * len));
    //     }
    //     console.log(result);
    //     // return result.map((str) => forge.util.bytesToHex(key.encrypt(str))).join('');
    //     return result.map((str) => forge.util.encode64(key.encrypt(str))).join('');
    // };

    // const _decrypt =(key, plaintext)=>{
    //     const len = 256;
    //     const result = [];
    //     const splitCount = Math.ceil(plaintext.length / len);
    //     for (let i = 0; i < splitCount; i++) {
    //         result.push(plaintext.substring(i * len, (i + 1) * len));
    //     }
    //     return result.map((str) => forge.util.encode64(key.decrypt(str))).join('');
    // };

    // cert = {
    //     id: "Bobu",
    //     // publicKey: `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFCGPSiMNHLqehD4gpPRPNw+G/EuHKtlXzi59fmpOJB6IvphaMecvOOZQmavcnynrFHxZaAtVe2LAntPLK+bUZiVBEdXkbCM0YD8TgkgR395Q43YPz5t5PgN4rmLu6WOPwHGwlM6fOrsaEeDvFlxjrYKq15w+OISNHbBHvWg1QOwIDAQAB-----END PUBLIC KEY-----`,
    //     outdate: "2023-5-24 12:00:00.000000"
    // };
    // cert = JSON.stringify(cert);
    // console.log(cert);

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
    publicKey = pki.publicKeyFromPem(publicKey);

    $("#send").click(function() {
        message = $("#message").val();
        privateKey = pki.privateKeyFromPem($("#privateKey").val());
        messageDigest = forge.md.sha256.create();
        messageDigest.update(message, 'utf8');
        signature = forge.util.encode64(privateKey.sign(messageDigest));
        $("#signature").text(signature);
        // console.log(forge.util.encode64(signature));
        // verified = publicKey.verify(md.digest().bytes(), signature);
        // console.log(verified);
        request = {
            username: $("#username").val(),
            password: $("#password").val(),
            receiver: $("#receiver").val(),
            cert: $("#cert").val(),
            message: message,
            // privateKey: pki.privateKeyToPem(privateKey),
            signature: signature
        };
        // console.log(JSON.stringify(request));
        // const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
        fetch('http://konnichiwa.bonavadeur.xyz/api/send', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // "X-CSRF-Token": csrfToken,
                // "Access-Control-Allow-Origin" : "*", 
                // "Access-Control-Allow-Credentials" : true,
            },
            // credentials: "same-origin",
            // mode: 'no-cors',
            body: JSON.stringify(request)
        }).then(response => {
            return response.json();
        }).then(result => {
            console.log(result);
        });
    });

    // var md = forge.md.sha1.create();
    // md.update('sign this', 'utf8');
    // var signature = privateKey.sign(md);

    // encrypted = CAPublicKey.encrypt(cert);
    // console.log(forge.util.encode64(encrypted));

    // decrypted = CAPrivateKey.decrypt(encrypted);
    // console.log(decrypted.toString("utf8"));

    // cert = rsa.encrypt(CAPrivateKey, cert);
    // console.log(forge.util.encode64(cert));
    // cert = rsa.decrypt(true, cert, CAPublicKey, true, false);
    // console.log(cert.toString("utf8"));









    // REFRESH
    $("#refresh").click(function() {
        request = {
            username: $("#username").val(),
            password: $("#password").val(),
        };
        fetch('http://konnichiwa.bonavadeur.xyz/api/refresh', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        }).then(response => {
            return response.json();
        }).then(result => {
            msgList = '';
            $("#msgList").html(msgList);
            count = 0;
            result.forEach(element => {
                count += 1;
                msgList = `
                <div class="accordion-items mb-1">
                        <h2 class="accordion-header">
                            <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                                data-bs-target="#${element.sender}${count}">
                                ${element.sender}
                            </button>
                        </h2>
                        <div class="accordion-collapse collapse show" id="#${element.sender}${count}">
                            <div class="row">
                                <div class="col">
                                    <label for="message" class="form-label">Message</label>
                                    <textarea type="text" id="message${count}" class="form-control" style="height: auto;" readonly>${element.message}</textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label for="cert" class="form-label">Certificate</label>
                                    <textarea type="text" id="cert${count}" class="form-control" style="height: auto" readonly>${element.cert}</textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label for="signature" class="form-label">Signature</label>
                                    <textarea type="text" id="signature${count}" class="form-control" style="height: auto" readonly>${element.signature}</textarea>
                                </div>
                            </div>
                            <div class="row m-2">
                                <button type="button" class="btn btn-danger" id="verify${count}">VERIFY</button>
                            </div>
                        </div>
                    </div>
                    `;
                $("#msgList").append(msgList);
                $(`#verify${count}`).click(generate_handler(element.cert, element.sender, element.signature));
            });
            // $("#msgList").html(msgList);
            // $(`#verify1`).click(generate_handler(1, count));
            
            console.log(result);
        });
    });

    function generate_handler(cert, sender, signature) {
        return function() {
            // certificate = $(`#cert${count}`).val();
            // console.log(cert);
            body = {
                "sender": sender,
                "cert": cert
            };
            console.log(JSON.stringify(body));
            // const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;
            fetch('http://ca.bonavadeur.xyz/api/verify', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(response => {
                return response.json();
            }).then(result => {
                // console.log(result);
                if(result != "wrong") {
                    // publicKey = pki.publicKeyFromPem(result);
                    // md = rsa.decrypt(signature, publicKey);
                    // hash = 
                    // var md = forge.md.sha256.create();
                    // md.update('sign this', 'utf8');
                    // console.log(md);
                    // verified = publicKey.verify(md.digest().bytes(), signature);
                    // console.log(verified);

                    window.alert("CERT IS VALID");
                } else {
                    // console.log(result);
                    window.alert("CERT IS NOT VALID");
                }
                
            });
        }
    }

    

});