let manhinh = document.getElementById("manhinh");
function themvao(kytu) {
    manhinh.value = manhinh.value + kytu;
}

function xoamanhinh() {
    manhinh.value = "";
}

function tinhketqua() {
    try{
        manhinh.value = eval(manhinh.value);
    }
    catch{
        manhinh.value = "Lỗi cú pháp!";
    }
}

function xoacuoi() {
    manhinh.value = manhinh.value.slice(0, -1);
}