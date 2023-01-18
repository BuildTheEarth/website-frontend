import { Accordion, Group, Text, createStyles } from '@mantine/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { IconGripVertical } from '@tabler/icons';
import { useListState } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
	item: {
		borderRadius: theme.radius.md,
		border: 'none',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
		'&[data-active]': {
			border: 'none',
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
		},
	},

	itemDragging: {
		boxShadow: theme.shadows.sm,
	},

	symbol: {
		fontSize: 30,
		fontWeight: 700,
		width: 60,
	},

	dragHandle: {
		...theme.fn.focusStyles(),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
	},
}));

interface DNDItemProps {
	data: {
		position: number;
		icon: any;
		title: string;
		subtitle: string;
		content: any;
	}[];
}

export function DNDItem({ data }: DNDItemProps) {
	const { classes, cx } = useStyles();
	const [state, handlers] = useListState(data);

	const items = state.map((item, index) => (
		<Draggable key={item.position} index={index} draggableId={item.position + ''}>
			{(provided, snapshot) => (
				<Accordion.Item
					value={item.position + ''}
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={classes.item}
				>
					<Accordion.Control>
						<Group>
							<div {...provided.dragHandleProps}>
								<IconGripVertical size={18} stroke={1.5} />
							</div>
							<Text>{item.icon}</Text>
							<div>
								<Text weight={700}>{item.title}</Text>
								<Text color="dimmed" size="sm">
									{item.subtitle}
								</Text>
							</div>
						</Group>
					</Accordion.Control>
					<Accordion.Panel>{item.content}</Accordion.Panel>
				</Accordion.Item>
			)}
		</Draggable>
	));

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) => {
				handlers.reorder({ from: source.index, to: destination?.index || 0 });
			}}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<Accordion variant="separated">
							{items}
							{provided.placeholder}
						</Accordion>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
