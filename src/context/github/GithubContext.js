import { createContext, useReducer } from "react";
import { createRenderer } from "react-dom/test-utils";
import { useRouteLoaderData } from "react-router-dom";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
   
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //clear users from state
    const clearUsers = () => dispatch({
        type: 'CLEAR_USERS'
    })

     //get single user
     const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`,  {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
        })
        if(response.status === 404) {
            window.location = '/notfound'
        }
        else {
            const data = await response.json()
        
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }
    //get user Repos
    const getUserRepos = async (login) => {
        setLoading()
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10

        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,  {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
        })
        const data = await response.json()
            
        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }

    //set loading
    const setLoading = () => dispatch({
type: 'SET_LOADING'})


    return <GithubContext.Provider value={{
        ...state,
        clearUsers,
        getUser,
        getUserRepos,
        dispatch,
        }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext