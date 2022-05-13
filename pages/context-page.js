import { memo } from 'react';
import {
  useTeamAScoreApi,
  useTeamAScoreState,
  useTeamBScoreApi,
  useTeamBScoreState,
  ScoresContextProvider,
} from '../context/store-context';
import styles from '../styles/Home.module.css';

// Winner Component that shows the final results.
const Winner = () => {
  const teamA = useTeamAScoreState();
  const teamB = useTeamBScoreState();
  return (
    <div className={styles.winner}>
      <h1 className={styles.text}>Winner</h1>
      <h4 className={styles.text}>
        {teamA === teamB ? 'DRAW' : teamA > teamB ? 'TEAM A' : 'TEAM B'}
      </h4>
    </div>
  );
};

// Reusable player component that render Players details and actions.
const Player = ({ label, score, onIncrease, onDecrease }) => (
  <div className={styles.playerContainer}>
    <h3 className={styles.text}>{label}</h3>
    <h4 className={styles.score}> {score} </h4>

    <div className={styles.btnWrapper}>
      <button className={styles.btn} onClick={onDecrease}>
        -
      </button>
      <button className={styles.btn} onClick={onIncrease}>
        +
      </button>
    </div>
  </div>
);

// Player A Components that subscribed the Context.
const PlayerA = () => {
  const { increaseTeamAScore, decreaseTeamAScore } = useTeamAScoreApi();
  const teamA = useTeamAScoreState();
  return (
    <Player
      label={'Team A'}
      score={teamA}
      onIncrease={increaseTeamAScore}
      onDecrease={decreaseTeamAScore}
    />
  );
};

// Player B Components that subscribed the Context.
const PlayerB = () => {
  const { increaseTeamBScore, decreaseTeamBScore } = useTeamBScoreApi();
  const teamB = useTeamBScoreState();

  return (
    <Player
      label={'Team B'}
      score={teamB}
      onIncrease={increaseTeamBScore}
      onDecrease={decreaseTeamBScore}
    />
  );
};

// Players component will contains all active player components
// eslint-disable-next-line react/display-name
const Players = () => {
  console.log('players');
  return (
    <div className={styles.playersContainer}>
      <h3 className={styles.text}>Players</h3>
      <div className={styles.playersWrapper}>
        <PlayerA />
        <PlayerB />
      </div>
    </div>
  );
};

export default function ContextComponent() {
  return (
    <ScoresContextProvider>
      <div className={styles.container}>
        <main className={styles.main}>
          <Winner />
          <Players />
        </main>
      </div>
    </ScoresContextProvider>
  );
}
