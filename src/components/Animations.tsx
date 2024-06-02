import { AnimatePresence, motion, MotionStyle } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Box } from '@mantine/core';
import { useInterval } from '@mantine/hooks';

export const TextLoop = ({
	words,
	interval,
	style,
}: {
	words: string[];
	interval: number;
	style?: MotionStyle;
}) => {
	const [index, setIndex] = useState(0);

	const indexInterval = useInterval(
		() => setIndex((s) => (s == words.length - 1 ? 0 : s + 1)),
		interval,
	);

	useEffect(() => {
		indexInterval.start();
		return indexInterval.stop;
	});
	return (
		<Box style={{ display: 'inline', position: 'relative', width: '100%' }}>
			<AnimatePresence initial={false}>
				<motion.span
					style={{ position: 'absolute', width: '100%', ...style }}
					layout
					key={index}
					variants={{
						enter: {
							translateY: 20,
							opacity: 0,
							height: 0,
						},
						center: {
							zIndex: 1,
							translateY: 0,
							opacity: 1,
							height: 'auto',
						},
						exit: {
							zIndex: 0,
							translateY: -20,
							opacity: 0,
							height: 0,
						},
					}}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						translateY: { type: 'spring', stiffness: 1000, damping: 200 },
						opacity: { duration: 0.5 },
					}}
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>
		</Box>
	);
};
