export const shuffleList = <T>(array: T[]): T[] => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};

export const halveList = <T>(list: T[]): T[] => {
	const half = Math.ceil(list.length / 2);

	return list.slice(0, half);
};
