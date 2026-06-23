import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="container mx-auto space-y-12 max-w-7xl">
        {/* FRIENDS SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Your Friends
            </h1>
            <p className="text-base-content/60 mt-2">Connect and learn together</p>
          </div>
          <Link to="/notifications" className="btn btn-primary gap-2">
            <UsersIcon className="size-5" />
            Friend Requests
          </Link>
        </div>

        {/* FRIENDS GRID */}
        {loadingFriends ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* MEET NEW LEARNERS SECTION */}
        <section className="mt-16 pt-12 border-t border-base-300">
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
              Meet New Learners
            </h2>
            <p className="text-base-content/60 text-lg">
              Discover perfect language exchange partners based on your profile
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-8 text-center">
              <h3 className="font-bold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content/70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-gradient-to-br from-base-100 to-base-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-base-300 hover:border-secondary/50"
                  >
                    {/* GRADIENT HEADER */}
                    <div className="h-20 bg-gradient-to-r from-secondary/20 to-primary/20"></div>

                    <div className="card-body p-6 relative">
                      {/* AVATAR - OVERLAPPING */}
                      <div className="flex justify-center -mt-14 mb-4">
                        <div className="avatar size-24 border-4 border-base-100 rounded-full shadow-lg">
                          <img src={user.profilePic} alt={user.fullName} className="object-cover" />
                        </div>
                      </div>

                      <h3 className="font-bold text-lg text-center">{user.fullName}</h3>

                      {user.location && (
                        <div className="flex items-center justify-center gap-1 text-xs opacity-60 mb-3">
                          <MapPinIcon className="size-3" />
                          {user.location}
                        </div>
                      )}

                      {/* Languages with flags */}
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center justify-center gap-2 bg-secondary/10 rounded-lg p-2">
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="text-sm font-semibold">Native: {capitialize(user.nativeLanguage)}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 bg-primary/10 rounded-lg p-2">
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="text-sm font-semibold">Learning: {capitialize(user.learningLanguage)}</span>
                        </div>
                      </div>

                      {user.bio && <p className="text-sm text-center text-base-content/70 mb-4 line-clamp-2">{user.bio}</p>}

                      {/* Action button */}
                      <button
                        className={`btn w-full ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        } gap-2`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
