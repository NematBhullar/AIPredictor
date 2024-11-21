export function SecondPage({ updateData, atar, ucat, highSchool, extracurriculars, lettersOfRecommendation, interviewScore}) {
  return (
    <div>
      <label>ATAR</label>
      <input
        autoFocus
        required
        type="number"
        value={atar}
        onChange={(e) => updateData("atar", e.target.value)}
      />
      <label>UCAT</label>
      <input
        required
        type="number"
        value={ucat}
        onChange={(e) => updateData("ucat", e.target.value)}
      />
      <label>High School</label>
      <input
        required
        value={highSchool}
        onChange={(e) => updateData("highSchool", e.target.value)}
      />
      <label>Extracurricular Activities</label>
      <input
        required
        value={extracurriculars}
        onChange={(e) => updateData("extracurriculars", e.target.value)}
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

