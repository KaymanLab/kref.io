import getDomain from "@/app/lib/getDomain"
import BlogCard from './card'

async function getData(){
    // 1 endpoint - API
    const domain = getDomain()
    const endpoint = `${domain}/api/posts` // -> third party api request??
    const res = await fetch(endpoint, {next: {cache: 'no-store'}} )
    // const res = await fetch(endpoint, {next: {revalidate: 10}} ) //HTTP GET Method

    
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    
    if (res.headers.get("content-type") !== "application/json") {
        return {items: []}
    }

    return res.json()
    
}

export default async function BlogPage(){
    const data = await getData()
    const items = data && data.items ? [...data.items] : []
   
    return <main>
        <h1>Hello World</h1>
        <p>Posts: </p>
        {items && items.map((item, idx)=>{
            return <BlogCard title={item.title} key={`post-${idx}`} />
        })}
    </main>

}