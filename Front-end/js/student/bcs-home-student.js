const dataStudent = [
    {maSV:'19T1021237', hoVaTen:'Võ Tấn Thân', ngaySinh:'10/07/2000'},
    {maSV:'19T1021165', hoVaTen:'Phạm Văn Oanh', ngaySinh:'10/08/2001'},
    {maSV:'19T1021293', hoVaTen:'Phan Duy Trung', ngaySinh:'10/02/2001'},
    {maSV:'19T1021283', hoVaTen:'Lê Văn Công Trình', ngaySinh:'10/07/2001'},
    {maSV:'19T1021293', hoVaTen:'Phan Duy Trung', ngaySinh:'10/07/2000'},
    {maSV:'19T1021211', hoVaTen:'Nguyễn Hải Long', ngaySinh:'12/01/2001'},
    {maSV:'19T1021221', hoVaTen:'Nguyễn Văn Quý', ngaySinh:'10/03/2001'},
    {maSV:'19T1021232', hoVaTen:'Nguyễn Văn Đô', ngaySinh:'10/07/2001'},
]
const dataDanhGia = {maHK:'2', maNH:'2022-2023', noidung:'Học kỳ 2, năm học 2022-2023',batdau:'12/5/2023',ketthuc:'23/5/2023'};
const maLop ="K43C-CNTT";
const checkBox =()=>{
    var checkSum = document.getElementsByName("checkSum");
    var checkbox = document.getElementsByName("checkBox");
    if(checkSum[0].checked == true){
        for (var i = 0; i < checkbox.length; i++){
            if(checkbox[i].disabled == false){
                checkbox[i].checked = true; 
            }     
               
        }
    }else{
        for (var i = 0; i < checkbox.length; i++){
            checkbox[i].checked = false;          
        }
    }
}
//load data header
const loadDataHeader =() =>{
    let strHTML ="";
    document.getElementById('title-content').innerHTML = `ĐÁNH GIÁ ĐIỂM RÈN LUYỆN CHO SINH VIÊN TRONG: HỌC KÌ 
                            ${dataDanhGia.maHK}(${dataDanhGia.maNH})`;
    document.getElementById('message').innerHTML = `<li>
                    Thời gian bắt đầu đánh giá từ ngày <b>${dataDanhGia.batdau}</b> đến ngày <b>${dataDanhGia.ketthuc}</b>
                    </li>`;
}
const loadData = async () =>{
    var tableStudent = document.getElementById('tableStudent');
    let strHTML = "";
    strHTML  += `<table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="text-center"> <input type="checkbox" name="checkSum" onchange="checkBox()"></th>
                        <th class="text-center" scope="col">STT</th>
                        <th class="text-center" scope="col">Mã SV</th>                                   
                        <th class="text-center" scope="col">Tên SV</th>
                        <th class="text-center" scope="col">Ngày sinh</th>
                        <th class="text-center" scope="col">SV đánh giá</th>
                        <th class="text-center" scope="col">Xếp loại</th>
                        <th class="text-center" scope="col">BCS lớp đánh giá</th>                                                             
                    </tr>
                </thead>
                <tbody>`;

    for(i =0 ; i< dataStudent.length; i++){
        var maPhieuDanhGia = dataStudent[i].maSV + maLop + dataDanhGia.maHK + dataDanhGia.maNH;
        await callApi(`http://localhost:8080/getDiemXepLoai?maPhieuDanhGia=${maPhieuDanhGia}`, 'post', null,null).then( res =>{
            console.log(res)
            //dữ liệu gửi đi khi điều hướng
            var requestNavigation = `{
                'maSV': '${dataStudent[i].maSV}',
                'maLop': '${maLop}',
                'maHK': '${dataDanhGia.maHK}',
                'maNH': '${dataDanhGia.maNH}',
                'hoVaTen': '${dataStudent[i].hoVaTen}',
                'thoiGianBatDau': '${dataDanhGia.batdau}',
                'thoiGianKetThuc': '${dataDanhGia.ketthuc}',
                'trangThai': '${res.data.trangThai}',
                'ngaySinh': '${dataStudent[i].ngaySinh}'}`;
                

            strHTML +=`<tr>
                        <th class="text-center"> <input type="checkbox" ${res.data.trangThai == 1 || res.data.trangThai ==3?"":"disabled"} 
                        name="checkBox" value="${dataStudent[i].maSV + maLop + dataDanhGia.maHK +dataDanhGia.maNH}"></th>
                        <th class="text-center" scope="row">${i}</th>
                        <td class="text-center">${dataStudent[i].maSV}</td>
                        <td class="text-left">${dataStudent[i].hoVaTen}</td>
                        <td class="text-center">${dataStudent[i].ngaySinh}</td>
                        <td class="text-center " > ${res.data.diemTong}</td>    
                        <td class="text-center " > ${res.data.xepLoai}</td>                                                       
                        <td class="text-center"> <button onclick="navigationPage('bcs-evaluate-student.html',${requestNavigation})" 
                        ${res.data.trangThai == -1 || res.data.trangThai == 0?"disabled":""} style="width: 75px;" >${ res.data.trangThai == 1 || res.data.trangThai ==3?'Xem/Sửa':'Xem'}</button></td>                    
                    </tr>`;
        })
        
    }

    
    strHTML +=`</tbody>
            </table>`;
    tableStudent.innerHTML = strHTML;
    
}
loadDataHeader();
loadData();
//kiểm tra xem có chọn sinh viên nào chưa
const checkCheckBox =( check) =>{
    for (var i = 0; i < check.length; i++){
        if (check[i].checked === true){           
            return true;
        }
    }
    return false;
}
const returnEvaluateBCS = async () =>{

    var request =[];
    var check = document.getElementsByName('checkBox');
    if(checkCheckBox(check) == false){
        alert('Bạn chưa chọn sinh viên nào!');
        return;
    }else{
        for (var i = 0; i < check.length; i++){
            if (check[i].checked == true){      
                request.push( check[i].value);
            }
        }
    }
    await callApi('http://localhost:8080/returnEvaluateBCS','post', null , request).then( res =>{
        if(res.status == 200){
            alert(res.data);
        }
    })
    loadData();
}
const sendEvaluateByBCS = async () =>{

    var request =[];
    var check = document.getElementsByName('checkBox');
    if(checkCheckBox(check) == false){
        alert('Bạn chưa chọn sinh viên nào!');
        return;
    }else{
        for (var i = 0; i < check.length; i++){
            if (check[i].checked == true){      
                request.push( check[i].value);
            }
        }
    }
    var maTrangThaiLop = maLop +dataDanhGia.maHK + dataDanhGia.maNH;
    await callApi(`http://localhost:8080/sendEvaluateByBCS?maTrangThaiLop=${maTrangThaiLop}`,'post', null , request).then( res =>{
        if(res.status == 200){
            alert(res.data);
        }
    })
    loadData();
}
