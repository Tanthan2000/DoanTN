var infoStudent = JSON.parse(localStorage.getItem('infoStudent'));
//info student
let strHTML = `<p style="color: white; margin-bottom: 3px; font-size:15px;"> ${infoStudent.HoVaTen}`;
    strHTML +=`<a href="#" onclick="logout('student')">  [Đăng xuất]</a></p>`;
document.getElementById("info").innerHTML = strHTML ;
console.log(JSON.parse(localStorage.getItem('loginInfo')).Token);