import slide2 from '../../assets/slider-image/slide2.jpg';
import slide4 from '../../assets/slider-image/slide4.jpg';
import slide3 from '../../assets/slider-image/slide3.jpg';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Homepage.scss';

export default function Homepage() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <div className='homepage-container'>
            <Carousel activeIndex={index} onSelect={handleSelect} className='carousel-container'>
                <Carousel.Item className='carousel-item'>
                    <img
                        className="d-block w-100"
                        src={slide2}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='carousel-item'>
                    <img
                        className="d-block w-100"
                        src={slide4}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='carousel-item'>
                    <img
                        className="d-block w-100"
                        src={slide3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className='homepage-input'>
                <h1 className='mb-4'>Chi Nguyen</h1>
                <button type='button' className='homepage-button mb-4'>Get's start. It's free</button>
                <input type="text" class="form-control" placeholder='Seacrch hight-resolution images' />
            </div>
        </div>
    );
}