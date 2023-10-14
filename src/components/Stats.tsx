import { Group, Paper, PaperProps, Text } from '@mantine/core';

interface StatsGridProps {
	title: string;
	icon: any;
	children: any;
	subtitle?: string;
	paperProps?: PaperProps;
	isText?: boolean;
}

export function StatsGrid(data: StatsGridProps) {
	return (
		<Paper withBorder p="md" radius="md" key={data.title} {...data.paperProps}>
			<Group justify="space-between">
				<Text size="xs" c="dimmed" fw={700} style={{ textTransform: 'uppercase' }}>
					{data.title}
				</Text>
				<data.icon size="1.4rem" stroke={1.5} className={'fs-dimmed'} />
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
