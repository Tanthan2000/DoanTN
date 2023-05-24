let strHtml ="";
var TieuChi ={
    "data": [
        {	
            "Id": "I1",
            "NoIdung": "Đánh giá về ý thức trong học tập (Tổng điểm 0-20đ)",
            "DiemToIda": 20,
            "TieuChi2":[
                {
                    "Id": "I11",
                    "NoIdung": "Kết quả học tập: (Chọn 1 tiêu chí phù hợp)",
                    "DiemToIda": null,
                    "TieuChi3":[
                        {
                            "Id": "I11A",
                            "NoIdung": "Có điểm TBCHK từ 3.6 đến 4.00",
                            "DiemToIda": 11
                        },
                        {
                            "Id": "I11B",
                            "NoIdung": "Có điểm TBCHK từ 3.2 đến cận 3.6",
                            "DiemToIda": 9
                        },
                        {
                            "Id": "I11C",
                            "NoIdung": "Có điểm TBCHK từ 2.5 đến cận 3.2",
                            "DiemToIda": 7
                        },
                        {
                            "Id": "I11D",
                            "NoIdung": "Có điểm TBCHK từ 2.0 đến cận 2.5",
                            "DiemToIda": 5
                        },
                        {
                            "Id": "I11E",
                            "NoIdung": "Có điểm TBCHK từ 2.0 đến cận 2.5",
                            "DiemToIda": 3
                        },
                        {
                            "Id": "I11F",
                            "NoIdung": "Có điểm TBCHK <1.2",
                            "DiemToIda": 0
                        },                
                    ]
                },
                {
                    "Id": "I12",
                    "NoIdung": "Hoạt động nghiên cứu khoa học, thi Olympic (Tổng điểm 0-5đ)",
                    "DiemToIda": 5,
                    "TieuChi3":[
                        {
                        "Id": "I12A",
                        "NoIdung": "Thành viên đề tài nghiên cứu khoa học, đội Olympic cấp trường trở lên (không tính tiểu luận, đồ án môn học...).",
                        "DiemToIda": 5
                        },
                        {
                        "Id": "I12B",
                        "NoIdung": "Đạt giải tại các cuộc thi về nghiên cứu khoa học từ cấp Khoa trở lên.",
                        "DiemToIda": 5
                        }
                    ]
                },
            ]
            
        },
    ]
}

// if sinh viên đã đánh giá load dữ liệu
//load title
var infoStudent = JSON.parse(localStorage.getItem('infoStudent'));
var danhgiaTitle = JSON.parse(localStorage.getItem('data'));
var maLop = "K43C-CNTT";
strHtml ="";
strHtml =`<div  class="info-student-evaluate" style="border-bottom: 1px dotted #808080 ; margin-bottom: 10px;"> 
            <label>Mã sinh viên: <b>${infoStudent.MaSinhVien}</b></label>
            <label>Họ và tên: <b>${infoStudent.HoVaTen}</b></label>                                                          
                                    
            <label>Ngày sinh: <b>${infoStudent.NgaySinh}</b></label>                              
            <label>Lớp: <b>${maLop}</b></label>                         
                                                    
            <label>Học kì: <b>${danhgiaTitle.maHK}</b></label>
            <label>Năm học: <b>${danhgiaTitle.maNH}</b></label>
        </div>
        <!--------thời gian đánh giá điểm rèn luyện---------->
        <span >Thời gian sinh viên bắt đầu đánh giá từ ngày <b>${danhgiaTitle.batdau}</b> đến ngày <b>${danhgiaTitle.ketthuc}</b>.</span>     `;

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
//load dữ liệu ra form đánh giá
request = {
    'maSinhVien': infoStudent.MaSinhVien,
    'maLop': maLop,
    'maHocKi': danhgiaTitle.maHK,
    'maNamHoc': danhgiaTitle.maNH,
}

//load data header
const loadDataHeader =() =>{
    let strHTML ="";
    document.getElementById('title-content').innerHTML = `ĐÁNH GIÁ ĐIỂM RÈN LUYỆN CỦA BẠN TRONG: 
    Học kì ${ danhgiaTitle.maHK} - năm học ${ danhgiaTitle.maNH}`;
}
const loadData = async ()=>{
    let tongDiemSV = 0, diemSV1=0;
    // kiểm tra if sinh viên đã tạo đánh giá và yêu cầu làm lại load dữ liệu củ ra
    await callApi('http://localhost:8080/getPhieuDanhGia','post', null, request).then(res =>{
        if( res.data != "" && res.data != null ){
            for(i =0 ;i < res.data.tieuChi.length;i++ ){
                //
                tongDiemSV += res.data.tieuChi[i].diemSV;
                diemSV1 += res.data.tieuChi[i].diemSV;
                if( res.data.tieuChi[i].maTieuChi == 'tc10'){
                    document.getElementById('tongMuc1SV').innerText = `${diemSV1}Đ`;            
                    diemSV1=0;
                    
                }
                if( res.data.tieuChi[i].maTieuChi == 'tc18'){
                    document.getElementById('tongMuc2SV').innerText = `${diemSV1}Đ`;               
                    diemSV1=0;
                }
                if( res.data.tieuChi[i].maTieuChi == 'tc24'){
                    document.getElementById('tongMuc3SV').innerText = `${diemSV1}Đ`;
                    diemSV1=0;
                }
                if( res.data.tieuChi[i].maTieuChi == 'tc28'){
                    document.getElementById('tongMuc4SV').innerText = `${diemSV1}Đ`;   
                    diemSV1=0;
                }
                if( res.data.tieuChi[i].maTieuChi == 'tc33'){
                    document.getElementById('tongMuc5SV').innerText = `${diemSV1}Đ`;                   
                    diemSV1=0;
                }
                //đổ dữ liệu ra radio
                if(res.data.tieuChi[i].maTieuChi =='tc01'){
                    var check =  document.getElementsByName(res.data.tieuChi[i].maTieuChi);                   
                    switch(res.data.tieuChi[i].diemBCS){
                        case 11: check[0].checked = true; break;
                        case 9: check[1].checked = true;  break; 
                        case 7: check[2].checked = true;   break;    
                        case 5: check[3].checked = true; break;
                        case 3: check[4].checked = true;  break;
                        case 0: check[5].checked = true;  break;
                    }                     
                    continue;
                }
                //tc8
                if(res.data.tieuChi[i].maTieuChi =='tc08'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/-4;
                    }               
                    continue;
                }
                //tc9
                if(res.data.tieuChi[i].maTieuChi =='tc09'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/-6;
                    }
                    continue;
                }
                //tc10
                if(res.data.tieuChi[i].maTieuChi =='tc10'){
                    if(res.data.tieuChi[i].diemtongMuc5SV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/-10;
                    }
                    continue;
                }
                //tc17
                if(res.data.tieuChi[i].maTieuChi =='tc17'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/-5;
                    }
                    continue;
                }
                //tc18
                if(res.data.tieuChi[i].maTieuChi =='tc18'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/-10;
                    }
                    continue;
                }
                //tc19
                if(res.data.tieuChi[i].maTieuChi =='tc19'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/3;
                    }
                    continue;
                }
                //tc24
                if(res.data.tieuChi[i].maTieuChi =='tc24'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/-5;
                    }
                    continue;
                }
                //tc27
                if(res.data.tieuChi[i].maTieuChi =='tc27'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/3;
                    }
                    continue;
                }
                //tc28
                if(res.data.tieuChi[i].maTieuChi =='tc28'){
                    if(res.data.tieuChi[i].diemSV !=0 ){
                        var input = document.getElementsByName(res.data.tieuChi[i].maTieuChi);
                        input[0].value = res.data.tieuChi[i].diemSV/-10;
                    }
                    continue;
                }
                // dổ dữ liệu ra checbox
                if(res.data.tieuChi[i].diemSV != 0){
                    var check =  document.getElementsByName(res.data.tieuChi[i].maTieuChi); 
                    if(check != undefined && check !=null){
                        check[0].checked = true;           
                    }   
                }
                //
            }
            document.getElementById('tongDiemSV').innerText = `${tongDiemSV}Đ`; 
        }
    })
}
loadDataHeader();
loadData();
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
    //điểm mục II
    document.getElementById('tongMuc1SV').innerText =`${tongmuc1} Điểm`;
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
    document.getElementById('tongMuc2SV').innerText =`${tongmuc2} Điểm`;
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
    document.getElementById('tongMuc3SV').innerText= `${tongmuc3} Điểm`; 
    if(tongmuc3 > 20){
        alert(`Số điểm mục III của bạn > 20đ vượt mức quy định!`);
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
    document.getElementById('tongMuc4SV').innerText= `${tongmuc4} Điểm`;
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
    document.getElementById('tongMuc5SV').innerText= `${tongmuc5} Điểm`; 
    if(tongmuc5 > 10){
        alert(`Số điểm mục V của bạn > 10đ vượt mức quy định!`);
        return false;
    }
    // Tổng điểm
    document.getElementById('tongDiemSV').innerText = `${tongmuc1 + tongmuc2 + tongmuc3 + tongmuc4 + tongmuc5} Điểm`;
    return true;
}
const createEvaluate = async () =>{
    const kiemtra = await checkForm();
    if(kiemtra == true){
        var request = {
            'maSinhVien': infoStudent.MaSinhVien,
            'maLop': maLop,
            'maHocKi': danhgiaTitle.maHK,
            'maNamHoc': danhgiaTitle.maNH,
            'ngaySinh': infoStudent.NgaySinh,
            'hoVaTen': infoStudent.HoVaTen,
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
        callApi('http://localhost:8080/createEvaluate','post',null, request).then(res =>{
            if(res.status == 200){
                alert(res.data);
            }
            
        })
        
    }
    
}
 