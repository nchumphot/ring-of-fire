import { Link } from "react-router-dom";

export function StartGameModal(): JSX.Element {
  return (
    <div
      className="modal fade"
      id="start-game-modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Start game
            </h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to start the game?</p>
            <p>You will not be able to edit players after this.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <Link to="/start">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Start
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
