import React from 'react'
import EstateAssetCard from '../../cards/EstateAssetCard'

const ListedTab = ({ properties, listProperty }) => {
  return (
    <div className='px-4 py-10 grid grid-cols-3 gap-2 container mx-auto'>
      {properties.length > 0 && properties.map((item) => {
        return <EstateAssetCard item={item} key={item._id} listProperty={listProperty} />
      })}
    </div>
  )
}

export default ListedTab
