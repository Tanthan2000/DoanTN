request = {
  'maSinhVien': '19T1021237',
  'maLop': 'K43C',
  'maHocKi': '2',
  'maNamHoc': '2022-2023'
}
function login(){
  var url ="https://ums-dev.husc.edu.vn/apigateway/account/v1/authorize/student";
  var UserName = document.getElementById("UserName").value;
  var Password = document.getElementById("Password").value;
  var headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "ums-application": "TestApp",
      "ums-time":"20220401230000",
      "ums-signature":"1adcbf88065227d7c8cdbaf25be7aa00",
  }
  
  callApi(url,'Post', headers, {
    "UserName": UserName,
    "Password": CryptoJS.MD5(Password).toString(),
  }).then(data => {
    console.log(data);
    if(data.data.Data == null){
      alert(data.data.Msg);
    }else{
      localStorage.setItem('loginInfo', JSON.stringify(data.data.Data));
      var url = "http://ums-dev.husc.edu.vn/apigateway/account/v1/profile";
      var headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "ums-application": "TestApp",
        "ums-time":"20220401230000",
        "ums-signature":"1adcbf88065227d7c8cdbaf25be7aa00",
        "ums-token": data.data.Data.Token,
      }
      callApi(url,"get", headers, null,).then(data => {
        console.log(data.data.Data);
        localStorage.setItem('infoStudent',JSON.stringify(data.data.Data));
        window.location = "http://127.0.0.1:5500/student/"+ "home-student.html";        
      });
     
    }
  });
};

