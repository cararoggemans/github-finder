import React from 'react'
import {useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'


function UserSearch() {
    const [text, setText] = useState('')
    const {users} = useContext(GithubContext)

    const handleChange = (e) => setText(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text === '' ) {
            alert('Please enter something')
        }
        else {
            // todo search for users
            setText('')
        }
    }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit} className='form-control'>
                <div className='relative'>
                    <input className='w-full pr-40 bg-white input-lg text-black rounded-l-none'
                    placeholder='Search'
                    value={text}
                    onChange={handleChange}
                    />
                    <button className='btn btn-lg absolute top-0 right-0 w-36 rounded-none' type='submit'>Go</button>
                </div>
            </form>
            {//only show clear if users found}
            {users.length > 0 && (
                <div>
                <button className='btn btn-ghost btn-lg'>
                Clear
                </button>
            </div>
            )}
        </div>
    </div>
  )
}

export default UserSearch
