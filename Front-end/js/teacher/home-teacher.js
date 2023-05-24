const init = (async () => {
    checkLogin('teacher');
})()
console.log(JSON.parse(localStorage.getItem('infoTeacher')).HoVaTen);
id = 'teacher';
let strHTML = `<p style="color: white; margin-bottom: 3px; font-size:15px;"> ${JSON.parse(localStorage.getItem('infoTeacher')).HoVaTen}  ` ;
    strHTML += `<a href="#" onclick="logout('teacher')">  [Đăng xuất]</a></p>  ` ;
document.getElementById("info").innerHTML = strHTML;