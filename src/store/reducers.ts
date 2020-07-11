import appState from './store';
import { Action } from './actionTypes';
import {
  StateInterface, AuthInterface, SettingsInterface, SpeakitStateInterface, SprintStateInterface, AudioCallStateInterface
} from '../types';
import { initialSprintObject, initialAudioCallObject } from '../constants';

const authReducer = (state: AuthInterface, action:Action): AuthInterface => {
  switch (action.type) {
    case 'SET_AUTH': {
      const { value } = action;
      return value;
    }
    default: return state;
  }
};

const settingsReducer = (state: SettingsInterface, action:Action): SettingsInterface => {
  switch (action.type) {
    case 'SET_SETTINGS': {
      const { value } = action;
      return value;
    }
    default: return state;
  }
};

const speakItReducer = (state: SpeakitStateInterface, action:Action): SpeakitStateInterface => {
  switch (action.type) {
    case 'SET_SPEAKIT_ROUND': {
      const { value } = action;
      return { ...state, round: value };
    }
    case 'SET_SPEAKIT_LEVEL': {
      const { value } = action;
      return { ...state, level: value };
    }
    case 'SET_SPEAKIT_WORDS': {
      const { value } = action;
      return { ...state, words: value };
    }
    case 'SET_SPEAKIT_SCREEN': {
      const { value } = action;
      return { ...state, screen: value };
    }
    case 'SET_SPEAKIT_COMPLETE': {
      const { value } = action;
      return { ...state, complete: value };
    }
    case 'SET_SPEAKIT_GAME': {
      const { value } = action;
      return { ...state, game: value };
    }
    case 'SET_SPEAKIT_MODE': {
      const { value } = action;
      return { ...state, mode: value };
    }
    default: return state;
  }
};

const sprintReducer = (state: SprintStateInterface, action:Action): SprintStateInterface => {
  switch (action.type) {
    case 'SET_SPRINT_NEW_GAME': {
      const { level, words, selectLevel } = action.value;
      return {
        ...state,
        level,
        words,
        selectLevel,
        startGame: true,
        finishGame: false,
        screen: 'start',
        pointsForRound: 0,
        pointsLevel: 0,
        step: 0,
        correctAnswersInRow: 0,
        roundTime: 45
      };
    }
    case 'SET_SPRINT_END_GAME': {
      return { ...state, screen: 'results', finishGame: true };
    }
    case 'SET_SPRINT_START_GAME': {
      return { ...state, startGame: !state.startGame };
    }
    case 'SET_SPRINT_SCREEN': {
      const { value } = action;
      return { ...state, screen: value };
    }
    case 'SET_SPRINT_POINTS_LEVEL': {
      const { value } = action;
      return { ...state, pointsLevel: value };
    }
    case 'SET_SPRINT_ROUND_TIME': {
      const { value } = action;
      return { ...state, roundTime: value };
    }
    case 'SET_SPRINT_ROUND_NUMBER': {
      const { value } = action;
      return { ...state, round: value };
    }
    case 'SET_SPRINT_LEVEL_NUMBER': {
      const { value } = action;
      return { ...state, level: value };
    }
    case 'SET_SPRINT_STEP_AND_CORRECT_ANSWERS_IN_ROW': {
      const { value } = action;
      return {
        ...state, correctAnswersInRow: 0, pointsLevel: 0, step: value
      };
    }
    case 'SET_SPRINT_WORDS': {
      const { value } = action;
      return { ...initialSprintObject, words: value };
    }
    case 'SET_SPRINT_CORRECT_ANSWER': {
      const { correctAnswersInRowNext, pointsLevelNext, pointsForAnswerPlus } = action.value;
      return {
        ...state,
        correctAnswersInRow: correctAnswersInRowNext,
        pointsLevel: pointsLevelNext,
        pointsForRound:
        state.pointsForRound + pointsForAnswerPlus,
        step: state.step + 1
      };
    }
    default: return state;
  }
};

const audioReducer = (state: AudioCallStateInterface, action:Action): AudioCallStateInterface => {
  switch (action.type) {
    case 'SET_AUDIO_WORDS': {
      const { words, allAnswerArray, level } = action.value;
      return {
        ...state,
        words,
        level,
        allAnswerArray
      };
    }
    case 'SET_AUDIO_NEW_GAME': {
      const {
        words, level, allAnswerArray, page
      } = action.value;
      return {
        ...initialAudioCallObject,
        words,
        level,
        page,
        allAnswerArray,
        startGame: true
      };
    }
    case 'SET_AUDIO_START_GAME': {
      return {
        ...state,
        startGame: true
      };
    }
    case 'SET_AUDIO_SCREEN': {
      return {
        ...state,
        screen: action.value
      };
    }
    case 'SET_AUDIO_STEP': {
      return {
        ...state,
        step: action.value,
        addAnswer: false,
        answerType: false
      };
    }
    case 'SET_AUDIO_CORRECT_ANSWER': {
      const { correctAnswer, addAnswer, answerType } = action.value;
      return {
        ...state, correctAnswer, addAnswer, answerType
      };
    }
    case 'SET_AUDIO_ERROR_ANSWER': {
      const { errorAnswer, addAnswer, answerType } = action.value;
      return {
        ...state, errorAnswer, addAnswer, answerType
      };
    }
    default: return state;
  }
};

const mainReducer = (
  {
    auth, settings, speakit, sprint, audioCall
  }: StateInterface,
  action:Action
): StateInterface => ({
  auth: authReducer(auth, action),
  settings: settingsReducer(settings, action),
  speakit: speakItReducer(speakit, action),
  sprint: sprintReducer(sprint, action),
  audioCall: audioReducer(audioCall, action)
});

export default mainReducer;
