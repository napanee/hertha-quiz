'use client';

import random from 'random';
import { useReducer } from 'react';

import { shuffleList, halveList } from '@/utils/array-helper';

import { playerListComplete } from './main';


export enum VISIBLE_INFO_CHOICES {
	NAME = 'name',
	NUMBER = 'number',
}

export enum ACTION_KIND {
	GUESS = 'GUESS',
	NEXT = 'NEXT',
}

export type AnswerAction = {
	type: ACTION_KIND;
	payload?: string;
};

export type Player = {
	filename: string;
	firstName: string;
	id: number;
	lastName: string;
};

type ReducerState = {
	attempts: string[];
	choices: Player[];
	currentPlayer: Player;
	isResultVisible: boolean;
	playerList: Player[];
	visibleInfo: VISIBLE_INFO_CHOICES;
};

function reducer(state: ReducerState, action: AnswerAction): ReducerState {
	const { payload, type } = action;
	const isCorrect = payload === state.currentPlayer.id.toString();

	switch (type) {
		case ACTION_KIND.GUESS:
			if (isCorrect) {
				return {
					...state,
					attempts: [...state.attempts, 'correct'],
					choices: [],
					isResultVisible: true,
				};
			} else {
				const filteredList = state.choices
					.filter((choice) => {
						const isSelectedChoice = choice.id.toString() === payload;
						const isCurrentPlayer = choice.id === state.currentPlayer.id;

						return !isSelectedChoice && !isCurrentPlayer;
					});
				const shuffledList = shuffleList<Player>(filteredList);
				const splitPool = halveList<Player>(shuffledList);
				const attempts = [...state.attempts, 'wrong'];

				return {
					...state,
					attempts,
					choices: [...splitPool, state.currentPlayer],
					isResultVisible: attempts.length === 3,
				};
			}
		case ACTION_KIND.NEXT: {
			const prevPlayer = state.currentPlayer;
			const attempts = state.attempts.filter((attempt) => attempt !== 'correct').length;
			const additionalPlayer = Array<Player>(attempts).fill(state.currentPlayer);
			const modifiedPlayerList = [
				...state.playerList.filter(({ id }) => id !== prevPlayer.id),
				...additionalPlayer,
			];
			const randomInt = random.int(0, modifiedPlayerList.length - 1);
			const list = [VISIBLE_INFO_CHOICES.NAME, VISIBLE_INFO_CHOICES.NUMBER];
			let nextPlayer = modifiedPlayerList.filter(({ id }) => id !== prevPlayer.id)[randomInt];

			if (modifiedPlayerList.length > 0 && !nextPlayer) {
				nextPlayer = modifiedPlayerList[0];
			}

			return {
				...state,
				attempts: [],
				choices: playerListComplete,
				currentPlayer: nextPlayer,
				isResultVisible: false,
				playerList: modifiedPlayerList,
				visibleInfo: random.choice<VISIBLE_INFO_CHOICES>(list) ?? VISIBLE_INFO_CHOICES.NAME,
			};
		}
	}
}

function createInitialState(playerPool: Player[]): ReducerState {
	const randomInt = random.int(0, playerPool.length - 1);
	const list = [VISIBLE_INFO_CHOICES.NAME, VISIBLE_INFO_CHOICES.NUMBER];

	return {
		attempts: [],
		choices: playerPool,
		currentPlayer: playerPool[randomInt],
		isResultVisible: false,
		playerList: playerPool,
		visibleInfo: random.choice<VISIBLE_INFO_CHOICES>(list) ?? VISIBLE_INFO_CHOICES.NAME,
	};
}

export const getReducer = () => useReducer(
	reducer,
	playerListComplete,
	createInitialState
);
