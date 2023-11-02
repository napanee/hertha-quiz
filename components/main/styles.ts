import styled, { DefaultTheme } from 'styled-components';


export const Wrapper = styled.div`
	overflow: hidden;
	height: 100vh;
`;

export const Card = styled.div`
	overflow: hidden;

	img {
		position: absolute;
		top: 0;
		left: -50%;
		width: auto;
		height: 100vh;
	}
`;

export const PlayerNumber = styled.span<{ isAnswerd: boolean; isCorrect: boolean | undefined; theme: DefaultTheme }>`
	position: absolute;
	top: 50%;
	left: 0;
	padding: 1rem;
	font-family: HerthaBlack, Arial, Helvetica, sans-serif;
	font-size: 20vh;
	color: ${({ isAnswerd, isCorrect, theme }) => isAnswerd && !isCorrect ? '#FF0000' : theme.palette.primary.main };

	text-shadow: 0px 0px 10px #FFFFFF;

	select {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
`;

export const PlayerName = styled.span<{ isAnswerd: boolean; isCorrect: boolean | undefined; theme: DefaultTheme }>`
	position: absolute;
	bottom: 2rem;
	left: 0;
	padding: 1rem;
	font-family: HerthaRegular, Arial, Helvetica, sans-serif;
	font-size: 8vh;
	line-height: 1;
	color: ${({ isAnswerd, isCorrect, theme }) => isAnswerd && !isCorrect ? '#FF0000' : theme.palette.common.white };
	text-shadow: 0px 0px 10px #0d59a1;

	> span {
		display: block;
		font-family: HerthaBlack, Arial, Helvetica, sans-serif;
	}

	select {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
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
	font-size: 1rem;
	font-family: HerthaBlack, Arial, Helvetica, sans-serif;

	&::before {
		content: '';
		display: block;
		position: absolute;
		right: 100%;
		top: 0;
		width: 0;
		height: 0;
		border: 15px solid ${({ theme }) => theme.palette.primary.main};
		border-left-color: transparent;
		border-top-color: transparent;
	}
`;
