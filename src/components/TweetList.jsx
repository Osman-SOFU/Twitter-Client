import React, { useEffect, useState } from "react";
import axios from "axios";

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const userId = 1;

  useEffect(() => {
    // Basic Auth bilgileri
    const username = "test@example.com"; // Kullanıcı adını gir
    const password = "1234"; // Şifreni gir
    const authHeader = "Basic " + btoa(`${username}:${password}`); // Base64 şifreleme

    axios
      .get(`http://localhost:3000/tweet/findByUserId?userId=${userId}`, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Kimlik doğrulama bilgilerini ekler
      })
      .then((response) => {
        console.log("Tweetler:", response.data);
        setTweets(response.data);
      })
      .catch((error) => {
        console.error("Tweetleri çekerken hata oluştu:", error);
      });
  }, []);

  return (
    <div>
      <h2>Kullanıcının Tweetleri</h2>
      {tweets.length > 0 ? (
        <ul>
          {tweets.map((tweet) => (
            <li key={tweet.id}>
              <strong>{tweet.username}</strong>
              <p>{tweet.text}</p>
              <p>Beğeni Sayısı: {tweet.likeCount}</p>
              <p>Retweet Sayısı: {tweet.retweetCount}</p>
              <p>Yorum Sayısı: {tweet.commentCount}</p>
              <p>Yorumlar: {tweet.comments}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tweet bulunamadı.</p>
      )}
    </div>
  );
};

export default TweetList;
