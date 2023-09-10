import React, { useEffect, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

const FetchData = ({ cat }) => {
  const [data, setData] = useState([]);


  const apiUrl = cat
    ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=1f9b2adaf29547768019465009699cdd`
    : "https://newsapi.org/v2/top-headlines?country=in&apiKey=1f9b2adaf29547768019465009699cdd";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result.articles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  const handleShareOnFacebook = (url) => {
    // Open Facebook sharing dialog
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareOnWhatsApp = (url, title) => {
    // Construct a WhatsApp message
    const whatsappMessage = `Check out this news article: ${title}\n${url}`;
    // Encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    // Open WhatsApp with the message
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  };

  

  return (
    <div className="container my-4">
      <h3>
        <u>TOP HEADLINES</u>
      </h3>
      <div className="container d-flex justify-content-center align-items-center flex-column my-3" style={{ minHeight: '100vh' }}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="container my-3" style={{ width: '600px', boxShadow: '2px 2px 10px silver', borderRadius: '12px' }} key={index}>
              <h5 className="my-3">{item.title}</h5>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img src={item.urlToImage} alt="Image not found" className="img-fluid" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
              </div>
              <p className="my-1">{item.content}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                View more
              </a>
              <div className="my-2">
               
                {' | '}
                {/* Share on WhatsApp */}
                <a href="#" className="btn btn-success mx-2" onClick={() => handleShareOnWhatsApp(item.url, item.title)}>
                  <FaWhatsapp /> Share on WhatsApp
                </a>
                {' | '}
                {/* Share on Facebook */}
                <FacebookShareButton url={item.url} quote={item.title}>
                  <a href="#" className="btn btn-primary mx-2">
                    <FaFacebook /> Share on Facebook
                  </a>
                </FacebookShareButton>
              </div>
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default FetchData;
