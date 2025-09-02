import React, { useState, useEffect } from "react";
import { MainLayout } from "../../../layout";
import { AppButton } from "../../../component";
import { useNavigate } from "react-router-dom";
import { useAuthenticationSlice } from "../../../redux/features";
import { toast } from "react-toastify";
import { useLazyProfileUserQuery } from "../../../redux/rtk-api";
import { FaVideo, FaVolumeUp, FaComments, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { io, Socket } from "socket.io-client";

interface SessionType {
  type: 'audio' | 'chat';
  icon: React.ComponentType;
  title: string;
  description: string;
}

const sessionTypes: SessionType[] = [
  {
    type: 'audio',
    icon: FaVolumeUp,
    title: 'Audio Session',
    description: 'Voice-only anonymous call with a mentor'
  },
  {
    type: 'chat',
    icon: FaComments,
    title: 'Chat Session',
    description: 'Text-based anonymous chat with a mentor'
  }
];

export const AnonymousRantPage = () => {
  const { authentication } = useAuthenticationSlice();
  const [GetProfile, { data: profile }] = useLazyProfileUserQuery();
  const navigate = useNavigate();
  const [selectedSessionType, setSelectedSessionType] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'waiting' | 'connected' | 'rejected' | 'error' | 'no_mentors'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    if (authentication) {
      (async () => {
        await GetProfile();
      })();
    }
  }, [GetProfile, authentication]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:8080');
    setSocket(newSocket);

    // Listen for session acceptance
    newSocket.on('anonymousSessionAccepted', (data) => {
      setIsConnecting(false);
      setConnectionStatus('connected');
      toast.success('Mentor has joined the session!');
      // Redirect to the session interface
      redirectToSession(data.sessionId, selectedSessionType!);
    });

    // Listen for session rejection
    newSocket.on('anonymousSessionRejected', (data) => {
      setIsConnecting(false);
      setConnectionStatus('rejected');
      setErrorMessage(data.message || 'Session was rejected by the mentor.');
      toast.error(data.message);
    });

    // Listen for no mentors available
    newSocket.on('noMentorsAvailable', (data) => {
      setIsConnecting(false);
      setConnectionStatus('no_mentors');
      setErrorMessage('No mentors are currently available. Please try again later.');
      toast.error('No mentors available at the moment');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [selectedSessionType]);

  const redirectToSession = (sessionId: string, sessionType: string) => {
    const token = localStorage.getItem('USER_TOKEN');
    
    switch (sessionType) {
      case 'video':
      case 'audio':
        // For video/audio sessions, use the call page
        navigate(`/call?sessionId=${sessionId}&userToken=${token}&callType=${sessionType}&isAnonymous=true`);
        break;
      case 'chat':
        // For chat sessions, use the user chat route with sessionId as both mentor ID and room ID for anonymous sessions
        navigate(`/user/chat/${sessionId}/${sessionId}?sessionId=${sessionId}&userToken=${token}&isAnonymous=true`);
        break;
      default:
        // Fallback to anonymous rant page
        navigate(`/anonymous-rant?sessionId=${sessionId}&userToken=${token}`);
    }
  };

  const handleSessionTypeSelect = async (sessionType: string) => {
    if (!profile?.data) {
      toast.warn('Please login first');
      navigate('/sign-in');
      return;
    }

    setSelectedSessionType(sessionType);
    setIsConnecting(true);
    setConnectionStatus('connecting');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('USER_TOKEN');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/1.0/rant/anonymous-session`,
        { sessionType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setSessionData(response.data.data);
        setConnectionStatus('waiting');
        toast.success('Connecting you to a mentor...');
        
        // Set a timeout to handle cases where no mentor responds
        const waitingTimeout = setTimeout(() => {
          if (connectionStatus === 'waiting') {
            setIsConnecting(false);
            setConnectionStatus('no_mentors');
            setErrorMessage('No mentors are currently available. Please try again later.');
            toast.error('No mentors are currently available. Please try again later.');
          }
        }, 60000); // 60 seconds timeout
        
        return () => clearTimeout(waitingTimeout);
      } else {
        throw new Error(response.data.message || 'Failed to create session');
      }
    } catch (error: any) {
      setIsConnecting(false);
      setConnectionStatus('error');
      
      // Handle specific error cases
      if (error.message?.includes('No mentors available')) {
        setConnectionStatus('no_mentors');
        setErrorMessage('No mentors are currently available. Please try again later.');
        toast.error('No mentors available at the moment');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        setErrorMessage('Network error. Please check your connection and try again.');
        toast.error('Connection failed. Please check your internet connection.');
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to connect to mentor';
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const handleCancelConnection = () => {
    setIsConnecting(false);
    setSelectedSessionType(null);
    setSessionData(null);
    setConnectionStatus('idle');
    setErrorMessage('');
    setRetryCount(0);
    toast.info('Connection cancelled');
  };

  const handleRetry = () => {
    if (retryCount < maxRetries && selectedSessionType) {
      setRetryCount(prev => prev + 1);
      setConnectionStatus('idle');
      setErrorMessage('');
      handleSessionTypeSelect(selectedSessionType);
    } else {
      toast.error('Maximum retry attempts reached. Please try again later.');
    }
  };

  if (isConnecting) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
            <div className="mb-6">
              <FaSpinner className="animate-spin text-4xl text-primary-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Connecting to a Mentor...
              </h2>
              <p className="text-gray-600">
                We're finding an available mentor for your {selectedSessionType} session.
                This may take a few moments.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Session Type:</strong> {selectedSessionType?.charAt(0).toUpperCase() + selectedSessionType?.slice(1)}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Status:</strong> {connectionStatus === 'connecting' ? 'Creating session...' : connectionStatus === 'waiting' ? 'Waiting for mentor to join' : connectionStatus === 'rejected' ? 'Session rejected' : connectionStatus === 'no_mentors' ? 'No mentors available' : connectionStatus === 'error' ? 'Connection error' : 'Connected'}
                </p>
                {errorMessage && (
                  <p className="text-sm text-red-600 mt-2">
                    <strong>Error:</strong> {errorMessage}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                {(connectionStatus === 'rejected' || connectionStatus === 'no_mentors' || connectionStatus === 'error') && retryCount < maxRetries && (
                  <AppButton
                    onClick={handleRetry}
                    style={{ flex: 1, backgroundColor: '#3b82f6' }}
                  >
                    Retry ({retryCount}/{maxRetries})
                  </AppButton>
                )}
                <AppButton
                  onClick={handleCancelConnection}
                  style={{ flex: 1, backgroundColor: '#6b7280' }}
                >
                  {connectionStatus === 'waiting' ? 'Cancel Connection' : 'Close'}
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-500 mb-4">
              Anonymous Rant Session
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect instantly with a random mentor for a completely anonymous session.
              No personal information shared - just pure, judgment-free support.
            </p>
          </div>

          {/* Session Type Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Choose Your Session Type
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {sessionTypes.map((session) => {
                const IconComponent = session.icon;
                return (
                  <div
                    key={session.type}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-500"
                    onClick={() => handleSessionTypeSelect(session.type)}
                  >
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="text-4xl text-primary-500 mx-auto flex justify-center">
                          <IconComponent />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {session.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {session.description}
                      </p>
                      <div className="mt-4">
                        <AppButton filled style={{ width: '100%' }}>
                          Start {session.title}
                        </AppButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Why Choose Anonymous Sessions?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Complete Anonymity</h4>
                    <p className="text-gray-600 text-sm">
                      Neither you nor the mentor can see each other's identity
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Instant Connection</h4>
                    <p className="text-gray-600 text-sm">
                      Get connected to an available mentor within seconds
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">No Judgment</h4>
                    <p className="text-gray-600 text-sm">
                      Express yourself freely without fear of being judged
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Professional Support</h4>
                    <p className="text-gray-600 text-sm">
                      All mentors are trained to provide empathetic listening
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Flexible Duration</h4>
                    <p className="text-gray-600 text-sm">
                      Sessions last up to 30 minutes, end anytime you want
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Safe Environment</h4>
                    <p className="text-gray-600 text-sm">
                      Secure, confidential space for emotional release
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-primary-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-primary-700">
                Ready to Let It All Out?
              </h3>
              <p className="text-primary-600 mb-6">
                Choose a session type above to get started immediately.
                No scheduling, no waiting - just instant support when you need it.
              </p>
              {!profile?.data && (
                <AppButton
                  onClick={() => navigate('/sign-in')}
                  filled
                >
                  Sign In to Start Session
                </AppButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};