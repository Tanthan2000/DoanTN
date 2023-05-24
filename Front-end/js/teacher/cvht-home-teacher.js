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
const dataLop = [
    {maLop:'K43C-CNTT', tenLop:'K43C Công nghệ thông tin'},
    {maLop:'K43A-CNTT', tenLop:'K43A Công nghệ thông tin'},
    {maLop:'K43B-CNTT', tenLop:'K43B Công nghệ thông tin'},
    
]
//load data header
const loadDataHeader =() =>{
    let strHTML ="";
    document.getElementById('title-content').innerHTML = `ĐÁNH GIÁ ĐIỂM RÈN LUYỆN CHO SINH VIÊN TRONG: HỌC KÌ 
                            ${dataDanhGia.maHK}(${dataDanhGia.maNH})`;
    document.getElementById('message').innerHTML = `<li>
                    Thời gian bắt đầu đánh giá từ ngày <b>${dataDanhGia.batdau}</b> đến ngày <b>${dataDanhGia.ketthuc}</b>
                    </li>`;
    //load danh sách lớp               
    var selectLop = document.getElementById('select-lop');
    strHTML +=`<form>
                <label>Chọn lớp:</label>
                <select name="selectLop" onchange="getStudentByLop()">`;
    for(i=0 ;i< dataLop.length;i++){
        strHTML += `<option value="${dataLop[i].maLop}"> ${dataLop[i].tenLop}</option>`
    }                
    strHTML += `</select>
            </form>`;
    selectLop.innerHTML = strHTML;
}
//load table content
const loadTable =async ()=>{
    strHTML ="";
    strHTML += `<table class="table table-bordered">
                    <thead style="background: #d2d2d2;">
                        <tr>
                            <th class="text-center" scope="col">STT</th>
                            <th class="text-center" scope="col">Mã SV</th>
                            
                            <th class="text-center" scope="col">Tên SV</th>
                            <th class="text-center" scope="col">Ngày sinh</th>
                            <th class="text-center" scope="col">Điểm đánh giá</th>            
                            <th class="text-center" scope="col">Xếp loại</th> 
                            <th class="text-center" scope="col">CVHT đánh giá</th> 
                                                                                    
                        </tr>
                    </thead>
                    <tbody>`;
    for(i=0; i<dataStudent.length; i++){
        maLop = document.getElementsByName('selectLop')[0].value;
        var maPhieuDanhGia = dataStudent[i].maSV + maLop + dataDanhGia.maHK + dataDanhGia.maNH;
        await callApi(`http://localhost:8080/getDiemXepLoai?maPhieuDanhGia=${maPhieuDanhGia}`, 'post', null,null).then( res =>{
            console.log(res)
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
                        <th class="text-center" scope="row">${i}</th>
                        <td class="text-center">${dataStudent[i].maSV}</td>
                        <td class="text-left">${dataStudent[i].hoVaTen}</td>
                        <td class="text-center"> ${dataStudent[i].ngaySinh}</td>
                        <td class="text-center"> ${res.data.diemTong}</td>
                        
                        <td class="text-center"> ${res.data.xepLoai}</td>
                        <td class="text-center"> <button onclick="navigationPage('cvht-evaluate-teacher.html',${requestNavigation})" 
                        ${res.data.trangThai == -1 || res.data.trangThai == 0?"disabled":""} style="width: 75px;" >${ res.data.trangThai == 2 || res.data.trangThai ==4?'Xem/Sửa':'Xem'}</button></td> 
                                                
                    </tr>`
        })
    }
    strHTML += `</tbody>
                </table>`;
    document.getElementById('table-content').innerHTML = strHTML;
}
loadDataHeader();
loadTable();
//lấy sinh viên theo lơp
const getStudentByLop =() =>{
    console.log(document.getElementsByName('selectLop')[0].value)
}
// trả đánh giá lại cho CBS lớp
const returnEvaluateCVHT = () =>{
    var maLop = document.getElementsByName('selectLop')[0].value;
    console.log(maLop);
    callApi(`http://localhost:8080/returnEvaluateByCVHT?maLop=${maLop}&maHK=${dataDanhGia.maHK}&maNH=${dataDanhGia.maNH}`,
    'post',null,null).then(res =>{
        if(res.status == 200){
            alert(res.data);
        }
    })
}