import React, { useState } from "react";

const Temp = () => {
  const [data, setData] = useState("");
  const [input, setInput] = useState("rohan");
  const [count, setCount] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCount(false);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <p onClick={handleSubmit}>
        {count === true ? (
          <p>{input}</p>
        ) : (
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        )}
      </p>
      <button onClick={() => setCount(true)}>Add</button>
    </div>
  );
};
export default Temp;



<form method="POST" action="/mypost" enctype="multipart/form-data">
<div class="mb-3">
  <label for="firstname" class="form-label">firstname</label>
  <input type="text" name="firstname" class="form-control" id="firstname" aria-describedby="emailHelp">
  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
</div>
<div class="mb-3">
  <label for="lastname" class="form-label">lastname</label>
  <input type="text" name="lastname" class="form-control" id="lastname">
</div>
<div class="mb-3">
  <label for="samplefile" class="form-label">samplefile</label>
  <input type="file" name="samplefile" multiple class="form-control" id="lastname">
</div>

<button type="submit" class="btn btn-primary">Submit</button>
</form>