import MapboxMap from '../components/Map'
import Header from '../components/Header'
import Footer from '../components/Footer'
import React from 'react'
import {NextPage} from 'next'

const MapPage: NextPage = () => {
  return (
    <>
      <Header
        links={[
          {link: 'faq', label: 'FAQ'},
          {link: 'map', label: 'Map'},
          {link: 'teams', label: 'Build teams'},
          {link: 'contact', label: 'Contact'}
        ]}
        user={{
          name: 'Nudelsuppe_42_#3571',
          avatar: 'https://cdn.discordapp.com/avatars/635411595253776385/66a67aa69149c976f3b962d72ca17146.png'
        }}
      />
      <MapboxMap />
      <Footer
        links={[
          {link: 'faq', label: 'FAQ'},
          {link: 'contact', label: 'Contact'},
          {link: 'about', label: 'About us'}
        ]}
      />
    </>
  )
}

export default MapPage
