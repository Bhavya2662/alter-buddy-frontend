import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAllGroupSessionsQuery, useBookGroupSessionMutation } from '../../../redux/rtk-api/group-session.api';
import { useProfileUserQuery } from '../../../redux/rtk-api';
import { useGetMyWalletQuery, useUseBuddyCoinsMutation } from '../../../redux/rtk-api/buddy-coin.api';
import { IGroupSession } from '../../../interface/group-session.interface';
import { format } from 'date-fns';
import { FaUsers, FaClock, FaCoins, FaCalendarAlt } from 'react-icons/fa';
import { AppButton } from '../../../component';

const GroupSessionsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const { data: groupSessionsData, isLoading, error, refetch } = useGetAllGroupSessionsQuery();
  const { data: userProfile } = useProfileUserQuery();
  const { data: wallet } = useGetMyWalletQuery();

  // Debug logging
  console.log('Group Sessions Debug:', {
    groupSessionsData,
    isLoading,
    error,
    userProfile: userProfile?.data,
    wallet: wallet?.data
  });
  const [bookGroupSession] = useBookGroupSessionMutation();
  const [deductBuddyCoins] = useUseBuddyCoinsMutation();

  const groupSessions = groupSessionsData?.data || [];

  // Filter out demo/test sessions and sessions with null mentorId/categoryId
  const validSessions = groupSessions.filter((session: IGroupSession) => {
    // Exclude sessions with null mentorId or categoryId
    if (!session.mentorId || !session.categoryId) {
      return false;
    }
    
    // Exclude test/demo sessions by title
    const title = session.title?.toLowerCase() || '';
    if (title.includes('test') || title.includes('demo')) {
      return false;
    }
    
    return true;
  });

  // Filter sessions based on category and search term
  const filteredSessions = validSessions.filter((session: IGroupSession) => {
    const matchesCategory = selectedCategory === 'all' || session.categoryId === selectedCategory;
    const matchesSearch = session.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter (only from valid sessions)
  const categories = ['all', ...new Set(validSessions.map((session: IGroupSession) => session.categoryId))];

  const handleBookSession = async (sessionId: string, session: IGroupSession) => {
    try {
      // Check if user is logged in
      if (!userProfile?.data) {
        toast.warn('Please login to book a session');
        navigate('/sign-in');
        return;
      }

      // Check if session is full
      if (session.bookedUsers && session.bookedUsers.length >= session.capacity) {
        toast.error('This session is fully booked');
        return;
      }

      // Check if user already booked this session
      if (session.bookedUsers?.includes(userProfile.data._id)) {
        toast.info('You have already booked this session');
        return;
      }

      // Check if user has enough BuddyCoins
      const userBalance = wallet?.data?.balance || 0;
      if (userBalance < session.price) {
        toast.error(`Insufficient BuddyCoins. You need ${session.price} coins but have ${userBalance}.`);
        return;
      }

      // Book the session
      await bookGroupSession({
        sessionId,
        userId: userProfile.data._id
      }).unwrap();
      
      // Deduct BuddyCoins
      await deductBuddyCoins({
        coinsToUsed: session.price,
        useType: 'group_session_booking',
        userId: userProfile.data._id
      });
      
      toast.success('Session booked successfully!');
      refetch(); // Refresh the sessions list
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error?.data?.message || 'Failed to book session');
    }
  };

  const isSessionBooked = (session: IGroupSession) => {
    return session.bookedUsers?.includes(userProfile?.data?._id);
  };

  const isSessionFull = (session: IGroupSession) => {
    return session.bookedUsers && session.bookedUsers.length >= session.capacity;
  };

  const getAvailableSpots = (session: IGroupSession) => {
    const bookedCount = session.bookedUsers?.length || 0;
    return session.capacity - bookedCount;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading group sessions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load group sessions</p>
          <AppButton onClick={() => refetch()} className="mt-4">
            Try Again
          </AppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Group Sessions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our expert-led group sessions and connect with like-minded individuals on your wellness journey
          </p>
          {/* Wallet Balance */}
          {userProfile?.data && (
            <div className="mt-6 inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
              <FaCoins className="text-yellow-500 mr-2" />
              <span className="text-yellow-800 font-medium">
                Your Balance: {wallet?.data?.balance || 0} BuddyCoins
              </span>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredSessions.length} session(s) found
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <FaUsers className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No group sessions found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new sessions'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session: IGroupSession) => (
              <div
                key={session._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Session Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {session.title || 'Group Session'}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {session.description || 'Join this amazing group session'}
                  </p>
                  
                  {/* Session Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendarAlt className="mr-2 text-primary-500" />
                      {format(new Date(session.scheduledAt), 'MMM dd, yyyy')}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2 text-primary-500" />
                      {format(new Date(session.scheduledAt), 'hh:mm a')}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUsers className="mr-2 text-primary-500" />
                      <span className="font-semibold text-green-600">
                        {getAvailableSpots(session)} spots left
                      </span>
                      <span className="text-gray-500 ml-1">of {session.capacity}</span>
                    </div>
                    
                    {/* Mentor Information */}
                    {session.mentorId && typeof session.mentorId === 'object' && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">👨‍🏫</span>
                        Mentor: {(session.mentorId as any)?.name?.firstName || 'Unknown'} {(session.mentorId as any)?.name?.lastName || ''}
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCoins className="mr-2 text-yellow-500" />
                      {session.price} BuddyCoins
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Capacity</span>
                      <span className="font-semibold text-primary-600">
                        {getAvailableSpots(session)} slots left
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span></span>
                      <span>{session.bookedUsers?.length || 0}/{session.capacity} booked</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((session.bookedUsers?.length || 0) / session.capacity) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-6">
                    {isSessionBooked(session) ? (
                      <div className="text-center">
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                          ✓ Booked
                        </div>
                        {session.joinLink && (
                          <a
                            href={session.joinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-primary-500 hover:text-primary-600 text-sm font-medium"
                          >
                            Join Session →
                          </a>
                        )}
                      </div>
                    ) : isSessionFull(session) ? (
                      <AppButton disabled className="w-full bg-gray-400">
                        Session Full
                      </AppButton>
                    ) : (wallet?.data?.balance || 0) < session.price ? (
                      <AppButton disabled className="w-full bg-gray-400">
                        Insufficient BuddyCoins
                      </AppButton>
                    ) : (
                      <AppButton
                        onClick={() => handleBookSession(session._id, session)}
                        className="w-full"
                      >
                        Book Session
                      </AppButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSessionsPage;