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

const players: Player[] = [
	{ id: 2, firstName: 'Peter', lastName: 'Pekarík' },
	{ id: 3, firstName: 'Agustín', lastName: 'Rogel', filename: '3_augustin_rogel.jpeg' },
	{ id: 5, firstName: 'Andreas', lastName: 'Bouchalakis', filename: '5_andreas_bouchalakis.jpeg' },
	{ id: 6, firstName: 'Michał', lastName: 'Karbownik', filename: '6_michal_karbownik.jpeg' },
	{ id: 7, firstName: 'Florian', lastName: 'Niederlechner', filename: '7_florian_niederlechner.jpeg' },
	{ id: 8, firstName: 'Bilal', lastName: 'Hussein', filename: '8_bilal_hussein.jpeg' },
	{ id: 9, firstName: 'Smail', lastName: 'Prevljak', filename: '9_smail_prevljak.jpeg' },
	{ id: 11, firstName: 'Fabian', lastName: 'Reese', filename: '11_fabian_reese.jpeg' },
	{ id: 12, firstName: 'Tjark', lastName: 'Ernst', filename: '12_tjark_ernst.jpeg' },
	{ id: 15, firstName: 'Myziane', lastName: 'Maolida', filename: '15_myziane_maolida.jpeg' },
	{ id: 16, firstName: 'Jonjoe', lastName: 'Kenny', filename: '16_jonjoe_kenny.jpeg' },
	{ id: 19, firstName: 'Jeremy', lastName: 'Dudziak', filename: '19_jeremy_dudziak.jpeg' },
	{ id: 20, firstName: 'Marc Oliver', lastName: 'Kempf', filename: '20_marc_oliver_kempf.jpeg' },
	{ id: 21, firstName: 'Anderson', lastName: 'Lucoqui', filename: '21_anderson_lucoqui.jpeg' },
	{ id: 22, firstName: 'Marten', lastName: 'Winkler', filename: '22_marten_winkler.jpeg' },
	{ id: 24, firstName: 'Bence', lastName: 'Dárdai', filename: '24_bence_dardai.jpeg' },
	{ id: 25, firstName: 'Haris', lastName: 'Tabaković', filename: '25_haris_tabakovic.jpeg' },
	{ id: 26, firstName: 'Gustav', lastName: 'Christensen', filename: '26_gustav_christensen.jpeg' },
	{ id: 27, firstName: 'Palkó', lastName: 'Dárdai', filename: '27_palko_dardai.jpeg' },
	{ id: 28, firstName: 'Kélian', lastName: 'Nsona', filename: '28_kelian_nsona.jpeg' },
	{ id: 30, firstName: 'Ibrahim', lastName: 'Maza', filename: '30_ibrahim_maza.jpeg' },
	{ id: 31, firstName: 'Márton', lastName: 'Dárdai', filename: '31_marton_dardai.jpeg' },
	{ id: 33, firstName: 'Robert', lastName: 'Kwasigroch', filename: '33_robert_kwasigroch.jpeg' },
	{ id: 34, firstName: 'Deyovaisio', lastName: 'Zeefuik', filename: '34_deyovaisio_zeefuik.jpeg' },
	{ id: 35, firstName: 'Marius', lastName: 'Gersbeck', filename: '35_marius_gersbeck.jpeg' },
	{ id: 37, firstName: 'Toni', lastName: 'Leistner', filename: '37_toni_leistner.jpeg' },
	{ id: 39, firstName: 'Derry', lastName: 'Scherhant', filename: '39_derry_scherhant.jpeg' },
	{ id: 40, firstName: 'Luca', lastName: 'Wollschlaeger', filename: '40_luca_wollschlaeger.jpeg' },
	{ id: 41, firstName: 'Pascal', lastName: 'Klemens', filename: '41_pascal_klemens.jpeg' },
	{ id: 43, firstName: 'Tim', lastName: 'Goller', filename: '43_tim_goller.jpeg' },
	{ id: 44, firstName: 'Linus', lastName: 'Gechter', filename: '44_linus_gechter.jpeg' },
	{ id: 48, firstName: 'Mesut Emre', lastName: 'Kesik', filename: '48_mesut_emre_kesik.jpeg' },
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
		? <>{player.firstName}<span>{player.lastName}</span></>
		: <>{advisedPlayer?.firstName} <span>{advisedPlayer?.lastName}</span></>;

	return (
		<S.Wrapper>
			<S.Card>
				{player.filename && (
					<Image src={`/player/${player.filename}`} width={1280} height={1280} alt="" />
				)}
				<S.PlayerNumber
					isAnswerd={visibleInfo !== VISIBLE_INFO_CHOICES.NUMBER && !!advisedValue}
					isCorrect={advisedValue === String(player.id)}
				>
					{playerNumber}
					{visibleInfo !== VISIBLE_INFO_CHOICES.NUMBER && (
						<select onChange={handleChange}>
							{
								players
									.sort(({ id: aId }, { id: bId }) => aId - bId)
									.map(({ id }) => (<option key={id} value={id}>{id}</option>))
							}
						</select>
					)}
				</S.PlayerNumber>
				<S.PlayerName
					isAnswerd={visibleInfo !== VISIBLE_INFO_CHOICES.NAME && !!advisedValue}
					isCorrect={advisedValue === String(player.id)}
				>
					{playerName}
					{visibleInfo !== VISIBLE_INFO_CHOICES.NAME && (
						<select onChange={handleChange}>
							{players
								.sort(({ lastName: aLastName }, { lastName: bLastName }) => {
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
