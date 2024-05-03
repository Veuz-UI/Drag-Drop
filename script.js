$(function () {
    $("#draggableOne").draggable();
    $("#qrImage").draggable();
    $("#draggableTwo").draggable();
    $("#imageWrapper").draggable();
});



function changePageSize() {
    var selectBox = document.getElementById("pagesize");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var page = document.getElementById("page");
    var customSizeInputs = document.getElementById("customSizeInputs");

    if (selectedValue === "a4") {
        page.style.width = "210mm";
        page.style.height = "297mm";
        customSizeInputs.style.display = "none";
    } else if (selectedValue === "a5") {
        page.style.width = "148mm";
        page.style.height = "210mm";
        customSizeInputs.style.display = "none";
    } else if (selectedValue === "custom") {
        customSizeInputs.style.display = "block";
        page.style.width = ""; // Reset custom size
        page.style.height = ""; // Reset custom size
    }
}

// Trigger initial page size setting
changePageSize();

// Listen for changes in custom width and height inputs
document.getElementById("customWidth").addEventListener("input", updatePageSize);
document.getElementById("customHeight").addEventListener("input", updatePageSize);
document.getElementById("widthUnit").addEventListener("change", updatePageSize);
document.getElementById("heightUnit").addEventListener("change", updatePageSize);

function updatePageSize() {
    var width = document.getElementById("customWidth").value;
    var height = document.getElementById("customHeight").value;
    var widthUnit = document.getElementById("widthUnit").value;
    var heightUnit = document.getElementById("heightUnit").value;
    var page = document.getElementById("page");

    // Convert units to mm
    if (widthUnit === "cm") {
        width *= 10; // 1 cm = 10 mm
    } else if (widthUnit === "px") {
        width *= 0.264583; // Approximately 1 px = 0.264583 mm (for standard 96 dpi)
    }

    if (heightUnit === "cm") {
        height *= 10; // 1 cm = 10 mm
    } else if (heightUnit === "px") {
        height *= 0.264583; // Approximately 1 px = 0.264583 mm (for standard 96 dpi)
    }

    page.style.width = width + "mm";
    page.style.height = height + "mm";
}




// Reduce font size when button is clicked
$("#reduceFontSize").click(function () {
    var currentFontSize = parseInt($("#draggableOne").css("font-size"));
    var newFontSize = currentFontSize - 1;
    $("#draggableOne").css("font-size", newFontSize + "px");
});

// Increase font size when button is clicked
$("#increaseFontSize").click(function () {
    var currentFontSize = parseInt($("#draggableOne").css("font-size"));
    var newFontSize = currentFontSize + 1;
    $("#draggableOne").css("font-size", newFontSize + "px");
});


// Reduce font weight when button is clicked
$("#reduceFontWeight").click(function () {
    var currentWeight = parseInt($("#draggableOne").css("font-weight"));
    var newWeight = currentWeight - 100;
    if (newWeight >= 100) {
        $("#draggableOne").css("font-weight", newWeight);
    }
});

// Increase font weight when button is clicked
$("#increaseFontWeight").click(function () {
    var currentWeight = parseInt($("#draggableOne").css("font-weight"));
    var newWeight = currentWeight + 100;
    if (newWeight <= 900) {
        $("#draggableOne").css("font-weight", newWeight);
    }
});



// Change font color when color picker value changes
$("#fontColorPicker").change(function () {
    var selectedColor = $(this).val();
    $("#draggableOne").css("color", selectedColor);
});


// upload image

document.getElementById('uploadImageInput').addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.getElementById('uploadedImage');
            img.src = e.target.result;
            document.getElementById('sizeAdjustmentButtons').style.display = 'block';
            document.getElementById('imageWrapper').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('increaseSize').addEventListener('click', function () {
    var img = document.getElementById('uploadedImage');
    var currentWidth = img.width;
    var currentHeight = img.height;
    img.width = currentWidth * 1.1; // Increase width by 10%
    img.height = currentHeight * 1.1; // Increase height by 10%
});

document.getElementById('decreaseSize').addEventListener('click', function () {
    var img = document.getElementById('uploadedImage');
    var currentWidth = img.width;
    var currentHeight = img.height;
    img.width = currentWidth * 0.9; // Decrease width by 10%
    img.height = currentHeight * 0.9; // Decrease height by 10%
});



// margin change 
function updateMargin() {
    var slider = document.getElementById("marginRange");
    var marginValue = slider.value;
    var content = document.getElementById("draggableOne");
    content.style.margin = marginValue + "px";
    updateProgressBar();
}

function updateProgressBar() {
    var slider = document.getElementById("marginRange");
    var progressBar = document.getElementById("progressBar");
    var progressBarWidth = (slider.value / parseInt(slider.max)) * 100;
    progressBar.style.width = progressBarWidth + "%";
}

// Event listener for slider input
document.getElementById("marginRange").addEventListener("input", function () {
    updateMargin();
});

// Update progress bar initially
updateProgressBar();



