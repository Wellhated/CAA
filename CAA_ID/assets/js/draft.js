var index = 1;
const create_ID = setInterval(async () => {
    if (index < data.length) {
        console.log(index);
        
        $("#automate_id").text(`${index}/${data.length}`);

        var id = {
            img: data[index][9].replace("open?", "uc?export=view&"),
            number: data[index][3],
            name: `${data[index][0]} ${data[index][1][0]}. ${data[index][2]}`,
            grade: data[index][4],
            strand: data[index][5],
            parent_guardian: data[index][6],
            contact: data[index][7],
            address: data[index][8]
        }
        console.log(id);

        var _dir = './assets/img/templates';
        switch(id.grade) {
            case "Grade 11":
            case "Grade 12":
                $("#id_front").css("background-image", `url("${_dir}/Senior_High.jpg")`);
                $("#id_strand").text(id.strand.toUpperCase());
                break;
            case "Grade 10":
                $("#id_front").css("background-image", `url("${_dir}/Grade_10.jpg")`);
                break;
            case "Grade 8":
                $("#id_front").css("background-image", `url("${_dir}/Grade_8.jpg")`);
                break;
            case "Grade 7":
                $("#id_front").css("background-image", `url("${_dir}/Grade_7.jpg")`);
                break;
            default:
                $("#id_front").css("background-image", 'url("")');
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
        var student_folder = grade_level.folder(`${data[index][0]} ${data[index][2]}`);

        await domtoimage.toBlob(document.getElementById("id_front")).then( async (front_blob) => {
            await student_folder.file("front_id.png", front_blob, { base64: true });
        });
        await domtoimage.toBlob(document.getElementById("id_back")).then( async (back_blob) => {
            await student_folder.file("back_id.png", back_blob, { base64: true });
        });    

        index++;

    } else {
        zip.generateAsync({type:"blob"})
        .then(function(content) {
        // see FileSaver.js
            saveAs(content, "CAA_ID.zip");
        });
        clearInterval(create_ID);
        $("#automate_id").text("Automate ID");
        $(".id_info").text("");
    }
}, 1000);







var i = 1;
const ID = setInterval(async() => {
    if (i < data.length) {

        var id = {
            img: data[i][9].replace("open?", "uc?export=view&"),
            number: data[i][3],
            name: `${data[i][0]} ${data[i][1][0]}. ${data[i][2]}`,
            grade: data[i][4],
            strand: data[i][5],
            parent_guardian: data[i][6],
            contact: data[i][7],
            address: data[i][8]
        }

        console.log(id.name);

        $("#id_picture").css("background-image", `url("${id.img}")`);

        await Save_ID();


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
}, 3000);