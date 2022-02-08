const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((preV, curV) => preV + curV.likes, 0)
}

const favoriteBlog = (blogs) => {
    const fBlog = blogs.length > 0 ? blogs.reduce((preV, curV) => preV.likes > curV.likes ? preV : curV) : {}
    const { _id, url, __v, ...returnedBlog } = fBlog;
    return returnedBlog
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    const arrNames = []
    const arrNBlogs = new Array(blogs.length).fill(0)
    blogs.forEach(blog => {
        if (!arrNames.includes(blog.author)) {
            arrNames.push(blog.author)
        } 
        let index = arrNames.indexOf(blog.author)
        arrNBlogs[index] += 1
    })
    const maxNumberBlogs = Math.max(...arrNBlogs)
    const maxIndexBlogs = arrNBlogs.indexOf(maxNumberBlogs)
    const maxAuthor = arrNames[maxIndexBlogs]
    return {
        author: maxAuthor,
        blogs: maxNumberBlogs
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    const arrNames = []
    const arrNBlogs = new Array(blogs.length).fill(0)
    blogs.forEach(blog => {
        if (!arrNames.includes(blog.author)) {
            arrNames.push(blog.author)
        } 
        let index = arrNames.indexOf(blog.author)
        arrNBlogs[index] += blog.likes
    })
    const maxNumberLikes = Math.max(...arrNBlogs)
    const maxIndexBlogs = arrNBlogs.indexOf(maxNumberLikes)
    const maxAuthor = arrNames[maxIndexBlogs]
    return {
        author: maxAuthor,
        likes: maxNumberLikes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}