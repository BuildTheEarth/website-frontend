import {
	Anchor,
	Avatar,
	Box,
	Burger,
	Button,
	CSSProperties,
	Group,
	Transition,
} from '@mantine/core';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useUser } from '@/hooks/useUser';
import logo from '@/public/logo.gif';
import classes from '@/styles/components/v2/Header.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import router from 'next/router';
import { ChevronDown } from 'tabler-icons-react';
import HeaderMenu from './HeaderMenu';

const Header = ({ links }: { links: { link: string; translation: string }[] }) => {
	const { t } = useTranslation('common');
	const { scrollY } = useScrollPosition();
	const { user } = useUser();
	const session = useSession();

	const [burgerOpen, { toggle: toggleBurger }] = useDisclosure();

	const linkItems = links.map((link) => {
		return (
			<Anchor
				href={link.link}
				className={classes.link}
				underline="never"
				key={link.translation}
				data-on-top={scrollY < 100}
			>
				{t(`links.${link.translation}`)}
			</Anchor>
		);
	});

	return (
		<Box className={classes.root} data-on-top={scrollY < 100}>
			<Box className={classes.container}>
				<Group
					gap={5}
					className={classes.logo}
					onClick={() => router.push('/')}
					data-on-top={scrollY < 100}
				>
					<Image
						src={logo}
						alt="Logo"
						height={40}
						placeholder="blur"
						blurDataURL="data:image/webp;base64,UklGRt4CAABXRUJQVlA4WAoAAAAgAAAAtQAAtQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg8AAAAJAMAJ0BKrYAtgA+0WiwUyglpKKgSAEAGglpbt1euxvgCe16u6KuEQlQ/Dt6SncZxhF9Xdf0XOtOENaLR1am3TMoBTJgEGx6qLl0eH/XBH0rZF1YalUAqH/IrEns4tSusYi4fehRMKrMaSJCcAAA/us4+eTagZfrjdPBw+fyLyVUMvYN3Izb1pMDJuaEGFQPTdGRywaPa+yLLljmCotB18gzp9xPrQVo7uq7PIL4V8ac7spU+bRX4yOanYMBT9MJbnFmmP4CCFunzH6FY1zP8+SNs4iIt1JI8066DjXBRMd1iSHmp0Ud0vPut0H8wAAAAA=="
						style={{ marginRight: '4px' }}
					/>
					<p>{t('buildtheearth')}</p>
				</Group>
				<Group className={classes.links} gap="md">
					{linkItems}
				</Group>
				<Group>
					{session.status !== 'authenticated' ? (
						<Button className={classes.button} onClick={() => router.push('/join')}>
							Join us!
						</Button>
					) : (
						<HeaderMenu t={t}>
							<Button
								variant="transparent"
								className={classes.userButton}
								data-on-top={scrollY < 100}
								leftSection={
									<Avatar color="initials" name={session.data.user.username} size="sm">
										{session.data.user.username[0].toUpperCase()}
									</Avatar>
								}
								rightSection={<ChevronDown size={12} />}
							>
								{session.data.user.username}
							</Button>
						</HeaderMenu>
					)}
					<Burger className={classes.burger} opened={burgerOpen} onClick={toggleBurger} />
				</Group>
				<Transition transition="fade" duration={200} mounted={burgerOpen}>
					{(styles: CSSProperties) => (
						<Box style={styles} className={classes.dropdown}>
							{linkItems}
						</Box>
					)}
				</Transition>
			</Box>
		</Box>
	);
};

export default Header;
