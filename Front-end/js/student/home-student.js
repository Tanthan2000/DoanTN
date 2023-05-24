const init = (async () => {
  checkLogin('student');
})()

var infoStudent = JSON.parse(localStorage.getItem('infoStudent'));
var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
//list đánh giá
/**
 * 0 chưa đánh giá
 * 1 sv đã đánh giá
 * 2 bcs đã đánh giá
 * 3 cvht đã đánh giá
 * 4 hdk đã đánh giá
 * 5 đánh giá xong
 */
 
const getStudent  = async () =>{
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "ums-application": "TestApp",
    "ums-time":"20220401230000",
    "ums-signature":"1adcbf88065227d7c8cdbaf25be7aa00",
    "ums-token": '0Z3o0S0K1j1n1H0o3A2L29340T0Z2C0R3Y1K0G1X0X3G0S2T2Y2m2Y1j3m0N0N0t1q3t3G082I0f3w0U0d131_271q1l0t0.1f272U2J091.290g0b100q3r3b3c1S3P271C2S0X3R2s193n1U2i2v1K1O3T2z3D'
}
  callApi('http://ums-dev.husc.edu.vn/apigateway/student-services/v1/get-students-of-class?classId=2019.102.03&semester=2020-2021.1','post',headers,null).then(res =>{
    console.log(res);
  })
} 
getStudent();

var listEvaluate = [
  {maHK:'2', maNH:'2022-2023', noidung:'Học kỳ 2, năm học 2022-2023',batdau:'12/5/2023',ketthuc:'23/5/2023'},
  {maHK:'1', maNH:'2022-2023', noidung:'Học kỳ 1, năm học 2022-2023',batdau:'5/12/2022',ketthuc:'25/12/2023'},
  {maHK:'2', maNH:'2021-2022', noidung:'Học kỳ 2, năm học 2021-2022',batdau:'12/5/2022',ketthuc:'23/5/2022'},
  {maHK:'1', maNH:'2021-2022', noidung:'Học kỳ 1, năm học 2021-2022',batdau:'10/12/2023',ketthuc:'25/12/2023'},
  {maHK:'2', maNH:'2020-2021', noidung:'Học kỳ 2, năm học 2020-2021',batdau:'12/5/2023',ketthuc:'23/5/2023'},
  {maHK:'1', maNH:'2020-2021', noidung:'Học kỳ 1, năm học 2020-2021',batdau:'5/12/2022',ketthuc:'25/12/2023'},
  {maHK:'2', maNH:'2019-2020', noidung:'Học kỳ 2, năm học 2019-2020',batdau:'12/5/2022',ketthuc:'23/5/2022'},
  {maHK:'1', maNH:'2019-2020', noidung:'Học kỳ 1, năm học 2019-2020',batdau:'10/12/2023',ketthuc:'25/12/2023'},
]; 
var maLop = "K43C-CNTT";
if(infoStudent.MaSinhVien == '19T1021237'){
  document.getElementById('message').innerHTML = `<li>
  Bạn đang đảm nhiệm vai trò đánh giá điểm cho các bạn trong lớp <a href="bcs-home-student.html"> <strong>nhấn vào đây</strong> </a> để thực hiện.
  </li>`;
}
var tableEvaluate = document.getElementById('table-evaluate');

const loadTable = async () => {
  let strHTML1 = `<table class="table table-bordered">
  <thead>
      <tr>
          <th scope="col">#</th>
          <th class="text-center" scope="col">Học kì-Năm học</th>    
          <th class="text-center" scope="col">Bắt đầu</th>   
          <th class="text-center" scope="col">Kết thúc</th>                              
          <th class="text-center">Trạng thái</th>
          <th scope="col"></th>
          
      </tr>
  </thead>
  <tbody>`;
    for(i=0; i< listEvaluate.length; i++){
      await callApi('http://localhost:8080/checkEvaluate', 'post',null ,{
      "maSinhVien": infoStudent.MaSinhVien ,
      "maLop": maLop,
      "maHocKi": listEvaluate[i].maHK,
      "maNamHoc": listEvaluate[i].maNH,
    }).then( res =>{
      console.log(res);
      //Thông báo khi bcs lớp yêu cầu làm lại đánh giá
      if( res.data.data.ma == 0){
        var element = document.getElementById('message');
        var messageHTML = "";
        for( j=0 ;j< element.children.length ;j++){
          messageHTML += element.children.item(j).outerHTML;
        }
        messageHTML += `<li> BCS lớp yêu cầu bạn làm lại phiếu đánh giá. </li>`;
        element.innerHTML = messageHTML;
      }
      // thông báo ko thể tạo đánh giá khi BCS đã nộp
      if( res.data.data.ma == -2){
        var element = document.getElementById('message');
        var messageHTML = "";
        for( j=0 ;j< element.children.length ;j++){
          messageHTML += element.children.item(j).outerHTML;
        }
        messageHTML += `<li> Bạn không thể thực hiện đánh giá do BCS lớp đã gửi đánh giá. </li>`;
        element.innerHTML = messageHTML;
      }
      var requestNavigation =`{'maHK':'${listEvaluate[i].maHK}', 'maNH':'${listEvaluate[i].maNH}',
      'batdau':'${listEvaluate[i].batdau}','ketthuc':'${listEvaluate[i].ketthuc}'}`;
      if(i==0){
        strHTML1 +=`<tr>
                  <th scope="row">${i+1}</th>
                  <td>${listEvaluate[i].noidung}</td>
                  <td>${listEvaluate[i].batdau}</td>
                  <td>${listEvaluate[i].ketthuc}</td>
                  <td class="${res.data.data.trangthai==5?'text-success':'text-danger'}"> ${res.data.data.noiDung}</td>                          
                  <td class="text-center">
                  ${res.data.data.ma == -2 ?``:`${res.data.data.ma == "0" || res.data.data.ma == -1?`<a href="#" onclick="navigationPage('evaluate-student.html', ${requestNavigation})">
                  <i style="font-size: 16px;" class="fa fa-pencil-square-o" aria-hidden="true"></i></a>`:
                  `<a href="detail-history-evaluate-student.html"><i style="font-size: 16px;" class="fa fa-history" aria-hidden="true"></i></a>`}`}  
                  </td>
                </tr>`;
                
      }else{
        strHTML1 +=`<tr>
        <th scope="row">${i+1}</th>
        <td>${listEvaluate[i].noidung}</td>
        <td>${listEvaluate[i].batdau}</td>
        <td>${listEvaluate[i].ketthuc}</td>
        <td class="text-success"> Đã đánh giá xong</td>                          
        <td class="text-center">
        
        <a href="detail-history-evaluate-student.html"><i style="font-size: 16px;" class="fa fa-history" aria-hidden="true"></i></a>
        
        </td>
      </tr>`;
      }
     
    })
  }
  strHTML1 += `</tbody></table>`;
  tableEvaluate.innerHTML = strHTML1;
 };
loadTable();


            