let strHtml ="";
// if sinh viên đã đánh giá load dữ liệu
//load title
var infoStudent = JSON.parse(localStorage.getItem('infoStudent'));
// lấy dữ liệu khi điều hướng
var dataNavigation = JSON.parse(localStorage.getItem('data'));
console.log(dataNavigation);
strHtml ="";
strHtml =`<div  class="info-student-evaluate" style="border-bottom: 1px dotted #808080 ; margin-bottom: 10px;"> 
            <label>Mã sinh viên: <b>${dataNavigation.maSV}</b></label>
            <label>Họ và tên: <b>${dataNavigation.hoVaTen}</b></label>                                                          
                                    
            <label>Ngày sinh: <b>${dataNavigation.ngaySinh}</b></label>                              
            <label>Lớp: <b>K43C-CNTT</b></label>                         
                                                    
            <label>Học kì: <b>${dataNavigation.maHK}</b></label>
            <label>Năm học: <b>${dataNavigation.maNH}</b></label>
        </div>
        <!--------thời gian đánh giá điểm rèn luyện---------->
        <span >Thời gian sinh viên bắt đầu đánh giá từ ngày <b>${dataNavigation.thoiGianBatDau}</b> đến ngày <b>${dataNavigation.thoiGianKetThuc}</b>.</span>     `;

document.getElementById('info-student-evaluate').innerHTML=strHtml;
var tableContent = document.getElementById('table-content');
// lấy dữ liệu người dùng nhập
// MucI (tc01 -> tc10)
// MucII (tc11 -> tc18)
// MucIII (tc19 -> tc24)
// Mục IV (tc25 -> tc28)
// Muc V (tc29 -> tc33)
var tc01 = 0,tc11 = 0;
var tc02 = 0,tc12 = 0;
var tc03 = 0,tc13 = 0;
var tc04 = 0,tc14 = 0;
var tc05 = 0,tc15 = 0;
var tc06 = 0,tc16 = 0;
var tc07 = 0,tc17 = 0;
var tc08 = 0,tc18 = 0;
var tc09 = 0,tc19 = 0;
var tc10 = 0,tc20 = 0;
var tc21 = 0,tc22 = 0;
var tc23 = 0,tc24 = 0;
var tc25 = 0,tc26 = 0;
var tc27 = 0,tc28 = 0;
var tc29 = 0,tc30 = 0;
var tc31 = 0,tc32 = 0;
var tc33 = 0;
tongmuc1 =0;
tongmuc2 =0;
tongmuc3 =0;
tongmuc4 =0;
//check dữ liệu form 
const checkTc02 = () => {
    var checktc02 = document.getElementsByName('tc02');
    var checktc03 = document.getElementsByName('tc03');
    
    if( checktc02[0].checked == true){
       if(checktc03[0].checked == true){
           checktc03[0].checked = false;
       }
       
    }
}
const checkTc03 = () => {
    var checktc02 = document.getElementsByName('tc02');
    var checktc03 = document.getElementsByName('tc03');
    
    if( checktc03[0].checked == true){
       if(checktc02[0].checked == true){
           checktc02[0].checked = false;
       }
       
    }
}
const checkNumber = (ma) => {
    var input = document.getElementsByName(ma);
    
    if(parseInt(input[0].value) > 5){
        input[0].value = 5;
    }else if(input[0].value < 0){
        input[0].value = 0;
    }

}
const checkForm = ()=> {
    /*-----------------------check muc I------------------------*/
    //tc01
    var check = false;
    var checkbox = document.getElementsByName("tc01");
    console.log(checkbox)
    for (var i = 0; i < checkbox.length; i++){
        if (checkbox[i].checked === true){           
            tc01 =  parseInt(checkbox[i].value);
            check = true;
            break;
        }
    }
    if(check == false){
        alert('Bạn chưa chọn tiêu chí 1');
        return false;
    }
    //tc02
    checkbox = document.getElementsByName("tc02");
    if(checkbox[0].checked == true){
        tc02 = parseInt(checkbox[0].value);
        console.log(tc02);
    }else{
        tc02 = 0;
    }
    //tc03
    checkbox = document.getElementsByName("tc03");
    if(checkbox[0].checked == true){
        tc03 = parseInt(checkbox[0].value);
    }else{
        tc03 = 0;
    }
    //tc04
    checkbox = document.getElementsByName("tc04");
    if(checkbox[0].checked == true){
        tc04 = parseInt(checkbox[0].value);
    }else{
        tc04 = 0;
    }
    //tc05
    checkbox = document.getElementsByName("tc05");
    if(checkbox[0].checked == true){
        tc05 = parseInt(checkbox[0].value);
    }else{
        tc05 = 0;
    }
    //tc06
    checkbox = document.getElementsByName("tc06");
    if(checkbox[0].checked == true){
        tc06 = parseInt(checkbox[0].value);
    }else{
        tc06 = 0;
    }
    //tc07
    checkbox = document.getElementsByName("tc07");
    if(checkbox[0].checked == true){
        tc07 = parseInt(checkbox[0].value);
    }else{
        tc07 = 0;
    }
    //tc08
    input = document.getElementsByName("tc08");
    tc08 = parseInt(input[0].value)*-4;
    //tc09
    input = document.getElementsByName("tc09");
    tc09 = parseInt(input[0].value)*-6;
    //tc10
    input = document.getElementsByName("tc10");
    tc10 = parseInt(input[0].value)*-10;

     tongmuc1 = tc01 + tc02 +tc03 + tc04 + tc05 + tc06 +tc07 +tc08 +tc09 + tc10;
    //điểm mục I
    console.log(tongmuc1);
    document.getElementById('tongMuc1BCS').innerText =`${tongmuc1} Đ`;
    //kiểm tra điểm tcI 
    if(tongmuc1 >20){
        alert(`Số điểm mục I của bạn > 20đ vượt mức quy định!`);
        return false;
    }
    /*-----------------------check muc II------------------------*/
    //tc11
    checkbox = document.getElementsByName("tc11");
    if(checkbox[0].checked == true){
        tc11 = parseInt(checkbox[0].value);
    }else{
        tc11 = 0;
    }
    //tc12
    checkbox = document.getElementsByName("tc12");
    if(checkbox[0].checked == true){
        tc12 = parseInt(checkbox[0].value);
    }else{
        tc12 = 0;
    }
    console.log(`dfdf:${tc12}`);
    //tc13
    checkbox = document.getElementsByName("tc13");
    if(checkbox[0].checked == true){
        tc13 = parseInt(checkbox[0].value);
    }else{
        tc13 = 0;
    }
    //tc14
    checkbox = document.getElementsByName("tc14");
    if(checkbox[0].checked == true){
        tc14 = parseInt(checkbox[0].value);
    }else{
        tc14 = 0;
    }
    //tc15
    checkbox = document.getElementsByName("tc15");
    if(checkbox[0].checked == true){
        tc15 = parseInt(checkbox[0].value);
    }else{
        tc15 = 0;
    }
    //tc16
    checkbox = document.getElementsByName("tc16");
    if(checkbox[0].checked == true){
        tc16 = parseInt(checkbox[0].value);
    }else{
        tc16 = 0;
    }
    //tc17
    input = document.getElementsByName("tc17");
    tc17 = parseInt(input[0].value)*-5;
    //tc18
    input = document.getElementsByName("tc18");
    tc18 = parseInt(input[0].value)*-10;
    //Tổng muc II 
    tongmuc2 = tc11 + tc12 +tc13 + tc14 + tc15 + tc16 +tc17 +tc18;
    //điểm mục II
    document.getElementById('tongMuc2BCS').innerText =`${tongmuc2} Đ`;
    if(tongmuc2 > 25){
        alert(`Số điểm mục II của bạn > 25đ vượt mức quy định!`);
        return false;
    }
    

    /*-----------------------check muc III------------------------*/
    //tc19
    input = document.getElementsByName("tc19");
    tc19 = parseInt(input[0].value)*3;
    //tc20
    checkbox = document.getElementsByName("tc20");
    if(checkbox[0].checked == true){
        tc20 = parseInt(checkbox[0].value);
    }else{
        tc20 = 0;
    }
    //tc21
    checkbox = document.getElementsByName("tc21");
    if(checkbox[0].checked == true){
        tc21 = parseInt(checkbox[0].value);
    }else{
        tc21 = 0;
    }
    //tc22
    checkbox = document.getElementsByName("tc22");
    if(checkbox[0].checked == true){
        tc22 = parseInt(checkbox[0].value);
    }else{
        tc22 = 0;
    }
    //tc23
    checkbox = document.getElementsByName("tc23");
    if(checkbox[0].checked == true){
        tc23 = parseInt(checkbox[0].value);
    }else{
        tc23 = 0;
    }
    //tc24
    input = document.getElementsByName("tc24");
    tc24 = parseInt(input[0].value)*-5;
    //tong mục III
    tongmuc3 = tc19 + tc20 +tc21 + tc22 + tc23 + tc24;
    document.getElementById('tongMuc3BCS').innerText= `${tongmuc3} Đ`; 
    if(tongmuc3 > 20){
        alert(`Số Đ mục III của bạn > 20đ vượt mức quy định!`);
        return false;
    }

    /*-----------------------check muc IV------------------------*/
    //tc25
    checkbox = document.getElementsByName("tc25");
    if(checkbox[0].checked == true){
        tc25 = parseInt(checkbox[0].value);
    }else{
        tc25 = 0;
    }
    //tc26
    checkbox = document.getElementsByName("tc26");
    if(checkbox[0].checked == true){
        tc26 = parseInt(checkbox[0].value);
    }else{
        tc26 = 0;
    }
    //tc27
    input = document.getElementsByName("tc27");
    tc27 = parseInt(input[0].value)*3;
    
    //tc28
    input = document.getElementsByName("tc28");
    tc28 = parseInt(input[0].value)*-10;
    console.log(`TC28:${tc28}`);
    //tong mục IV
    tongmuc4 = tc25 + tc26 +tc27 + tc28;
    document.getElementById('tongMuc4BCS').innerText= `${tongmuc4} Đ`;
    if(tongmuc4 > 25){
        alert(`Số điểm mục IV của bạn > 25đ vượt mức quy định!`);
        return false;
    }
     

    /*-----------------------check muc V------------------------*/
    //tc29
    checkbox = document.getElementsByName("tc29");
    if(checkbox[0].checked == true){
        tc29 = parseInt(checkbox[0].value);
    }else{
        tc29 = 0;
    }
    //tc30
    checkbox = document.getElementsByName("tc30");
    if(checkbox[0].checked == true){
        tc30 = parseInt(checkbox[0].value);
    }else{
        tc30 = 0;
    }
    //tc31
    checkbox = document.getElementsByName("tc31");
    if(checkbox[0].checked == true){
        tc31 = parseInt(checkbox[0].value);
    }else{
        tc31 = 0;
    }
    //tc32
    checkbox = document.getElementsByName("tc32");
    if(checkbox[0].checked == true){
        tc32 = parseInt(checkbox[0].value);
    }else{
        tc32 = 0;
    }
    //tc33
    checkbox = document.getElementsByName("tc33");
    if(checkbox[0].checked == true){
        tc33 = parseInt(checkbox[0].value);
    }else{ 
        tc33 = 0;
    }
    //tong mục V
    tongmuc5 = tc29 + tc30 +tc31 + tc32 + tc33 ;
    document.getElementById('tongMuc5BCS').innerText= `${tongmuc5} Đ`; 
    if(tongmuc5 > 10){
        alert(`Số điểm mục V của bạn > 10đ vượt mức quy định!`);
        return false;
    }
    // Tổng điểm
    document.getElementById('tongDiemBCS').innerText = `${tongmuc1 + tongmuc2 + tongmuc3 + tongmuc4 + tongmuc5} Đ`;
    return true;
}

request = {
    'maSinhVien': dataNavigation.maSV,
    'maLop': dataNavigation.maLop,
    'maHocKi': dataNavigation.maHK,
    'maNamHoc': dataNavigation.maNH,
}
// load form đánh giá của sinh viên
var diemSV1=0; diemBCS=0,tongDiemSV=0, tongDiemBCS =0;

callApi('http://localhost:8080/getPhieuDanhGia','post', null, request).then(res => {
    for(i =0 ;i < res.data.tieuChi.length;i++ ){
        //
        tongDiemSV += res.data.tieuChi[i].diemSV;
        tongDiemBCS += res.data.tieuChi[i].diemBCS;
        diemSV1 += res.data.tieuChi[i].diemSV;
        diemBCS += res.data.tieuChi[i].diemBCS;
        if( res.data.tieuChi[i].maTieuChi == 'tc10'){
            document.getElementById('tongMuc1SV').innerText = `${diemSV1}Đ`;
            document.getElementById('tongMuc1BCS').innerText = `${diemBCS}Đ`;
            diemSV1=0;diemBCS=0;
            
        }
        if( res.data.tieuChi[i].maTieuChi == 'tc18'){
            document.getElementById('tongMuc2SV').innerText = `${diemSV1}Đ`;
            document.getElementById('tongMuc2BCS').innerText = `${diemBCS}Đ`;
            diemSV1=0;diemBCS=0;
        }
        if( res.data.tieuChi[i].maTieuChi == 'tc24'){
            document.getElementById('tongMuc3SV').innerText = `${diemSV1}Đ`;
            document.getElementById('tongMuc3BCS').innerText = `${diemBCS}Đ`;
            diemSV1=0;diemBCS=0;
        }
        if( res.data.tieuChi[i].maTieuChi == 'tc28'){
            document.getElementById('tongMuc4SV').innerText = `${diemSV1}Đ`;
            document.getElementById('tongMuc4BCS').innerText = `${diemBCS}Đ`;
            diemSV1=0;diemBCS=0;
        }
        if( res.data.tieuChi[i].maTieuChi == 'tc33'){
            document.getElementById('tongMuc5SV').innerText = `${diemSV1}Đ`;
            document.getElementById('tongMuc5BCS').innerText = `${diemBCS}Đ`;
            diemSV1=0;diemBCS=0;
        }
        //đổ dữ liệu ra radio
        if(res.data.tieuChi[i].maTieuChi =='tc01'){
            var check =  document.getElementsByName(res.data.tieuChi[i].maTieuChi);
            var diemSV = document.getElementsByClassName(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
            switch(res.data.tieuChi[i].diemBCS){
                case 11: check[0].checked = true; break;
                case 9: check[1].checked = true;  break; 
                case 7: check[2].checked = true;   break;    
                case 5: check[3].checked = true; break;
                case 3: check[4].checked = true;  break;
                case 0: check[5].checked = true;  break;
            } 
            switch(res.data.tieuChi[i].diemSV){
                case 11: diemSV[0].innerText = res.data.tieuChi[i].diemSV +"đ" ; break;
                case 9:  diemSV[1].innerText = res.data.tieuChi[i].diemSV +"đ"; break; 
                case 7:  diemSV[2].innerText = res.data.tieuChi[i].diemSV +"đ";  break;    
                case 5:  diemSV[3].innerText = res.data.tieuChi[i].diemSV +"đ"; break;
                case 3:  diemSV[4].innerText = res.data.tieuChi[i].diemSV +"đ"; break;
                case 0:  diemSV[5].innerText = res.data.tieuChi[i].diemSV +"đ"; break;
            }                  
            continue;
        }
        //tc8
        if(res.data.tieuChi[i].maTieuChi =='tc08'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/-4;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
            }
            continue;
        }
        //tc9
        if(res.data.tieuChi[i].maTieuChi =='tc09'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/-6;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        //tc10
        if(res.data.tieuChi[i].maTieuChi =='tc10'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/-10;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        //tc17
        if(res.data.tieuChi[i].maTieuChi =='tc17'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/-5;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        //tc18
        if(res.data.tieuChi[i].maTieuChi =='tc18'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/-10;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        //tc19
        if(res.data.tieuChi[i].maTieuChi =='tc19'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/3;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        //tc24
        if(res.data.tieuChi[i].maTieuChi =='tc24'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/-5;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        //tc27
        if(res.data.tieuChi[i].maTieuChi =='tc27'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/3;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        //tc28
        if(res.data.tieuChi[i].maTieuChi =='tc28'){
            if(res.data.tieuChi[i].diemBCS !=0 ){
                var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                input[0].value = res.data.tieuChi[i].diemBCS/-10;
            }
            if(res.data.tieuChi[i].diemSV !=0 ){
                var input = document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`);
                input.innerText = res.data.tieuChi[i].diemSV +'đ';
                
            }
            continue;
        }
        // dổ dữ liệu ra checbox
        if(res.data.tieuChi[i].diemBCS != 0){
            var check =  document.getElementsByName(res.data.tieuChi[i].maTieuChi); 
            if(check != undefined && check !=null){
                check[0].checked = true;           
            }   
        }
        if(res.data.tieuChi[i].diemSV != 0){
            document.getElementById(`diemSV-${res.data.tieuChi[i].maTieuChi}`).innerText = res.data.tieuChi[i].diemSV +'đ';
        }
        //
    }
    document.getElementById('tongDiemSV').innerText = `${tongDiemSV}Đ`;  
    document.getElementById('tongDiemBCS').innerText = `${tongDiemBCS}Đ`;
    //ẩn button  
    console.log(res)
    if(dataNavigation.trangThai == 2){
        document.getElementById('btn-update').style.display ='none';
    }
});
//cập nhật đánh giá của ban cán sự lơp
const updateDiemBCS = async () =>{
    const kiemtra = await checkForm();
    if(kiemtra == true){
        var request = {
            'maSinhVien': dataNavigation.maSV,
            'maLop': dataNavigation.maLop,
            'maHocKi': dataNavigation.maHK,
            'maNamHoc': dataNavigation.maNH,
            'ngaySinh': dataNavigation.ngaySinh,
            'hoVaTen': dataNavigation.hoVaTen,
            'diemTong': tongmuc1+ tongmuc2+ tongmuc3 + tongmuc4+tongmuc5,
            'tieuChi':[
                {'maTieuChi':'tc01', 'diem':tc01},{'maTieuChi':'tc02', 'diem':tc02},
                {'maTieuChi':'tc03', 'diem':tc03},{'maTieuChi':'tc04', 'diem':tc04},
                {'maTieuChi':'tc05', 'diem':tc05},{'maTieuChi':'tc06', 'diem':tc06},
                {'maTieuChi':'tc07', 'diem':tc07},{'maTieuChi':'tc08', 'diem':tc08},
                {'maTieuChi':'tc09', 'diem':tc09},{'maTieuChi':'tc10', 'diem':tc10},
                {'maTieuChi':'tc11', 'diem':tc11},{'maTieuChi':'tc12', 'diem':tc12},
                {'maTieuChi':'tc13', 'diem':tc13},{'maTieuChi':'tc14', 'diem':tc14},
                {'maTieuChi':'tc15', 'diem':tc15},{'maTieuChi':'tc16', 'diem':tc16},
                {'maTieuChi':'tc17', 'diem':tc17},{'maTieuChi':'tc18', 'diem':tc18},
                {'maTieuChi':'tc19', 'diem':tc19},{'maTieuChi':'tc20', 'diem':tc20},
                {'maTieuChi':'tc21', 'diem':tc21},{'maTieuChi':'tc22', 'diem':tc22},
                {'maTieuChi':'tc23', 'diem':tc23},{'maTieuChi':'tc24', 'diem':tc24},
                {'maTieuChi':'tc25', 'diem':tc25},{'maTieuChi':'tc26', 'diem':tc26},
                {'maTieuChi':'tc27', 'diem':tc27},{'maTieuChi':'tc28', 'diem':tc28},
                {'maTieuChi':'tc29', 'diem':tc29},{'maTieuChi':'tc30', 'diem':tc30},
                {'maTieuChi':'tc31', 'diem':tc31},{'maTieuChi':'tc32', 'diem':tc32},
                {'maTieuChi':'tc33', 'diem':tc33}
            ]
        }
        callApi('http://localhost:8080/updateDiemBCS','post',null, request).then(res =>{
            if(res.status == 200){
                alert(res.data);
            }
            
        })
        
    }
    
}
 