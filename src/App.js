import { useState } from "react";
import { useForm } from "./useForm";
import { FirstPage } from "./FirstPage";
import { SecondPage } from "./SecondPage";
import { ThirdPage } from "./ThirdPage";
import { ResultPage } from "./ResultPage";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  atar: "",
  ucat: "",
  highSchool: "",
  extracurriculars: "",
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
  const storedData = JSON.parse(localStorage.getItem("data")) || INITIAL_DATA;
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

    // If it is the last page, submit the form
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("ethnicity", "Australian");
      formData.append("highSchool", data.highSchool);
      formData.append("stateOfResidence", data.stateOfResidence);
      formData.append("atar", data.atar);
      formData.append("ucat", data.ucat);
      formData.append("extracurriculars", data.extracurriculars);
      formData.append("lettersOfRecommendation", data.lettersOfRecommendation);
      formData.append("interviewScore", data.interviewScore);

      if (data.cv) formData.append("cv", data.cv);
      if (data.highSchoolReport) formData.append("highSchoolReport", data.highSchoolReport);
      if (data.personalStatement) formData.append("personalStatement", data.personalStatement);
      if (data.academicStatement) formData.append("academicStatement", data.academicStatement);
      if (data.otherDocuments) formData.append("otherDocuments", data.otherDocuments);

      const response = await fetch("https://michaelshi.tplinkdns.com/predict", {
        method: "POST",
        body: formData,
        mode: 'no-cors' 
      });

      if (response.ok) {
        const result = await response.json();
        updateData("result", result);
      } else {
        throw new Error("Failed to fetch");
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Oops! An error occurred:", error);
    } finally {
      setLoading(false);
    }

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
