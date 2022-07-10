import {Box, Group, Pagination, Title, useMantineTheme} from '@mantine/core'
import React, {useState} from 'react'

interface GalleryProps {
  images: {location: string; builder: string; src: string}[]
  style?: React.CSSProperties
}
function Gallery(props: GalleryProps) {
  const [active, setActive] = useState(props.images[0])
  const theme = useMantineTheme()

  return (
    <Box style={props.style}>
      <Box
        style={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          background: `url("${active.src}") center center / cover`,
          transition: 'background 0.2s ease-out',
          height: '100%',
          minHeight: '100px',
          width: '100%',
          position: 'relative'
        }}
      >
        <Box style={{color: '#ffffff', position: 'absolute', top: theme.spacing.md, left: theme.spacing.md}}>
          <h1>{active.location}</h1>
          <div
            style={{
              background: `linear-gradient(90deg, rgba(255,255,255
          ,1) 20%, rgba(0,0,0,0) 20%)`,
              height: 2
            }}
          />
          <p>by {active.builder}</p>
        </Box>
        <Group
          position="center"
          style={{position: 'absolute', bottom: theme.spacing.md, left: '50%', transform: 'translate(-50%,0%)'}}
        >
          <Pagination
            siblings={3}
            initialPage={1}
            page={props.images.indexOf(active) + 1}
            onChange={page => setActive(props.images[page - 1])}
            total={props.images.length}
            withControls={false}
            size="sm"
            radius="xl"
            styles={{
              item: {
                color: '#ffffff00',
                backgroundColor: '#ffffff',
                border: 'none',
                width: 25,
                transition: 'all 0.2s ease-out',
                boxShadow: theme.shadows.xl
              },
              active: {
                color: '#ffffff00',
                backgroundColor: '#ffffff',
                border: 'none',
                width: 50,
                transition: 'all 0.2s ease-out',
                boxShadow: theme.shadows.xl
              }
            }}
          />
        </Group>
      </Box>
    </Box>
  )
}

export default Gallery
