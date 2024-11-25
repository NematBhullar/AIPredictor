import { useState } from "react";
import { useForm } from "./useForm";
import { FirstPage } from "./pages/FirstPage";
import { SecondPage } from "./pages/SecondPage";
import { ThirdPage } from "./pages/ThirdPage";
import { ResultPage } from "./pages/ResultPage";
import { ProgressBar } from "./components/ProgressBar";
import "./App.css";

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
};

const FILE_DATA_TEMPLATE = {
  cv: null,
  highSchoolReport: null,
  personalStatement: null,
  academicStatement: null,
  otherDocuments: null,
}

function App() {
  const storedData = JSON.parse(localStorage.getItem("userData")) || FORM_DATA_TEMPLATE;
  const storedFileData = FILE_DATA_TEMPLATE

  const [userData, setUserData] = useState(storedData);
  const [fileData, setFileData] = useState(storedFileData);
  const [reasons, setReasons] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [startClicked, setStartClicked] = useState(false); 
  const [resultVisible, setResultVisible] = useState(false);

  function updateData(key, value) {
    const updatedData = { ...userData, [key]: value };
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData)); 
  }

  function handleFileUpload(key, file) {
    if (!file) return;
    const updatedData = { ...fileData, [key]: file };
    setFileData(updatedData);
  }

  const { currentPageIndex, page, pages, isFirstPage, isLastPage, next, back } = useForm([
    <FirstPage {...userData} updateData={updateData} />,
    <SecondPage {...userData} updateData={updateData} handleFileUpload={handleFileUpload} />,
    <ThirdPage {...userData} updateData={updateData} handleFileUpload={handleFileUpload} />
  ]);

  async function onSubmit(e) {
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

  return (
    <div className="app">
      <div className="banner">
        <h1>Medical School Application Predictor</h1>
        <p>Thesis &nbsp; | &nbsp; Nemat Bhullar</p>
      </div>
      
      {/* Starting Home Page */}
      {!startClicked && (
        <div className="overlay">
          <div className="start-page">
            <h1>Welcome to the Medical School Application Predictor</h1>
            <p>Click the button below to start the application process.</p>
            <button 
              className="start-button" 
              onClick={() => setStartClicked(true)}>
              Start
            </button>
          </div>
        </div>
      )}

      
      
      {/* Forms for User */}
      <div className="form-wrapper">
        <ProgressBar currentPageIndex={currentPageIndex} length={pages.length} />
        
        <form onSubmit={onSubmit}>
          <div key={currentPageIndex}>
            {page}
            
            <div className="button-container">
              <button type="button" onClick={back} hidden={isFirstPage}>
                  Back
              </button>

              <button type="submit">
                {isLastPage ? "Submit" : "Next"}
              </button>
            </div>
  
          </div>
        </form>
      </div> 

      {/* Loading Spinner */}
      {loading && (
        <div className="overlay">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}

      {/* Results Page Overlay */}
      {resultVisible && (
        <div className="overlay">
          <ResultPage
            reasons={reasons}
            scores={scores}
            resultVisible={resultVisible}
            onClose={() => {
              setResultVisible(false);
              setStartClicked(false);
            }}
          />
        </div>
      )} 

    </div>
  );
}

export default App;
