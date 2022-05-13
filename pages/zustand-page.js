import create from 'zustand';
import styles from '../styles/Home.module.css';

// Zustand store creation.
const useStore = create((set) => ({
  teamA: 0,
  teamB: 0,
  increaseTeamAScore: () => set((state) => ({ teamA: state.teamA + 1 })),
  decreaseTeamAScore: () => set((state) => ({ teamA: state.teamA - 1 })),
  increaseTeamBScore: () => set((state) => ({ teamB: state.teamB + 1 })),
  decreaseTeamBScore: () => set((state) => ({ teamB: state.teamB - 1 })),
}));

// Winner Component that shows the final results.
const Winner = () => {
  const scoreA = useStore((state) => state.teamA);
  const scoreB = useStore((state) => state.teamB);
  return (
    <div className={styles.winner}>
      <h1 className={styles.text}>Winner</h1>
      <h4 className={styles.text}>
        {scoreA === scoreB ? 'DRAW' : scoreA > scoreB ? 'TEAM A' : 'TEAM B'}
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
  const score = useStore((state) => state.teamA);
  const increaseTeamAScore = useStore((state) => state.increaseTeamAScore);
  const decreaseTeamAScore = useStore((state) => state.decreaseTeamAScore);
  return (
    <Player
      label={'Team A'}
      score={score}
      onIncrease={increaseTeamAScore}
      onDecrease={decreaseTeamAScore}
    />
  );
};

// Player B Components that subscribed the Context.
const PlayerB = () => {
  const score = useStore((state) => state.teamB);
  const increaseTeamAScore = useStore((state) => state.increaseTeamBScore);
  const decreaseTeamAScore = useStore((state) => state.decreaseTeamBScore);
  return (
    <Player
      label={'Team B'}
      score={score}
      onIncrease={increaseTeamAScore}
      onDecrease={decreaseTeamAScore}
    />
  );
};

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

export default function ZustandComponent() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Winner />
        <Players />
      </main>
    </div>
  );
}
