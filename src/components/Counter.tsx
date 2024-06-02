/* eslint-disable react-hooks/exhaustive-deps */

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Counter({
	value,
	direction = 'up',
	prefix,
	suffix,
}: {
	value: number;
	direction?: 'up' | 'down';
	prefix?: string;
	suffix?: string;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(direction === 'down' ? value : 0);
	const springValue = useSpring(motionValue, {
		damping: 100,
		stiffness: 100,
	});
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	useEffect(() => {
		if (isInView) {
			motionValue.set(direction === 'down' ? 0 : value);
		}
	}, [motionValue, isInView, direction]);

	useEffect(
		() =>
			springValue.on('change', (latest) => {
				if (ref.current) {
					ref.current.textContent =
						(prefix || '') + Intl.NumberFormat('en-US').format(latest.toFixed(0)) + (suffix || '');
				}
			}),
		[springValue],
	);

	return <span ref={ref} />;
}
