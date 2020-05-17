function processImage() {
    
    const subscriptionKey = "217eba50bc4b42cdbc191b18b69d063c"; //<put your key here>
    const uriBase ="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    
    // Request parameters.
    const params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
        "age,gender,headPose,smile,facialHair,glasses,emotion," +
        "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };
    
    // Display the image
    const sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;
    
    // Perform the REST API call
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request headers
        beforeSend: (xhrObj) => {
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
            
        // Request body
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    }).done((data) => {
        
        // Show formatted JSON on webpage
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
    }).fail((jqXHR, textStatus, errorThrown) => {
        
        // Display error message
        let errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): "; 
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
        
        alert(errorString);
        alert(textStatus);
    });
}