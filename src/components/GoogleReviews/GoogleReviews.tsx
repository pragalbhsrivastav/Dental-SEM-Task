import React, { useState, useEffect } from "react";
import { useGoogleReviews } from "../../hooks/useGoogleReviews";
import './GoogleReviews.css'
import StarRating from "./StarRating";
import ErrorSVG from "../../assests/Error";
import Pagination from "../Pagination/Pagination";

interface GoogleReviewsProps {
  placeId: string;
}

// const dummyData = [
//     {
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },
//     {
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },{
//       "author_name": "John Doe",
//       "author_url": "https://www.google.com/maps/contrib/1234567890",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "1 month ago",
//       "text": "Amazing place! The atmosphere is great, and the service was top-notch.",
//       "time": 1633058472,
//       "translated": false
//     },
//     {
//       "author_name": "Jane Smith",
//       "author_url": "https://www.google.com/maps/contrib/1234567891",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 4,
//       "relative_time_description": "2 weeks ago",
//       "text": "Had a great experience. The food was delicious, but a bit pricey.",
//       "time": 1635669472,
//       "translated": false
//     },
//     {
//       "author_name": "Sam Wilson",
//       "author_url": "https://www.google.com/maps/contrib/1234567892",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 3,
//       "relative_time_description": "1 week ago",
//       "text": "The place is okay. Nothing extraordinary, but worth a visit.",
//       "time": 1636274272,
//       "translated": false
//     },
//     {
//       "author_name": "Emily Davis",
//       "author_url": "https://www.google.com/maps/contrib/1234567893",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "3 days ago",
//       "text": "Absolutely loved it! Highly recommend to everyone.",
//       "time": 1636792672,
//       "translated": false
//     },
//     {
//       "author_name": "Michael Brown",
//       "author_url": "https://www.google.com/maps/contrib/1234567894",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 2,
//       "relative_time_description": "5 days ago",
//       "text": "Not impressed. The service was slow, and the food was cold.",
//       "time": 1636619872,
//       "translated": false
//     },
//     {
//       "author_name": "Sophia Johnson",
//       "author_url": "https://www.google.com/maps/contrib/1234567895",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 4,
//       "relative_time_description": "1 week ago",
//       "text": "Nice ambiance and good food, but the wait time was a bit long.",
//       "time": 1636274872,
//       "translated": false
//     },
//     {
//       "author_name": "Daniel Garcia",
//       "author_url": "https://www.google.com/maps/contrib/1234567896",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "2 days ago",
//       "text": "Best place in town! The staff is friendly, and the location is perfect.",
//       "time": 1636879072,
//       "translated": false
//     },
//     {
//       "author_name": "Olivia Martinez",
//       "author_url": "https://www.google.com/maps/contrib/1234567897",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 3,
//       "relative_time_description": "4 days ago",
//       "text": "It's decent, but there are better places nearby.",
//       "time": 1636706272,
//       "translated": false
//     },
//     {
//       "author_name": "James Rodriguez",
//       "author_url": "https://www.google.com/maps/contrib/1234567898",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 4,
//       "relative_time_description": "1 day ago",
//       "text": "Enjoyed my visit. The coffee was excellent!",
//       "time": 1636965472,
//       "translated": false
//     },
//     {
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },
//     {
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },
//     {
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 2",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 29",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 28",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 24",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 21",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },{
//       "author_name": "Isabella Hernandez 23",
//       "author_url": "https://www.google.com/maps/contrib/1234567899",
//       "language": "en",
//       "original_language": "en",
//       "profile_photo_url": "https://via.placeholder.com/150",
//       "rating": 5,
//       "relative_time_description": "6 days ago",
//       "text": "Perfect spot for a weekend getaway. Highly recommended!",
//       "time": 1636537472,
//       "translated": false
//     },
//   ]

const GoogleReviews: React.FC<GoogleReviewsProps> = ({ placeId }) => {
  const { reviews, loading, error, loadMoreReviews, hasMore } = useGoogleReviews(placeId);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState<"date" | "rating">("date");
  const reviewsPerPage = 5;

  useEffect(() => {
    if (hasMore && currentPage > 1) {
      loadMoreReviews();
    }
  }, [currentPage, loadMoreReviews, hasMore]);

  const handleSort = (criteria: "date" | "rating") => {
    setSortCriteria(criteria);
    setCurrentPage(1);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortCriteria === "rating") {
      return b.rating - a.rating;
    } else {
      return b.time - a.time;
    }
  });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page, 'page')
  };

  return (
    <section aria-labelledby="reviews-heading" className="google-reviews">
      <div className="reviews-header">
        <h2 id="reviews-heading">Customer Reviews</h2>
        <div aria-label="Sort reviews" className="sort-reviews">
          <label htmlFor="sort-reviews" className="sort-label">Sort by:</label>
          <select
            id="sort-reviews"
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value as "date" | "rating")}
            className="sort-select"
            aria-label="Sort reviews by date or rating"
          >
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {loading && <p aria-live="polite">Loading reviews...</p>}

      <ul aria-label="List of customer reviews" className="review-list">
        {currentReviews.map((review) => (
          <li key={`${review.author_name}-${review.time}`} className="review-item" tabIndex={0}>
            <article>
              <header className="header-wrapper">
                <a href={review.author_url} target="_blank" rel="noopener noreferrer" aria-label={`Review by ${review.author_name}`}>
                  <img
                    src={review.profile_photo_url}
                    alt={`Profile of ${review.author_name}`}
                    className="review-profile-photo"
                  />
                </a>
                <div className="review-star">
                  <strong>{review.author_name}</strong>
                  <div aria-label={`Rating: ${review.rating} out of 5`}>
                    <StarRating rating={review.rating} />
                    <div>{review.rating}</div>
                  </div>
                </div>
              </header>
              <p className="review-text">{review.text}</p>
              <footer className="review-footer">
                <time dateTime={new Date(review.time * 1000).toISOString()}>
                  {review.relative_time_description}
                </time>
              </footer>
            </article>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {error && (
        <div role="alert" aria-live="assertive">
          <ErrorSVG />
        </div>
      )}
    </section>
  );
};

export default GoogleReviews;