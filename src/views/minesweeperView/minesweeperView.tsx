import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { Container } from 'react-bootstrap';
import Minefield from './components/minefield/minefiled';
import FieldConfigPanel from './components/FieldConfigPanel/FieldConfigPanel';
import minefieldSelector from './redux/selectors/minefieldSelector';

function MinesweeperView() {
  const {
    minefield,
  } = mapStateToProps();

  return (
    <section className='minesweeperView'>
      <Container>
        <FieldConfigPanel />
        <Minefield {...minefield} />
      </Container>
    </section>
  );
}

function mapStateToProps() {
  const minefield = useMappedState(
    useCallback((state: any) => minefieldSelector(state), []),
  );

  return {
    minefield,
  };
}

export default MinesweeperView;
