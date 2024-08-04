import styled, { DefaultTheme, css } from 'styled-components';


export const Wrapper = styled.div`
	overflow: hidden;
	height: 100vh;
	background-color: ${({ theme }) => theme.palette.primary.main};
`;

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100vh;
`;

export const PlayerImage = styled.div`
	flex: 1 0 auto;
	position: relative;

	img {
		object-fit: cover;
		object-position: top;

		@media (orientation: landscape) {
			width: 100vw;
			height: auto;
		}
	}
`;

export const PlayerInfo = styled.div`
	display: flex;
	flex: 0 1 auto;
	align-items: center;
	gap: 20px;
	position: relative;
	padding: clamp(10px, 5vh, 20px) 5vw;

	${({ theme }) => css`
		background-image: linear-gradient(
			270deg,
			${theme.palette.background.secondary},
			${theme.palette.background.secondary} 60%,
			${theme.palette.background.primary}
		);
	`};
`;

export const PlayerNumber = styled.span<{ $isAnswerd: boolean; $isCorrect: boolean | undefined; theme: DefaultTheme }>`
	flex: 0 1 110px;
	font-family: HerthaBlack, Arial, Helvetica, sans-serif;
	font-size: 10vh;

	${({ $isAnswerd, $isCorrect, theme }) => css`
		color: ${$isAnswerd && !$isCorrect ? '#FF0000' : theme.palette.secondary.main};
	`};

	select {
		opacity: 0;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

export const PlayerName = styled.span<{ $isAnswerd: boolean; $isCorrect: boolean | undefined; theme: DefaultTheme }>`
	flex: 1 0 auto;
	font-family: HerthaRegular, Arial, Helvetica, sans-serif;
	font-size: 4vh;
	line-height: 1;

	${({ $isAnswerd, $isCorrect, theme }) => css`
		color: ${$isAnswerd && !$isCorrect ? '#FF0000' : theme.palette.common.white};
	`};

	> span {
		display: block;
		font-family: HerthaBlack, Arial, Helvetica, sans-serif;
	}

	select {
		opacity: 0;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

export const ButtonNext = styled.a`
	cursor: pointer;
	display: flex;
	align-items: center;
	position: absolute;
	right: 0;
	bottom: 0;
	padding: 5px 20px 5px 5px;
	height: 30px;
	background-color: ${({ theme }) => theme.palette.primary.main};
	color: ${({ theme }) => theme.palette.common.white};
	font-family: HerthaBlack, Arial, Helvetica, sans-serif;
	font-size: 1rem;

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		right: 100%;
		width: 0;
		height: 0;
		border: 15px solid ${({ theme }) => theme.palette.primary.main};
		border-left-color: transparent;
		border-top-color: transparent;
	}
`;
