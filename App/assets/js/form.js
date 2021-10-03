// Student Information

// $(".input").keyup(() => {

//   var middle_initial = $("#middle_name").val().length !== 0 ? $("#middle_name").val()[0] + "." : "";
//   var fullname = `${$("#first_name").val()} ${middle_initial} ${$("#last_name").val()}`;

//   $("#student_name").text(fullname);
// });


// Image Upload

// const image_input = document.querySelector("#img_input");
// var uploaded_image;

// image_input.addEventListener('change', function() {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => {
//     uploaded_image = reader.result;
    // document.querySelector("#student_picture").style.backgroundImage = `url(${uploaded_image})`;
//   });
//   reader.readAsDataURL(this.files[0]);
// });

// Save Output

$("#automate_id").click(function() {
  $(".form").css("display", "block");
  $(".overlay").css("display", "block");
});

$(".overlay").click(function () {
  $(".form").css("display", "none");
  $(".overlay").css("display", "none");
});