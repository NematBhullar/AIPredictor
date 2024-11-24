function updateData(setUserData, userData, key, value) {
  const updatedData = { ...userData, [key]: value };
  setUserData(updatedData);
  localStorage.setItem("userData", JSON.stringify(updatedData)); 
}

function handleFileUpload(setFileData, fileData, key, file) {
  if (!file) return;
  const updatedData = { ...fileData, [key]: file };
  setFileData(updatedData);
}

async function onSubmit(e, isLastPage, next, userData, fileData, setLoading, setReasons, setScores, setResultVisible) {
  e.preventDefault();

  // If it is not the last page, navigate to the next page
  if (!isLastPage) return next();

  // If it is the last page, create and submit the form
  setLoading(true);
  const formData = new FormData();

  formData.append("name", userData.firstName);
  formData.append("age", userData.age);
  formData.append("gender", userData.gender);
  formData.append("ethnicity", "Australian");
  formData.append("highSchool", userData.highSchool);
  formData.append("interviewScore", userData.interviewScore);
  formData.append("atar", userData.atar);
  formData.append("ucat", userData.ucat);
  formData.append("extracurricularActivities", userData.extracurricularActivities);
  formData.append("stateOfResidence", userData.stateOfResidence);
  formData.append("lettersOfRecommendation", userData.lettersOfRecommendation);
  formData.append("interviewScore", userData.interviewScore);

  if (fileData.cv) formData.append("cv", fileData.cv);
  if (fileData.personalStatement) formData.append("personalStatement", fileData.personalStatement);
  if (fileData.academicStatement) formData.append("academicStatement", fileData.academicStatement);
  if (fileData.highSchoolReport) formData.append("highSchoolReport", fileData.highSchoolReport);
  if (fileData.otherDocuments) formData.append("otherDocuments", fileData.otherDocuments);
  
  // fetch("https://michaelshi.tplinkdns.com/prediction", {
  fetch("http://127.0.0.1:11111/prediction", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) { 
        console.log(userData)
        throw new Error(`Error! HTTP Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("TA-DA! Here are your prediction results:", data);
      // Return a div that displays the results
      setReasons(data["reasons"]);
      let data_pred = {}
      data_pred[data["predictions"][0]["classes"][0]] = data["predictions"][0]["scores"][0];
      data_pred[data["predictions"][0]["classes"][1]] = data["predictions"][0]["scores"][1];
      data_pred[data["predictions"][0]["classes"][2]] = data["predictions"][0]["scores"][2];
      setScores(data_pred);
      setResultVisible(true);
      // console.log(data["reasons"]);
      // console.log(data_pred);
    })
    .catch((error) => {
      console.error("Oops! There was an error submitting the form:", error);
    });
  setLoading(false);
}