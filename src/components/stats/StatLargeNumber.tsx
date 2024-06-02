import { rem, Text } from '@mantine/core';

import classes from '@/styles/components/StatsGroup.module.css';

export function StatLargeNumber(data: { title: string; value: any; description: string }) {
	return (
		<div className={classes.root}>
			<div className={classes.stat}>
				<Text className={classes.count} style={{ fontSize: rem('64px') }}>
					{data.value}
				</Text>
				<Text className={classes.title}>{data.title}</Text>
			</div>
		</div>
	);
}
