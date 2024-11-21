import { useState } from "react";
import { useForm } from "./useForm";
import { FirstPage } from "./FirstPage";
import { SecondPage } from "./SecondPage";
import { ThirdPage } from "./ThirdPage";
import { ResultPage } from "./ResultPage";

const FORM_DATA_TEMPLATE = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  atar: "",
  ucat: "",
  highSchool: "",
  extracurricularActivities: "",
  stateOfResidence: "",
  lettersOfRecommendation: 0,
  interviewScore: 0,
  cv: null,
  highSchoolReport: null,
  personalStatement: null,
  academicStatement: null,
  otherDocuments: null,
};

function App() {
  const storedData = JSON.parse(localStorage.getItem("data")) || FORM_DATA_TEMPLATE;
  const [data, setData] = useState(storedData);
  const [loading, setLoading] = useState(false); 

  function updateData(key, value) {
    const updatedData = { ...data, [key]: value };
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData)); 
  }

  function handleFileUpload(key, file) {
    if (!file) return;
    updateData(key, file);  
  }

  const { currentPageIndex, page, pages, isFirstPage, isLastPage, next, back } = useForm([
    <FirstPage {...data} updateData={updateData} />,
    <SecondPage {...data} updateData={updateData} handleFileUpload={handleFileUpload} />,
    <ThirdPage {...data} updateData={updateData} handleFileUpload={handleFileUpload} />
  ]);

  async function onSubmit(e) {
    e.preventDefault();

    // If it is not the last page, navigate to the next page
    if (!isLastPage) return next();

    // If it is the last page, create and submit the form
    setLoading(true);
    const formData = new FormData();

    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("ethnicity", "Australian");
    formData.append("highSchool", data.highSchool);
    formData.append("interviewScore", data.interviewScore);
    formData.append("atar", data.atar);
    formData.append("ucat", data.ucat);
    formData.append("extracurricularActivities", data.extracurricularActivities);
    formData.append("stateOfResidence", data.stateOfResidence);
    formData.append("lettersOfRecommendation", data.lettersOfRecommendation);
    formData.append("interviewScore", data.interviewScore);

    (data.cv) ? formData.append("cv", data.cv) : formData.append("cv", null);
    (data.personalStatement) ? formData.append("personalStatement", data.personalStatement) : formData.append("personalStatement", null);
    (data.academicStatement) ? formData.append("academicStatement", data.academicStatement) : formData.append("academicStatement", null);
    (data.highSchoolReport) ? formData.append("highSchoolReport", data.highSchoolReport) : formData.append("highSchoolReport", null);
    (data.otherDocuments) ? formData.append("otherDocuments", data.otherDocuments) : formData.append("otherDocuments", null);

    fetch("https://michaelshi.tplinkdns.com/prediction", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) { 
          throw new Error(`Error! HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("TA-DA! Here are your prediction results:", data);
      })
      .catch((error) => {
        console.error("Oops! There was an error submitting the form:", error);
      });
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div key={currentPageIndex}>
          {page}
          <div>{currentPageIndex + 1} / {pages.length}</div>
          
          {!isFirstPage && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}

          <button type="submit">
            {isLastPage ? "Submit" : "Next"}
          </button>

        </div>
      </form>
    </div>
  );
}

export default App;
