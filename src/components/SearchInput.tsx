import { TextInput, TextInputProps, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
	onSearch?: (search: string) => void;
	defaultValue?: string;
	inputProps?: TextInputProps;
}

const SearchInput = (props: SearchInputProps) => {
	const theme = useMantineTheme();
	const { t } = useTranslation();
	const [value, setValue] = useState(props.defaultValue);
	const [debounced, cancel] = useDebouncedValue(value, 300);
	const [oldValue, setOldValue] = useState(debounced);

	useEffect(() => {
		if (props.onSearch && debounced != oldValue) {
			setOldValue(debounced);
			props.onSearch(debounced || '');
		}
	}, [debounced, oldValue, props]);

	return (
		<TextInput
			placeholder={t('search')}
			leftSection={<IconSearch size="1rem" stroke={1.5} />}
			{...props.inputProps}
			defaultValue={value}
			onChange={(event) => setValue(event.currentTarget.value)}
		/>
	);
};

export default SearchInput;
