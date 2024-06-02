/* eslint-disable react-hooks/exhaustive-deps */
import { Link, RichTextEditor } from '@mantine/tiptap';

import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export default function RTE({
	value,
	onChange,
	onClick,
	style,
}: {
	value?: string;
	onChange?: (e: string) => void;
	onClick?: (e: any) => void;
	style?: any;
}) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		content: value,
		onUpdate: (e) => {
			onChange && onChange(e.editor.getHTML());
			onClick && onClick(e);
		},
	});

	useEffect(() => {
		editor?.setOptions({ content: value });
	}, [value]);

	return (
		<RichTextEditor editor={editor} styles={style}>
			<RichTextEditor.Toolbar>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					{/* <RichTextEditor.Highlight /> */}
					<RichTextEditor.Code />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.H1 />
					<RichTextEditor.H2 />
					<RichTextEditor.H3 />
					<RichTextEditor.H4 />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Blockquote />
					<RichTextEditor.Hr />
					<RichTextEditor.BulletList />
					<RichTextEditor.OrderedList />
					{/* <RichTextEditor.Subscript />
					<RichTextEditor.Superscript /> */}
				</RichTextEditor.ControlsGroup>
			</RichTextEditor.Toolbar>

			<RichTextEditor.Content />
		</RichTextEditor>
	);
}
