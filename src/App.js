import { useState } from "react";
import { useForm } from "./useForm";
import { FirstPage } from "./pages/FirstPage";
import { SecondPage } from "./pages/SecondPage";
import { ThirdPage } from "./pages/ThirdPage";
import { ResultPage } from "./pages/ResultPage";
import { ProgressBar } from "./components/ProgressBar";
import { Spinner } from "./components/Spinner";
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
  const [userData, setUserData] = useState(storedData);
  const [fileData, setFileData] = useState(FILE_DATA_TEMPLATE);
  const [reasons, setReasons] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [startClicked, setStartClicked] = useState(false); 
  const [resultVisible, setResultVisible] = useState(false);

  // Local storage for data persistence
  function updateData(key, value) {
    const updatedData = { ...userData, [key]: value };
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData)); 
  }

  // Handle file uploads
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

  const handleClose = () => {
    setStartClicked(false);
    setLoading(false);
    setResultVisible(false);
  };

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
    
    fetch("https://michaelshi.tplinkdns.com/prediction", {
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
        setReasons(data["reasons"]);
        let data_pred = {}
        data_pred[data["predictions"][0]["classes"][0]] = data["predictions"][0]["scores"][0];
        data_pred[data["predictions"][0]["classes"][1]] = data["predictions"][0]["scores"][1];
        data_pred[data["predictions"][0]["classes"][2]] = data["predictions"][0]["scores"][2];
        setScores(data_pred);
        setResultVisible(true);
      })
      .catch((error) => {
        console.error("Oops! There was an error submitting the form:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="app">
      <div className="banner">
        <h1 onClick={() => {
          setStartClicked(false);
          setLoading(false);
          setResultVisible(false);
        }}>Medical School Application Predictor</h1>
        <p>Thesis &nbsp; | &nbsp; Nemat Bhullar</p>
      </div>
      
      {/* Starting Home Page */}
      {!startClicked && (
        <div className="overlay">
          <div className="start-page">
            <h2>Welcome to the</h2>
            <h1><b>Medical School Enrolment Predictor</b></h1>
            <hr/>
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
        <div className="navigation-banner">
          <button className="close-button" onClick={() => {
              handleClose()
          }}>&#x2190;</button>
          <ProgressBar currentPageIndex={currentPageIndex} length={pages.length} />
        </div>
        
        
        <form onSubmit={onSubmit}>
          <div key={currentPageIndex}>
            {page}
            
            <div className="button-container">
              <button className="back-button" onClick={() => {
                if (isFirstPage) {
                  handleClose()
                } else { 
                  back() 
                }
              }} >
                  Back
              </button>

              <button className="next-button">
                {isLastPage ? "Submit" : "Next"}
              </button>
            </div>
  
          </div>
        </form>
      </div> 

      {/* Loading Spinner */}
      {loading && (
        <div className="overlay">
          <div className="loading-page">
            <Spinner />
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
