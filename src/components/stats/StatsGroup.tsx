import classes from '@/styles/components/StatsGroup.module.css';
import { Text } from '@mantine/core';

export function StatsGroup({
	data,
}: {
	data: { title: string; value: any; description?: string }[];
}) {
	const stats = data.map((stat) => (
		<div key={stat.title} className={classes.stat}>
			<Text className={classes.count}>{stat.value}</Text>
			<Text className={classes.title}>{stat.title}</Text>
			<Text className={classes.description}>{stat.description}</Text>
		</div>
	));
	return <div className={classes.root}>{stats}</div>;
}
