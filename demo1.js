window.onload = function(){
    document.getElementById('submitBtn').addEventListener('click', function() {
        // Get form values
        var form = document.forms.sample;
        var storeaddy = form.storeaddy.value;
        var date = form.date.value;
        var location = form.location.value;
        var conditions = form.conditions.value;
        var ppu = form.ppu.value;
        var shelfspace = form.shelfspace.value;
        var onshelf = form.onshelf.value;
        var tags = form.tags.value;
        var notes = form.notes.value;
        var photo1 = form.photo1.files[0];
        var photo2 = form.photo2.files[0];

        // Prepare your data
        var jsonData = {
            storeaddy: storeaddy,
            date: date,
            location: location,
            conditions: conditions,
            ppu: ppu,
            shelfspace: shelfspace,
            onshelf: onshelf,
            tags: tags,
            notes: notes
        };

        var reader1 = new FileReader();
        reader1.onloadend = function() {
            var base64Image1 = reader1.result.split(',')[1];  // get the base64 encoded image

            var imageData1 = {
                type: "image",
                body: base64Image1
            };

            var reader2 = new FileReader();
            reader2.onloadend = function() {
                var base64Image2 = reader2.result.split(',')[1];  // get the base64 encoded image

                var imageData2 = {
                    type: "image",
                    body: base64Image2
                };

                // Combine JSON data and image data into a list
                var data = [jsonData, imageData1, imageData2];

                // Send the request
                fetch('https://1mnrwnutd1.execute-api.us-east-1.amazonaws.com/lambdatester-07-02-23', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(data)
                })
                /*.then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                  console.error('Error:', error);
                });*/
            }

            reader2.readAsDataURL(photo2);  // read the second file as Data URL
        }

        reader1.readAsDataURL(photo1);  // read the first file as Data URL
    });
};
