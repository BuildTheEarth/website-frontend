import { Center, Group, Paper, PaperProps, rem, RingProgress, Text } from '@mantine/core';

interface StatsGridProps {
	title: string;
	icon?: any;
	children: any;
	subtitle?: string;
	paperProps?: PaperProps;
	isText?: boolean;
	onClick?: () => void;
}

export function StatsGrid(data: StatsGridProps) {
	return (
		<Paper
			withBorder
			p="md"
			radius="md"
			key={data.title}
			{...data.paperProps}
			onClick={data.onClick}
		>
			<Group justify="space-between">
				<Text size="xs" c="dimmed" fw={700} style={{ textTransform: 'uppercase' }}>
					{data.title}
				</Text>
				{data.icon && <data.icon size="1.4rem" stroke={1.5} className={'fs-dimmed'} />}
			</Group>

			<Group align="flex-end" gap="xs" mt={25}>
				{typeof data.children === 'string' || data.isText ? (
					<Text size="xl" fw={700}>
						{data.children}
					</Text>
				) : (
					data.children
				)}
			</Group>

			<Text fz="xs" c="dimmed" mt={7}>
				{data.subtitle}
			</Text>
		</Paper>
	);
}

interface StatsRingProps {
	icon?: any;
	label: string;
	stats: any;
	progress: number;
	color: string;
	onClick?: () => void;
	style?: React.CSSProperties;
}

export function StatsRing(stat: StatsRingProps) {
	return (
		<Paper withBorder radius="md" p="xs" key={stat.label} onClick={stat.onClick} style={stat.style}>
			<Group>
				<RingProgress
					size={80}
					roundCaps
					thickness={8}
					sections={[{ value: stat.progress, color: stat.color }]}
					label={
						stat.icon && (
							<Center>
								<stat.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
							</Center>
						)
					}
				/>

				<div>
					<Text c="dimmed" size="xs" tt="uppercase" fw={700}>
						{stat.label}
					</Text>
					<Text fw={700} size="xl">
						{stat.stats}
					</Text>
				</div>
			</Group>
		</Paper>
	);
}
