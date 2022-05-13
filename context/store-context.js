import { createContext, useState, useContext, useMemo } from 'react';

const TeamAScoresStateCtx = createContext(null);
const TeamAScoresApiCtx = createContext(null);
const TeamBScoresStateCtx = createContext(null);
const TeamBScoresApiCtx = createContext(null);

export const ScoresContextProvider = ({ children }) => {
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);
  const teamAApi = useMemo(
    () => ({
      increaseTeamAScore: () => setTeamA((v) => v + 1),
      decreaseTeamAScore: () => setTeamA((v) => v - 1),
    }),
    [],
  );
  const teamBApi = useMemo(
    () => ({
      increaseTeamBScore: () => setTeamB((v) => v + 1),
      decreaseTeamBScore: () => setTeamB((v) => v - 1),
    }),
    [],
  );

  return (
    <TeamAScoresStateCtx.Provider value={teamA}>
      <TeamAScoresApiCtx.Provider value={teamAApi}>
        <TeamBScoresStateCtx.Provider value={teamB}>
          <TeamBScoresApiCtx.Provider value={teamBApi}>
            {children}
          </TeamBScoresApiCtx.Provider>
        </TeamBScoresStateCtx.Provider>
      </TeamAScoresApiCtx.Provider>
    </TeamAScoresStateCtx.Provider>
  );
};

export const useTeamAScoreState = () => {
  const ctx = useContext(TeamAScoresStateCtx);

  if (typeof ctx === undefined) {
    throw new Error(
      'useTeamAScoreState must be used within TeamAScoresStateCtxProvider',
    );
  }

  return ctx;
};
export const useTeamBScoreState = () => {
  const ctx = useContext(TeamBScoresStateCtx);

  if (typeof ctx === undefined) {
    throw new Error(
      'useTeamBScoreState must be used within TeamBScoresStateCtxProvider',
    );
  }

  return ctx;
};
export const useTeamAScoreApi = () => {
  const ctx = useContext(TeamAScoresApiCtx);

  if (typeof ctx === undefined) {
    throw new Error(
      'useTeamAScoreApi must be used within TeamAScoresApiCtxProvider',
    );
  }

  return ctx;
};
export const useTeamBScoreApi = () => {
  const ctx = useContext(TeamBScoresApiCtx);

  if (typeof ctx === undefined) {
    throw new Error(
      'useTeamBScoreApi must be used within TeamBScoresApiCtxProvider',
    );
  }

  return ctx;
};
