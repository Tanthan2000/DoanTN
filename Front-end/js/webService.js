const callApi = async (url,method, headers,data) =>{
    let res = await
    axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });
    return res;
}
const checkLogin = (page) =>{
    if(page == 'teacher'){
      if(localStorage.getItem("loginInfo") == null){
        window.location="http://127.0.0.1:5500/teacher/login-teacher.html";
      }
    }else if(page == "student"){
      if(localStorage.getItem("loginInfo") == null){
        window.location="http://127.0.0.1:5500/student/login-student.html";
      } 
    }
    
}
//điều hướng trang
const navigationPage = (href,data)=>{
  localStorage.setItem('data', JSON.stringify(data));
  window.location = href;
}