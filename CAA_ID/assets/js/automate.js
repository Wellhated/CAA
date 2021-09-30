$(document).ready(function() {{
  $("#automate_start").click(function() {

    $(".form").css("display", "none");
    


    $.ajax({
        type: "GET",
        url: "/api",
        success: async function (raw_data) {

            const data = JSON.parse(raw_data);
            var zip = new JSZip();

            var i = 1;

            const ID = setInterval(async() => {
                if (i < data.length) {

                    var id = {
                        img: data[i][9].replace("open?", "uc?&"),
                        number: data[i][3],
                        name: `${data[i][0]} ${data[i][1][0]}. ${data[i][2]}`,
                        grade: data[i][4],
                        strand: data[i][5],
                        parent_guardian: data[i][6],
                        contact: data[i][7],
                        address: data[i][8]
                    }

                    var img = new Image();
                    img.onload = function() {
                        
                        let canvas = document.createElement("canvas");
                        let context = canvas.getContext("2d");
                      
                        canvas.width = img.width;
                        canvas.height = img.height;
                      
                        context.drawImage(img, 0, 0);
                      
                        try {
                            
                            alert("IMG LOADED!");
                        }
                        catch(err) {
                          console.log("Error: " + err);
                        }
                    };
                    img.src = id.img;

                    i++;
                }
                else {
                    // zip.generateAsync({type:"blob"})
                    // .then(function(content) {
                    // // see FileSaver.js
                    //     saveAs(content, "CAA_ID.zip");
                    // });
                    clearInterval(ID);
                    i = 1;
                }
            }, 1000);

        }
    });

  });

}});
