export function FirstPage({ updateData, firstName, lastName, age, gender, stateOfResidence }) {
  return (
    <div>
      <label>First Name</label>
      <input
        autoFocus
        required
        value = {firstName}
        onChange={(e) => updateData("firstName", e.target.value)}
      />
      <label>Last Name</label>
      <input
        required
        value = {lastName}
        onChange={(e) => updateData("lastName", e.target.value)}
      />
      <label>Age</label>
      <input
        required
        type="number"
        value = {age}
        onChange={(e) => updateData("age", e.target.value)}
      />
      <label>Gender</label>
      <input
        required
        value = {gender}
        onChange={(e) => updateData("gender", e.target.value)}
      />
      <label>State of Residence</label>
      <input
        required
        type="checkbox"
        checked = {stateOfResidence}
        onChange={(e) => updateData("stateOfResidence", e.target.value)}
      />
    </div>
  );
}