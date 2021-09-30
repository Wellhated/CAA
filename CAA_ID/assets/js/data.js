$("#get_data").click(function () {
    $.ajax({
        url: "/api",
        data: {
            code: "ZERNA"
        },
        success: function(data) {
            var x = JSON.parse(data);
            console.log(x);
            var img = x.values[1][6];
            var img_link = img.replace("open?", ("uc?export=view&"));
            console.log(img_link);
            $("#student_picture").css("background-image", `url("${img_link}")`)
        }
    });
});