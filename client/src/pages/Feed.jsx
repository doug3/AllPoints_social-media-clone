import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'
import { assets } from '../assets/assets'
import RecentMessages from '../components/RecentMessages'

const Feed = () => {

  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  return !loading ? (
    <div className='h-full w-auto overflow-y-scroll scrollbar-hide py-10 xl:pr-5 flex justify-around items-start xl:gap-8'>
      <div className=''>
        <StoriesBar />
        <div className='p-4 space-y-6'>
          {feeds.map((post, idx) => (
            <div key={post.id ?? idx}>
              <PostCard post={post} />
            </div>
          ))}
        </div>

      </div>

      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bg-white text-xs p-4 rounded-lg inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
          <img src={assets.sponsored_img} alt="" className='w-75 h-50 rounded-md' />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>Get the best deals on email marketing services.</p>
        </div>
        <RecentMessages />

      </div>
    </div>
  ) : <Loading /> 
}

export default Feed