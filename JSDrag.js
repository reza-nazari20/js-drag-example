document.querySelectorAll(".drop_zone__input").forEach(inputElement => {
    const dropzoneElement = inputElement.closest(".drop_zone");

    dropzoneElement.addEventListener("click", e => {
        inputElement.click();
    });


    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {
            updateThunbnail(dropzoneElement, inputElement.files[0]);
        }
    });


    dropzoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropzoneElement.classList.add("drop_zone__over");
    });


    ["dragleave", "dragend"].forEach(type => {
        dropzoneElement.addEventListener(type, e => {
            dropzoneElement.classList.remove("drop_zone__over");
        });
    });


    dropzoneElement.addEventListener("drop", e => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThunbnail(dropzoneElement, e.dataTransfer.files[0]);
        }

        dropzoneElement.classList.remove("drop_zone__over");
    })
})

/////////////////////////////////////////////////////////////////////////////////////
/** 
*
* @param {HTMLElement} dropzoneElement
* @param {File} file
*/
function updateThunbnail(dropzoneElement, file) {
    let thumbnailElement = dropzoneElement.querySelector(".drop_zone__thumb");

    console.log(file);

    if (dropzoneElement.querySelector(".drop_zone_prompt")) {
        dropzoneElement.querySelector(".drop_zone_prompt").remove();
    }

    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop_zone__thumb");
        dropzoneElement.appendChild(thumbnailElement);

    }

    thumbnailElement.dataset.label = file.name;


    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}