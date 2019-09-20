import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Form, FormControl, FormLabel, Collapse, Button, Container, Row, Col } from 'react-bootstrap';
import { setFieldConfig as setFieldConfigAction } from '../../redux/actions/minefieldActions';

const defaultState = {
  boardWidth: 0,
  boardHeight: 0,
  amountOfMines: undefined
};

interface IConfigPanelState {
  boardWidth: number;
  boardHeight: number;
  amountOfMines?: number;
}

export default function FieldConfigPanel() {
  const [fieldConfig, setFieldConfig] = useState(defaultState as IConfigPanelState);
  const [isConfigVisible, setConfigVisibility] = useState(true);

  const dispatch = useDispatch();

  function setBoardSettings(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(setFieldConfigAction({
      height: fieldConfig.boardHeight,
      width: fieldConfig.boardWidth,
      amountOfMines: fieldConfig.amountOfMines
    }));
  }

  const handleChange = useCallback((e) => {
    e.persist();

    setFieldConfig((state) => {
      return ({
        ...state,
        [e.target.name]: e.target.value
      });
    });
  }, []);

  function isMinefieldSizeDefined() {
    return fieldConfig.boardWidth && fieldConfig.boardHeight;
  }

  const getMaxiumAmountOfMines = useMemo(() => {
    const { boardHeight, boardWidth } = fieldConfig;
    return isMinefieldSizeDefined() ? Math.round((boardWidth * boardHeight) / 3) : 0;
  }, [fieldConfig.boardHeight, fieldConfig.boardWidth]);

  function toggleConfigVisibility() {
    setConfigVisibility(!isConfigVisible);
  }

  function getValidationMessage(fieldName: string) {
    console.log('getValidationMessage', fieldName);
    
    switch (fieldName) {
      case 'amountOfMines': {
        if (!fieldConfig.amountOfMines) return;
        if (getMaxiumAmountOfMines <= fieldConfig.amountOfMines) {
          return `Number of mines can be ${getMaxiumAmountOfMines} maximum.`;
        }
      }

      default: return;
    }
  }

  return (
    <>
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
              <Form className="p-3 mb-3 jumbotron border">
                <h5>Mineboard settings:</h5>
                <Form.Group>
                  <p>Enter desirable minefield size.</p>
                  <hr />

                  <FormLabel>Width:</FormLabel>
                  <FormControl
                    className="form-control"
                    name={'boardWidth'}
                    type="text"
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                  <FormLabel>Height:</FormLabel>
                  <FormControl
                    className="form-control"
                    name={'boardHeight'}
                    type="text"
                    onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                  <FormLabel>Amount of mines:</FormLabel>
                  <FormControl
                    className="form-control"
                    name={'amountOfMines'}
                    type="number"
                    required
                    min={1}
                    max={getMaxiumAmountOfMines}
                    isInvalid={(!!fieldConfig.amountOfMines && (getMaxiumAmountOfMines < fieldConfig.amountOfMines))}
                    disabled={!isMinefieldSizeDefined()}
                    onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">{getValidationMessage('amountOfMines')}</Form.Control.Feedback>
                </Form.Group>
                <hr />
                <Button
                  variant="outline-primary"
                  onClick={setBoardSettings}>
                  Set Minefield
                </Button>
              </Form>
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
    </>
  );
}
