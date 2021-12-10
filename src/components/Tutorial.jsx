import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateTutorial, deleteTutorial } from "../actions/tutorials";
import TutorialDataService from "../services/service";

function Tutorial(props) {
  const [ state, setState ] = useState({
    currentTutorial: {
      id: null,
      title: "",
      description: "",
      published: false,
    },
    message: "",
  })

  useEffect(() => {
    getTutorial(props.match.params.id);
  },[props.match.params.id])

  function onChangeTitle(event) {
    const title = event.target.value;

    setState(prevState => ({
      ...prevState,
      currentTutorial: {
        ...prevState.currentTutorial,
        title: title,
      }
    }));
  }

  function onChangeDescription(event) {
    const description = event.target.value;

    setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
      },
    }));
  }

  function getTutorial(id) {
    TutorialDataService.get(id)
      .then((response) => {
        setState(prevState => ({
          ...prevState,
          currentTutorial: response.data,
        }));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateStatus(status) {
    var data = {
      id: state.currentTutorial.id,
      title: state.currentTutorial.title,
      description: state.currentTutorial.description,
      published: status,
    };

    props
      .updateTutorial(state.currentTutorial._id, data)
      .then((reponse) => {
        console.log(reponse);

        setState(prevState => ({
          ...prevState,
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
        }));

        setState( prevState => ({ 
          ...prevState,
          message: "The status was updated successfully!" 
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateContent() {
    props
      .updateTutorial(state.currentTutorial._id, state.currentTutorial)
      .then((reponse) => {
        console.log(reponse);
        
        setState(prevState => ({ 
          ...prevState,
          message: "The profile was updated successfully!" 
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeTutorial() {
    props
      .deleteTutorial(state.currentTutorial._id)
      .then(() => {
        props.history.push("/tutorials");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const { currentTutorial } = state;

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Profile</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">E-mail</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="mb-3">
              <label>
                <strong>Status: </strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge bg-primary me-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge bg-primary me-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge bg-danger me-2"
            onClick={removeTutorial}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{state.message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Profile...</p>
        </div>
      )}
    </div>
  );
}

export default connect(null, { updateTutorial, deleteTutorial })(Tutorial);
