import React, { useState } from "react";
import { connect } from "react-redux";
import { createTutorial } from "../actions/tutorials";

function AddTutorial(props) {
  const [ state, setState ] = useState({
    id: null,
    title: "",
    description: "",
    published: false,

    submitted: false,
  })

  function onChangeName(event) {
    setState(prevState =>({
      ...prevState,
      title: event.target.value,
    }));
  }

  function onChangeemail(event) {
    setState(prevState =>({
      ...prevState,
      description: event.target.value,
    }));
  }

  function onChangephonenumber(event) {
    setState(prevState =>({
      ...prevState,
      description: event.target.value,
    }));
  }

  function onChangepassword(event) {
    setState(prevState =>({
      ...prevState,
      description: event.target.value,
    }));
  }


  function saveTutorial() {
    const { title, description } = state;

    props.createTutorial(title, description)
      .then((data) => {
        setState({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,

          submitted: true,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function newTutorial() {
    setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    });
  }

  return (
    <div className="submit-form">
      {state.submitted ? (
        <div>
          <h4>Profile created successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Create
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={state.Name}
              onChange={onChangeName}
              name="title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description">E-mail</label>
            <textarea
              className="form-control"
              id="description"
              required
              value={state.email}
              onChange={onChangeemail}
              name="description"
            />
          </div>
           
          <div className="mb-3">
            <label htmlFor="title">Phone number</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={state.phonenumber}
              onChange={onChangephonenumber}
              name="title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title">Password</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={state.password}
              onChange={onChangepassword}
              name="title"
            />
          </div>
          


          <button onClick={saveTutorial} className="btn btn-success mb-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default connect(null, { createTutorial })(AddTutorial);
