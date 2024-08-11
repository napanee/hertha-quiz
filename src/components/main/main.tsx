'use client';

import Image from 'next/image';
import random from 'random';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useReducer, useState } from 'react';

import { shuffleList, halveList } from '@/utils/array-helper';

import styles from './main.module.scss';


enum VISIBLE_INFO_CHOICES {
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

/**
 * [...document.querySelectorAll('.people-teaser:has(.shirt-number)')].map((player) => {
 *   const firstName = player.querySelector('.first-name').innerText.toLowerCase();
 *   const lastName = player.querySelector('.last-name').innerText.toLowerCase();
 *   const number = player.querySelector('.shirt-number')?.innerText;
 *   const img = player.querySelector('.image').src.replace('mobile', 'hd');
 *    return {id: Number(number), firstName: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`, lastName: `${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`, filename: img};
 * }).toSorted(({ id: aId }, { id: bId }) => aId - bId);
 */
const playerListComplete: Player[] = [
	{ id: 1, firstName: 'Tjark', lastName: 'Ernst', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11641_kicker_team_standard_hd.jpeg' },
	{ id: 2, firstName: 'Julian', lastName: 'Eitschberger', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11688_kicker_team_standard_hd.jpeg' },
	{ id: 3, firstName: 'Agustín', lastName: 'Rogel', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11690_kicker_team_standard_hd.jpeg' },
	{ id: 4, firstName: 'Marc oliver', lastName: 'Kempf', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11685_kicker_team_standard_hd.jpeg' },
	{ id: 5, firstName: 'Andreas', lastName: 'Bouchalakis', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11650_kicker_team_standard_hd.jpeg' },
	{ id: 6, firstName: 'Diego', lastName: 'Demme', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11652_kicker_team_standard_hd.jpeg' },
	{ id: 7, firstName: 'Florian', lastName: 'Niederlechner', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11674_kicker_team_standard_hd.jpeg' },
	{ id: 8, firstName: 'Kevin', lastName: 'Sessa', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11654_kicker_team_standard_hd.jpeg' },
	{ id: 9, firstName: 'Smail', lastName: 'Prevljak', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11676_kicker_team_standard_hd.jpeg' },
	{ id: 10, firstName: 'Ibrahim', lastName: 'Maza', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11662_kicker_team_standard_hd.jpeg' },
	{ id: 11, firstName: 'Fabian', lastName: 'Reese', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11665_kicker_team_standard_hd.jpeg' },
	{ id: 14, firstName: 'Bilal', lastName: 'Hussein', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11714_kicker_team_standard_hd.jpeg' },
	{ id: 16, firstName: 'Jonjoe', lastName: 'Kenny', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11712_kicker_team_standard_hd.jpeg' },
	{ id: 18, firstName: 'Luca', lastName: 'Schuler', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11671_kicker_team_standard_hd.jpeg' },
	{ id: 19, firstName: 'Jeremy', lastName: 'Dudziak', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11697_kicker_team_standard_hd.jpeg' },
	{ id: 20, firstName: 'Palkó', lastName: 'Dárdai', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11693_kicker_team_standard_hd.jpeg' },
	{ id: 22, firstName: 'Marten', lastName: 'Winkler', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11659_kicker_team_standard_hd.jpeg' },
	{ id: 23, firstName: 'Bradley', lastName: 'Ibrahim', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11653_kicker_team_standard_hd.jpeg' },
	{ id: 25, firstName: 'Haris', lastName: 'Tabaković', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11669_kicker_team_standard_hd.jpeg' },
	{ id: 26, firstName: 'Gustav', lastName: 'Christensen', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11672_kicker_team_standard_hd.jpeg' },
	{ id: 27, firstName: 'Michaël', lastName: 'Cuisance', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11649_kicker_team_standard_hd.jpeg' },
	{ id: 31, firstName: 'Márton', lastName: 'Dárdai', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11710_kicker_team_standard_hd.jpeg' },
	{ id: 33, firstName: 'Michał', lastName: 'Karbownik', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11681_kicker_team_standard_hd.jpeg' },
	{ id: 35, firstName: 'Marius', lastName: 'Gersbeck', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11640_kicker_team_standard_hd.jpeg' },
	{ id: 36, firstName: 'Luis', lastName: 'Trus', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11702_kicker_team_standard_hd.jpeg' },
	{ id: 37, firstName: 'Toni', lastName: 'Leistner', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11691_kicker_team_standard_hd.jpeg' },
	{ id: 38, firstName: 'Julius', lastName: 'Gottschalk', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11705_kicker_team_standard_hd.jpeg' },
	{ id: 39, firstName: 'Derry', lastName: 'Scherhant', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11666_kicker_team_standard_hd.jpeg' },
	{ id: 40, firstName: 'Oliver', lastName: 'Rölke', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11723_kicker_team_standard_hd.jpeg' },
	{ id: 41, firstName: 'Pascal', lastName: 'Klemens', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11656_kicker_team_standard_hd.jpeg' },
	{ id: 42, firstName: 'Deyovaisio', lastName: 'Zeefuik', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11692_kicker_team_standard_hd.jpeg' },
	{ id: 43, firstName: 'Tim', lastName: 'Goller', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11694_kicker_team_standard_hd.jpeg' },
	{ id: 44, firstName: 'Linus', lastName: 'Gechter', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11683_kicker_team_standard_hd.jpeg' },
	{ id: 45, firstName: 'Wilfried', lastName: 'Kanga', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11717_kicker_team_standard_hd.jpeg' },
	{ id: 47, firstName: 'Selim', lastName: 'Telib', filename: 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11699_kicker_team_standard_hd.jpeg' },
];

type ReducerState = {
	attempts: string[];
	choices: Player[];
	currentPlayer: Player;
	isCorrect: boolean;
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
					isCorrect,
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

				return {
					...state,
					attempts: [...state.attempts, 'wrong'],
					choices: [...splitPool, state.currentPlayer],
					isCorrect,
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
				isCorrect: false,
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
		isCorrect: false,
		playerList: playerPool,
		visibleInfo: random.choice<VISIBLE_INFO_CHOICES>(list) ?? VISIBLE_INFO_CHOICES.NAME,
	};
}

const Main = () => {
	const [{ attempts, choices, currentPlayer, visibleInfo, isCorrect }, dispatch] = useReducer(
		reducer,
		playerListComplete,
		createInitialState
	);
	const [isClient, setIsClient] = useState(false);
	const allAttempts = useMemo(() => [
		...attempts,
		...(Array<string>(3 - attempts.length).fill('unanswered')),
	], [attempts]);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();

		dispatch({ payload: event.target.value, type: ACTION_KIND.GUESS });
	};

	const handleClick = (event: MouseEvent) => {
		event.preventDefault();

		dispatch({ type: ACTION_KIND.NEXT });
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!currentPlayer) {
		return 'FERTIG';
	}

	const playerNumber = isCorrect || visibleInfo === VISIBLE_INFO_CHOICES.NUMBER ? currentPlayer.id : '??';
	let playerName = isCorrect || visibleInfo === VISIBLE_INFO_CHOICES.NAME
		? (
			<>
				{currentPlayer.firstName.toUpperCase()}
				<span>{currentPlayer.lastName.toUpperCase()}</span>
			</>
		)
		: (<>?? <span>??</span></>);

	if (!isClient) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<div className={styles['player-image']}>
					<Image src={currentPlayer.filename} alt="" fill loading="lazy" />
					<ul className={styles.attempts}>
						{allAttempts.map((attempt, index) => (
							<li key={index} className={styles[`is-${attempt}`]}>
								{attempt}
							</li>
						))}
					</ul>
					<button className={styles.next} type="button" onClick={handleClick}>Weiter</button>
				</div>
				<div className={styles['player-info']}>
					<span className={styles['player-name']}>
						{playerName}
						{attempts.length < 3 && visibleInfo !== VISIBLE_INFO_CHOICES.NAME && (
							<select onChange={handleChange}>
								<option></option>
								{choices
									.toSorted(({ lastName: aName }, { lastName: bName }) => aName.localeCompare(bName))
									.map(({ id, firstName, lastName }, i) => (
										<option key={id} value={id}>{lastName}, {firstName}</option>
									))}
							</select>
						)}
					</span>
					<span className={styles['player-number']}>
						{playerNumber}
						{attempts.length < 3 && visibleInfo !== VISIBLE_INFO_CHOICES.NUMBER && (
							<select onChange={handleChange}>
								<option></option>
								{choices
									.toSorted(({ id: aId }, { id: bId }) => aId - bId)
									.map(({ id }, i) => (
										<option key={id} value={id}>{id}</option>
									))}
							</select>
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Main;
