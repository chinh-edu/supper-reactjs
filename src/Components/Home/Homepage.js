import videoHomepage from '../../assets/video-homepage.mp4'

const Hompage = (props) => {
    return (
        <div className="homepage-container">
            <video autoPlay muted loop className='video' >
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <h1 className='homepage-content--title'>There's a better way to ask</h1>
                <p className='homepage-content--content'>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</p>
                <button className='homepage-content--button' type='butotn'>Get start - it's free</button>
            </div>
        </div>
    )
}
export default Hompage;