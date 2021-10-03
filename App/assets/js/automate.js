$(document).ready(function() {{
  $("#automate_start").click(function() {

    $(".form").css("display", "none");

    $(".overlay").css("display", "block");
    $(".loader").css("display", "block");
    
    $.ajax({
        type: "GET",
        url: "/api",
        data: {
            spreadsheetId: $("#spreadsheet_id").val()
        },
        success: async function (data) {

            var zip = new JSZip();

            var i = 0;

            const ID = setInterval(async() => {
                if (i <= data.length) {
                    var id = {
                        id: data[i][9],
                        number: data[i][3],
                        file: ((data[i][0] + " " + data[i][2]).split(" ")).join("-"),
                        file_name: ((data[i][0] + " " + data[i][2]).split(" ")).join("-") + ".jpg",
                        name: `${data[i][0]} ${data[i][1][0]}. ${data[i][2]}`,
                        grade: data[i][4],
                        strand: data[i][5],
                        parent_guardian: data[i][6],
                        contact: data[i][7],
                        address: data[i][8]
                    }

                    $("#id_picture").css("background-image", `url("../../tmp/${id.file_name}")`);

                    var _dir = './assets/img/templates';
                    switch(id.grade) {
                        case "Grade 11":
                        case "Grade 12":
                            $("#id_front").css("background-image", `url("${_dir}/Senior_High.jpg")`);
                            $("#id_strand").text(id.strand.toUpperCase());
                            break;
                        case "Grade 10":
                            $("#id_front").css("background-image", `url("${_dir}/Grade_10.jpg")`);
                            $("#id_strand").text("");
                            break;
                        case "Grade 8":
                            $("#id_front").css("background-image", `url("${_dir}/Grade_8.jpg")`);
                            $("#id_strand").text("");
                            break;
                        case "Grade 7":
                            $("#id_front").css("background-image", `url("${_dir}/Grade_7.jpg")`);
                            $("#id_strand").text("");
                            break;
                        default:
                            $("#id_front").css("background-image", 'url("")');
                            $("#id_strand").text("");
                    }

                    $("#id_number").text(id.number);
                    if (id.name.length > 25) {
                        $("#id_name").css("font-size", "40px");
                        $("#id_name").css("margin-top", "30px");
                    } else {
                        $("#id_name").css("font-size", "45px");
                        $("#id_name").css("margin-top", "24px");
                    }
                    
                    $("#id_name").text(id.name.toUpperCase());
            
                    $("#id_grade").text(id.grade.toUpperCase());
                    $("#id_schoolyear").text("SCHOOL YEAR 2020-2021");
            
                    $("#parent_guardian").text(id.parent_guardian);
                    $("#contact_number").text(id.contact);
                    $("#address").text(id.address);

                    var grade_level = zip.folder(id.grade);

                    await domtoimage.toBlob(document.getElementById("id_front")).then(async (blob) => {
                        await grade_level.file(`${id.file}_FRONT-ID.png`, blob, { base64: true });
                    });
                    await domtoimage.toBlob(document.getElementById("id_back")).then(async (blob) => {
                        await grade_level.file(`${id.file}_BACK-ID.png`, blob, { base64: true });
                    });

                    $("#id_picture").css('background-image', 'url("")');

                    i++;
                }
                else {
                    zip.generateAsync({type:"blob"})
                    .then(function(content) {
                    // see FileSaver.js
                        saveAs(content, "CAA_ID.zip");
                    });
                    clearInterval(ID);
                    i = 0;
                    $(".loader").css("display", "none");
                    $(".overlay").css("display", "none");
                }
            }, 1000);

        }
    });

  });

}});
