export function SecondPage({ updateData, atar, ucat, highSchool, extracurricularActivities, lettersOfRecommendation, interviewScore}) {
  return (
    <div>
      <div className="input-container-row">
        <div className="input-container">
          <label>ATAR</label>
          <input
            autoFocus
            required
            type="number"
            value={atar}
            onChange={(e) => updateData("atar", e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>UCAT</label>
          <input
            required
            type="number"
            value={ucat}
            onChange={(e) => updateData("ucat", e.target.value)}
          />
        </div>
      </div>
      <label>High School</label>
      <input
        required
        value={highSchool}
        onChange={(e) => updateData("highSchool", e.target.value)}
      />
      <label>Extracurricular Activities</label>
      <input
        required
        value={extracurricularActivities}
        onChange={(e) => updateData("extracurricularActivities", e.target.value)}
      />
      <label>Letters of Recommendation</label>
      <input
        required
        type="number"
        value={lettersOfRecommendation}
        onChange={(e) => updateData("lettersOfRecommendation", e.target.value)}
      />
      <label>Interview Score</label>
      <input
        required
        type="number"
        value={interviewScore}
        onChange={(e) => updateData("interviewScore", e.target.value)}
      />
    </div>
  );
}

