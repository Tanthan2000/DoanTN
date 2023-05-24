var infoTeacher = JSON.parse(localStorage.getItem('infoTeacher'));
//info student
let strHTML1 = `<p style="color: white; margin-bottom: 3px; font-size:15px;"> ${infoTeacher.HoVaTen}`;
    strHTML1 +=`<a href="#" onclick="logout('teacher')">  [Đăng xuất]</a></p>`;
document.getElementById("info").innerHTML = strHTML1 ;
