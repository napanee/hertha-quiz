import Image from 'next/image';
import random from 'random';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import * as S from './styles';


enum VISIBLE_INFO_CHOICES {
	NAME = 'name',
	NUMBER = 'number'
}

type Player = {
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
const players: Player[] = [
	/* eslint-disable max-len */
	{ 'id': 1, 'firstName': 'Tjark', 'lastName': 'Ernst', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11641_kicker_team_standard_hd.jpeg' },
	{ 'id': 2, 'firstName': 'Julian', 'lastName': 'Eitschberger', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11688_kicker_team_standard_hd.jpeg' },
	{ 'id': 3, 'firstName': 'Agustín', 'lastName': 'Rogel', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11690_kicker_team_standard_hd.jpeg' },
	{ 'id': 4, 'firstName': 'Marc oliver', 'lastName': 'Kempf', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11685_kicker_team_standard_hd.jpeg' },
	{ 'id': 5, 'firstName': 'Andreas', 'lastName': 'Bouchalakis', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11650_kicker_team_standard_hd.jpeg' },
	{ 'id': 6, 'firstName': 'Diego', 'lastName': 'Demme', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11652_kicker_team_standard_hd.jpeg' },
	{ 'id': 7, 'firstName': 'Florian', 'lastName': 'Niederlechner', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11674_kicker_team_standard_hd.jpeg' },
	{ 'id': 8, 'firstName': 'Kevin', 'lastName': 'Sessa', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11654_kicker_team_standard_hd.jpeg' },
	{ 'id': 9, 'firstName': 'Smail', 'lastName': 'Prevljak', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11676_kicker_team_standard_hd.jpeg' },
	{ 'id': 10, 'firstName': 'Ibrahim', 'lastName': 'Maza', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11662_kicker_team_standard_hd.jpeg' },
	{ 'id': 11, 'firstName': 'Fabian', 'lastName': 'Reese', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11665_kicker_team_standard_hd.jpeg' },
	{ 'id': 14, 'firstName': 'Bilal', 'lastName': 'Hussein', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11714_kicker_team_standard_hd.jpeg' },
	{ 'id': 16, 'firstName': 'Jonjoe', 'lastName': 'Kenny', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11712_kicker_team_standard_hd.jpeg' },
	{ 'id': 18, 'firstName': 'Luca', 'lastName': 'Schuler', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11671_kicker_team_standard_hd.jpeg' },
	{ 'id': 19, 'firstName': 'Jeremy', 'lastName': 'Dudziak', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11697_kicker_team_standard_hd.jpeg' },
	{ 'id': 20, 'firstName': 'Palkó', 'lastName': 'Dárdai', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11693_kicker_team_standard_hd.jpeg' },
	{ 'id': 22, 'firstName': 'Marten', 'lastName': 'Winkler', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11659_kicker_team_standard_hd.jpeg' },
	{ 'id': 23, 'firstName': 'Bradley', 'lastName': 'Ibrahim', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11653_kicker_team_standard_hd.jpeg' },
	{ 'id': 25, 'firstName': 'Haris', 'lastName': 'Tabaković', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11669_kicker_team_standard_hd.jpeg' },
	{ 'id': 26, 'firstName': 'Gustav', 'lastName': 'Christensen', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11672_kicker_team_standard_hd.jpeg' },
	{ 'id': 27, 'firstName': 'Michaël', 'lastName': 'Cuisance', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11649_kicker_team_standard_hd.jpeg' },
	{ 'id': 31, 'firstName': 'Márton', 'lastName': 'Dárdai', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11710_kicker_team_standard_hd.jpeg' },
	{ 'id': 33, 'firstName': 'Michał', 'lastName': 'Karbownik', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11681_kicker_team_standard_hd.jpeg' },
	{ 'id': 35, 'firstName': 'Marius', 'lastName': 'Gersbeck', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11640_kicker_team_standard_hd.jpeg' },
	{ 'id': 36, 'firstName': 'Luis', 'lastName': 'Trus', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11702_kicker_team_standard_hd.jpeg' },
	{ 'id': 37, 'firstName': 'Toni', 'lastName': 'Leistner', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11691_kicker_team_standard_hd.jpeg' },
	{ 'id': 38, 'firstName': 'Julius', 'lastName': 'Gottschalk', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11705_kicker_team_standard_hd.jpeg' },
	{ 'id': 39, 'firstName': 'Derry', 'lastName': 'Scherhant', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11666_kicker_team_standard_hd.jpeg' },
	{ 'id': 40, 'firstName': 'Oliver', 'lastName': 'Rölke', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11723_kicker_team_standard_hd.jpeg' },
	{ 'id': 41, 'firstName': 'Pascal', 'lastName': 'Klemens', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11656_kicker_team_standard_hd.jpeg' },
	{ 'id': 42, 'firstName': 'Deyovaisio', 'lastName': 'Zeefuik', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11692_kicker_team_standard_hd.jpeg' },
	{ 'id': 43, 'firstName': 'Tim', 'lastName': 'Goller', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11694_kicker_team_standard_hd.jpeg' },
	{ 'id': 44, 'firstName': 'Linus', 'lastName': 'Gechter', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11683_kicker_team_standard_hd.jpeg' },
	{ 'id': 45, 'firstName': 'Wilfried', 'lastName': 'Kanga', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11717_kicker_team_standard_hd.jpeg' },
	{ 'id': 47, 'firstName': 'Selim', 'lastName': 'Telib', 'filename': 'https://tv.herthabsc.com/media/bsc/kicker_team_standard/0001/12/thumb_11699_kicker_team_standard_hd.jpeg' },
	/* eslint-enable max-len */
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
				<S.PlayerImage>
					<Image src={player.filename} alt="" fill loading='lazy' />
				</S.PlayerImage>
				<S.PlayerInfo>
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
				</S.PlayerInfo>
			</S.Card>

			<S.ButtonNext onClick={handleClick}>Weiter</S.ButtonNext>
		</S.Wrapper>
	);
};

export default Main;
