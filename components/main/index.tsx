import Image from 'next/image';
import random from 'random';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import * as S from './styles';


enum VISIBLE_INFO_CHOICES {
	NAME = 'name',
	NUMBER = 'number'
}

type Player = {
	firstName: string;
	id: number;
	lastName: string;
	filename?: string;
};

/**
 * [...document.querySelectorAll('.player-teaser')].map((player) => {
 *   const firstName = player.querySelector('.first-name').innerText.toLowerCase();
 *   const lastName = player.querySelector('.last-name').innerText.toLowerCase();
 *   const number = player.querySelector('.shirt-number').innerText;
 *   const img = player.querySelector('.action-image img').src.replace('mobile', 'hd');
 *
 *   return {id: Number(number), firstName: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`, lastName: `${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`, filename: img};
 * }).toSorted(({ id: aId }, { id: bId }) => aId - bId);
 */
const players: Player[] = [
	{ id: 2, firstName: "Peter", lastName: "Pekarík", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11498_kicker_team_action_shot_hd.jpeg" },
	{ id: 3, firstName: "Agustín", lastName: "Rogel", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11127_kicker_team_action_shot_hd.jpeg" },
	{ id: 5, firstName: "Andreas", lastName: "Bouchalakis", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11099_kicker_team_action_shot_hd.jpeg" },
	{ id: 6, firstName: "Michał", lastName: "Karbownik", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11101_kicker_team_action_shot_hd.jpeg" },
	{ id: 7, firstName: "Florian", lastName: "Niederlechner", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11126_kicker_team_action_shot_hd.jpeg" },
	{ id: 8, firstName: "Bilal", lastName: "Hussein", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11097_kicker_team_action_shot_hd.jpeg" },
	{ id: 9, firstName: "Smail", lastName: "Prevljak", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11116_kicker_team_action_shot_hd.jpeg" },
	{ id: 11, firstName: "Fabian", lastName: "Reese", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11089_kicker_team_action_shot_hd.jpeg" },
	{ id: 12, firstName: "Tjark", lastName: "Ernst", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11131_kicker_team_action_shot_hd.jpeg" },
	{ id: 16, firstName: "Jonjoe", lastName: "Kenny", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11138_kicker_team_action_shot_hd.jpeg" },
	{ id: 19, firstName: "Jeremy", lastName: "Dudziak", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11119_kicker_team_action_shot_hd.jpeg" },
	{ id: 20, firstName: "Marc oliver", lastName: "Kempf", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11136_kicker_team_action_shot_hd.jpeg" },
	{ id: 22, firstName: "Marten", lastName: "Winkler", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11139_kicker_team_action_shot_hd.jpeg" },
	{ id: 23, firstName: "Bradley", lastName: "Ibrahim", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11573_kicker_team_action_shot_hd.jpeg" },
	{ id: 25, firstName: "Haris", lastName: "Tabaković", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11104_kicker_team_action_shot_hd.jpeg" },
	{ id: 26, firstName: "Gustav", lastName: "Christensen", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11121_kicker_team_action_shot_hd.jpeg" },
	{ id: 27, firstName: "Palkó", lastName: "Dárdai", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11113_kicker_team_action_shot_hd.jpeg" },
	{ id: 30, firstName: "Ibrahim", lastName: "Maza", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11164_kicker_team_action_shot_hd.jpeg" },
	{ id: 31, firstName: "Márton", lastName: "Dárdai", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11146_kicker_team_action_shot_hd.jpeg" },
	{ id: 33, firstName: "Robert", lastName: "Kwasigroch", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11125_kicker_team_action_shot_hd.jpeg" },
	{ id: 34, firstName: "Deyovaisio", lastName: "Zeefuik", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11145_kicker_team_action_shot_hd.jpeg" },
	{ id: 35, firstName: "Marius", lastName: "Gersbeck", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/11/thumb_10331_kicker_team_action_shot_hd.jpeg" },
	{ id: 37, firstName: "Toni", lastName: "Leistner", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11107_kicker_team_action_shot_hd.jpeg" },
	{ id: 39, firstName: "Derry", lastName: "Scherhant", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11130_kicker_team_action_shot_hd.jpeg" },
	{ id: 41, firstName: "Pascal", lastName: "Klemens", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11142_kicker_team_action_shot_hd.jpeg" },
	{ id: 43, firstName: "Tim", lastName: "Goller", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11122_kicker_team_action_shot_hd.jpeg" },
	{ id: 44, firstName: "Linus", lastName: "Gechter", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/12/thumb_11135_kicker_team_action_shot_hd.jpeg" },
	{ id: 48, firstName: "Mesut emre", lastName: "Kesik", filename: "https://tv.herthabsc.com/media/bsc/kicker_team_action_shot/0001/11/thumb_10684_kicker_team_action_shot_hd.jpeg" },
 ];


const Main = () => {
	const [player, setPlayer] = useState<Player>(players[0]);
	const [visibleInfo, setVisibleInfo] = useState<string>('name');
	const [advisedValue, setAdvisedValue] = useState<string | undefined>();

	useEffect(() => {
		const randomInt = random.int(0, players.length - 1);

		setPlayer(players[randomInt]);
		setVisibleInfo(random.choice([VISIBLE_INFO_CHOICES.NAME, VISIBLE_INFO_CHOICES.NUMBER]) as string);
	}, []);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();

		setAdvisedValue(event.target.value);
	};

	const handleClick = (event: MouseEvent) => {
		event.preventDefault();

		const randomInt = random.int(0, players.length - 1);

		setAdvisedValue(undefined);
		setPlayer(players[randomInt]);
		setVisibleInfo(random.choice([VISIBLE_INFO_CHOICES.NAME, VISIBLE_INFO_CHOICES.NUMBER]) as string);
	};

	const advisedPlayer = players.find(({ id }) => String(id) === advisedValue)
		?? { id: '??', firstName: '???', lastName: '???' };
	const playerNumber = visibleInfo === VISIBLE_INFO_CHOICES.NUMBER ? player.id : advisedPlayer.id;
	const playerName = visibleInfo === VISIBLE_INFO_CHOICES.NAME
		? <>{player.firstName.toUpperCase()}<span>{player.lastName.toUpperCase()}</span></>
		: <>{advisedPlayer?.firstName.toUpperCase()} <span>{advisedPlayer?.lastName.toUpperCase()}</span></>;

	return (
		<S.Wrapper>
			<S.Card>
				{player.filename && (
					<Image src={player.filename} width={1280} height={1280} alt="" />
				)}
				<S.PlayerNumber
					$isAnswerd={visibleInfo !== VISIBLE_INFO_CHOICES.NUMBER && !!advisedValue}
					$isCorrect={advisedValue === String(player.id)}
				>
					{playerNumber}
					{visibleInfo !== VISIBLE_INFO_CHOICES.NUMBER && (
						<select onChange={handleChange}>
							{
								players
									.toSorted(({ id: aId }, { id: bId }) => aId - bId)
									.map(({ id }) => (<option key={id} value={id}>{id}</option>))
							}
						</select>
					)}
				</S.PlayerNumber>
				<S.PlayerName
					$isAnswerd={visibleInfo !== VISIBLE_INFO_CHOICES.NAME && !!advisedValue}
					$isCorrect={advisedValue === String(player.id)}
				>
					{playerName}
					{visibleInfo !== VISIBLE_INFO_CHOICES.NAME && (
						<select onChange={handleChange}>
							{players
								.toSorted(({ lastName: aLastName }, { lastName: bLastName }) => {
									if (aLastName < bLastName) {
										return -1;
									} else if (aLastName > bLastName) {
										return 1;
									} else {
										return 0;
									}
								})
								.map(({ id, firstName, lastName }) => (
									<option key={id} value={id}>{lastName}, {firstName}</option>
								))}
						</select>
					)}
				</S.PlayerName>
			</S.Card>

			<S.ButtonNext onClick={handleClick}>Weiter</S.ButtonNext>
		</S.Wrapper>
	);
};

export default Main;
