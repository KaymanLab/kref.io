'use-client'


import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res)=>res.json());

export default function GithubProfile() {

    const myGithubRepoProfile = "https://api.github.com/repos/KaymanLab/kref.io"
    const {data, error, isLoading} = useSWR(myGithubRepoProfile, fetcher)
    if (error) return "An error has happened"
    if (isLoading) return "Loading..."

    return (
        <div>
            <h1>{data.name}</h1>
        </div>
    )
}