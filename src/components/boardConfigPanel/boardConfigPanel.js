import React, { useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Collapse, Button, Container, Row, Col } from 'react-bootstrap';
import { setBoardConfig as setBoardConfigAction } from 'actions/mineBoardActions';

const defaultState = {
  boardWidth: undefined,
  boardHeight: undefined,
  amountOfMines: undefined
};

export default function BoardConfigPanel() {
  const [boardConfig, setBoardConfig] = useState(defaultState);
  
  const [isConfigVisible, setConfigVisibility] = useState(true);

  const dispatch = useDispatch();

  function setBoardSettings(e) {
    e.preventDefault();
    dispatch(setBoardConfigAction({ height: boardConfig.boardHeight, width: boardConfig.boardWidth, amountOfMines: boardConfig.amountOfMines }));
  };

  function handleChange(e) {
    e.persist();

    setBoardConfig((state) => {
      return ({
        ...state,
        [e.target.name]: e.target.value
      });
    });
  }

  function isMinefieldSizeDefined() {
    return boardConfig.boardWidth && boardConfig.boardHeight;
  }

  function maximumMines() {
    return isMinefieldSizeDefined() ? Math.round((boardConfig.boardWidth * boardConfig.boardHeight) / 3) : 0;
  }

  function toggleConfigVisibility() {
    setConfigVisibility(!isConfigVisible);
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Button
              variant="outline-secondary"
              onClick={toggleConfigVisibility}
              aria-expanded={isConfigVisible}
            >
              {isConfigVisible ? 'Hide config' : 'Show config'}
            </Button>
          </Col>
        </Row>
      </Container>

      <hr />
      
      <Collapse in={isConfigVisible}>
        <Container>
          <Row>
            <Col>
              <form onSubmit={setBoardSettings} className="p-3 mb-3 jumbotron border">
                <h5>Mineboard settings:</h5>
                <div className="form-group">
                  <p>Enter desirable minefield size.</p>
                  <hr />

                  <label>Width:</label>
                  <input
                    className="form-control"
                    name={'boardWidth'}
                    type="text"
                    onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Height:</label>
                  <input
                    className="form-control"
                    name={'boardHeight'}
                    type="text"
                    onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Amount of mines:</label>
                  <input
                    className="form-control"
                    name={'amountOfMines'}
                    type="number"
                    required
                    min={1}
                    max={maximumMines()}
                    disabled={!isMinefieldSizeDefined()}
                    onChange={handleChange} />
                </div>
                <hr />
                <Button
                  variant="outline-primary"
                  as="input"
                  type="submit"
                  value="Set Minefield" />
              </form>
            </Col>
            <Col>
              <div className="p-3 jumbotron border">
                <h5>
                  Instructions:
                </h5>
                <ul>
                  <li className="mb-3">Primary click (LMB) on tiles to start your game and reveal more.</li>
                  <li className="mb-3">Secondary click (RMB) on tile to tag it as potential tile with mine.</li>
                  <li className="mb-3">Use Ctrl + secondary click (RMB) if you're uncertain and you'd like to go back to it later.</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </Collapse>
    </div>
  );
}
