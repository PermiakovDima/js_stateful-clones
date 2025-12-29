'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClones = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    if (type === 'addProperties') {
      stateClones = { ...stateClones, ...extraData };
    }

    if (type === 'removeProperties') {
      stateClones = { ...stateClones };

      for (let q = 0; q < keysToRemove.length; q++) {
        delete stateClones[keysToRemove[q]];
      }
    }

    if (type === 'clear') {
      stateClones = {};
    }

    stateHistory.push({ ...stateClones });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
