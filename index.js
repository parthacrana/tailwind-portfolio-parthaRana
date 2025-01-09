// for random password generator
function genRandPW() {
    var length = 14,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    // .innerHTML is OP
    document.getElementById("password").innerHTML = retVal;

    return retVal;
}

// for submitting contact form 
function submitForm() {
const form = document.getElementById('form');   
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

// for copy text to clipboard button for contact details 
const copyButton = document.getElementById("copyButton");
const textToCopy = "6692515168";

    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // Optional: Display a success message
          alert("Text copied to clipboard!");
        })
        .catch(err => {
          console.error("Failed to copy text: ", err);
        });
    });
}
