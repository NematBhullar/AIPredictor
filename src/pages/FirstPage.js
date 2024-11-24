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
      <select
        required
        type="dropdown"
        value = {stateOfResidence}
        onChange={(e) => updateData("stateOfResidence", e.target.value)}
      >
        <option value="">Select your state</option>
        <option value="NSW">New South Wales</option>
        <option value="VIC">Victoria</option>
        <option value="QLD">Queensland</option>
        <option value="SA">South Australia</option>
        <option value="WA">Western Australia</option>
        <option value="TAS">Tasmania</option>
        <option value="NT">Northern Territory</option>
        <option value="ACT">Australian Capital Territory</option>
      </select>
    </div>
  );
}