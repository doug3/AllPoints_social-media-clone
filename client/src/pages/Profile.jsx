import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCard from '../components/PostCard'
import moment from 'moment'
import ProfileModal from '../components/ProfileModal'

const Profile = () => {

  const { profileId } = useParams()
  const [ user, setUser ] = useState(null)
  const [ posts, setPosts ] = useState([])
  const [ activeTab, setActiveTab ] = useState('Posts')
  const [ showEdit, setShowEdit ] = useState(false)

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // Fetch user data and posts based on profileId
  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* Profile Header */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* Cover Photo */}
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {user.cover_photo && <img src={user.cover_photo} alt="" className='w-full h-full object-cover' />}
          </div>
          {/* User Info */}
          <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
        </div>
        {/* Tabs */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
            {['Posts', 'Media', 'Liked'].map((tab) => (
              <button key={tab} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))} 
          </div>
        </div>
        {/* Posts */}
        {activeTab === 'Posts' && (
          <div className='mt-6 flex flex-col gap-6 items-center'>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
        {/* Media */}
        {activeTab === 'Media' && (
          <div className='flex flex-wrap items-center max-w-6xl mt-6'>
            {posts.filter(post => post.image_urls.length > 0).map((post) => (
              <>
                {post.image_urls.map((url, index) => (
                  <Link target='_blank' to={url} key={index} className='relative group'>
                    <img src={url} alt={`Post image ${index + 1}`} className='w-64 p-2 aspect-video object-cover' />
                    <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition duration-200 text-white'>{moment(post.createdAt).fromNow()}</p>
                  </Link>
                ))}
              </>
            ))}
          </div>
        )}
      </div>
      {/* Edit Profile Modal */}
      {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
    </div>
  ) : (<Loading />)
}

export default Profile