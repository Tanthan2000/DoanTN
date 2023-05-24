const logout = (page) =>{
    if(page == "teacher"){
        localStorage.removeItem('loginInfo');
        localStorage.removeItem('infoTeacher');
        window.location ="http://127.0.0.1:5500/teacher/login-teacher.html";
    }else if(page == "student"){
        localStorage.removeItem('loginInfo');
        localStorage.removeItem('infoStudent');
        window.location ="http://127.0.0.1:5500/student/login-student.html";
    }
    
}