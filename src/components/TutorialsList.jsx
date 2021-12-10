import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveTutorials, findTutorialsByTitle, deleteAllTutorials } from "../actions/tutorials";



function TutorialsList(props) {
  const [ state, setState ] = useState({
    currentTutorial: null,
    currentIndex: -1,
    searchTitle: "",
  })

  useEffect(() => {
    props.retrieveTutorials();
  },[props])

  function onChangeSearchTitle(event) {
    const searchTitle = event.target.value;

    setState(prevState => ({
      ...prevState,
      searchTitle: searchTitle,
    }));
  }

  function refreshData() {
    setState(prevState => ({
      ...prevState,
      currentTutorial: null,
      currentIndex: -1,
    }));
  }

  function setActiveTutorial(tutorial, index) {
    setState(prevState => ({
      ...prevState,
      currentTutorial: tutorial,
      currentIndex: index,
    }));
  }

  function removeAllTutorials() {
    props
      .deleteAllTutorials()
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function findByTitle() {
    refreshData();

    props.findTutorialsByTitle(state.searchTitle);
  }

  return (
    <div className="list row">
      <div className="col-md-12 mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={state.searchTitle}
            onChange={onChangeSearchTitle}
          />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
        </div>
      </div>
        <div className="col-md-6 mb-3">
          <h4>Profile List</h4>

          <ul className="list-group">
            {props &&
              props.tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === state.currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="mt-3 btn btn-sm btn-danger"
            onClick={removeAllTutorials}
          >
            Delete All
          </button>
        </div>
      <div className="col-md-6 mb-3">
        {state.currentTutorial ? (
          <div>
            <h4>User Profile</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {state.currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {state.currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {state.currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + state.currentTutorial._id}
              className="badge bg-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Profile...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tutorials: state.tutorials,
  };
};

export default connect(mapStateToProps, { retrieveTutorials, findTutorialsByTitle, deleteAllTutorials })(TutorialsList);
