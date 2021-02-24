function sendData(){
    let cat = document.getElementById("category").value;
    let mon = document.getElementById("money").value;
    console.log(cat);
    console.log(mon);
    let data = {
        category: cat,
        money: parseFloat(mon)
    };
    console.log(data);
    let xhr = new XMLHttpRequest();
    xhr.open("POST","/upload");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
          console.log(xhr.responseText);
        } else {
          console.log(xhr.responseText);
        }
      });
      xhr.send(JSON.stringify(data));
}