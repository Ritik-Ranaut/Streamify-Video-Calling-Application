import { Link } from "react-router";
import { MessageSquareIcon, PhoneIcon, MapPinIcon, StarIcon } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-gradient-to-br from-base-100 to-base-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-base-300 hover:border-primary/50">
      {/* GRADIENT HEADER BACKGROUND */}
      <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      
      <div className="card-body p-6 relative">
        {/* AVATAR - OVERLAPPING */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="avatar size-32 border-4 border-base-100 rounded-full shadow-lg">
            <img src={friend.profilePic} alt={friend.fullName} className="object-cover" />
          </div>
        </div>

        {/* NAME */}
        <h3 className="font-bold text-xl text-center text-base-content">{friend.fullName}</h3>

        {/* LOCATION */}
        {friend.location && (
          <div className="flex items-center justify-center gap-1 text-xs opacity-60 mb-3">
            <MapPinIcon className="size-3" />
            {friend.location}
          </div>
        )}

        {/* BIO */}
        {friend.bio && (
          <p className="text-sm text-center text-base-content/70 mb-4 line-clamp-2">{friend.bio}</p>
        )}

        {/* LANGUAGE BADGES */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center justify-center gap-2 bg-secondary/10 rounded-lg p-2">
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="text-sm font-semibold">Native: {friend.nativeLanguage}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-primary/10 rounded-lg p-2">
            {getLanguageFlag(friend.learningLanguage)}
            <span className="text-sm font-semibold">Learning: {friend.learningLanguage}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-4">
          <Link 
            to={`/chat/${friend._id}`} 
            className="btn btn-primary btn-sm flex-1 gap-2"
          >
            <MessageSquareIcon className="size-4" />
            Message
          </Link>
          <Link 
            to={`/call/${friend._id}`} 
            className="btn btn-outline btn-sm flex-1 gap-2"
          >
            <PhoneIcon className="size-4" />
            Call
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
