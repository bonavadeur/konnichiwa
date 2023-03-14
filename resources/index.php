<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="logo.png"/>
    <link href="style.css" rel="stylesheet">
    <link href="bootstrap.css" rel="stylesheet">
    <title>Kontenaru</title>
</head>
<body>
    <div class="container text-center">
        <div class="row justify-content-center">
            <div class="col">
                <img src="kontenaru.png" style="width:40%">
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <textarea class="form-control" placeholder="Nhập đoạn code cần chạy vào đây" id="codeInput" style="height: 100px"></textarea>
                <button type="button" class="btn btn-danger">Chạy code</button>
                <!-- <label for="floatingTextarea2">Comments</label> -->
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <label for="result">Kết quả</label>
                <textarea class="form-control" id="result" style="height: 100px;" readonly>
                </textarea>
            </div>
        </div>

    </div>
</body>
</html>