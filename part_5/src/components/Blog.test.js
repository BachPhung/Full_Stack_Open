import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
    let container
    const likeHandler = jest.fn()
    beforeEach(() => {
        const sampleBlog = {
            title: 'Title 1',
            author: 'Author 1',
            url: '#',
            user: '621385e9f29b3aee252efbb7'
        }   
        container = render(
            <Blog blog={sampleBlog} handClickLikes={likeHandler} />
        ).container
    })
    test('blog only renders title & author by default', () => {
        let titleElement = screen.getByText(/Title 1/i)
        let authorElement = screen.getByText(/Author 1/i)
        const div = container.querySelector('.blogContent')
        expect(titleElement).toBeDefined()
        expect(authorElement).toBeDefined()
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, url and likes are shown', () => {
        const button = screen.getByText(/show/i)
        userEvent.click(button)
        const div = container.querySelector('.blogContent')
        let urlElement = screen.getByText(/#/i)
        let likesElement = screen.getByText(/likes/i)
        screen.debug()
        expect(urlElement).toBeDefined()
        expect(likesElement).toBeDefined()
        expect(div).not.toHaveStyle('display: none')
    })

    test('like button is clicked twice', async () => {
        const likeButton = container.querySelector('.like-btn')
        await userEvent.click(likeButton)
        await userEvent.click(likeButton)
        expect(likeHandler.mock.calls).toHaveLength(2)
    })
})

describe('<BlogFrom />',()=>{
    const createBlog = jest.fn()
    const container = render(<BlogForm createBlog={createBlog}/>).container
    const inputs = screen.getAllByRole('textbox')
    const createButton = container.querySelector('.create-btn')
    userEvent.type(inputs[0],'testing title')
    userEvent.type(inputs[1],'testing author')
    userEvent.type(inputs[2],'testing url')
    userEvent.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title' )
    expect(createBlog.mock.calls[0][0].author).toBe('testing author' )
    expect(createBlog.mock.calls[0][0].url).toBe('testing url' )
})